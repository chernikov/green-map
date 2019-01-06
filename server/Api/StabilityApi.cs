using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using green_map.Models;
using Microsoft.AspNetCore.SignalR;
using green_map.Hubs;

namespace green_map.Api {
    [Route("api/stability")]
    public class StabilityApi : BaseApi {
        private readonly IMongoDatabase _db = null;
        private readonly IHubContext<StabilityHub, IStabilityHub> _stabilityHub = null;

        public StabilityApi(IOptions<ServerConfiguration> settings, IConfiguration config, IHubContext<StabilityHub, IStabilityHub> stabilityHub) : base(settings, config) {
            _db = base.GetMongoDB();
            _stabilityHub = stabilityHub;
        }

        [Authorize(Roles = "superAdmin")]
        [HttpGet]
        public List<StabilityItem> Get() {
            return _db.GetCollection<StabilityItem>("Stability").Find(_ => true).ToList();
        }

        [HttpPost]
        public StabilityItemResponse Post([FromBody]StabilityItem value) {
            var errors = new List<string>();
            var response = new StabilityItemResponse();

            if(ModelState.IsValid) {
                var collection = _db.GetCollection<StabilityItem>("Stability");
                collection.InsertOne(value);
                response.Result = value;
                _stabilityHub.Clients.All.StabilityChange("add", value);
            } else {
                foreach(var item in ModelState) {
                    var key = item.Key;
                    foreach(var error in item.Value.Errors) {
                        errors.Add(key + ' ' + error.ErrorMessage);
                    }
                }
            }

            if(errors.Count > 0) {
                response.Errors = errors;
                response.IsSuccess = false;
                response.Result = null;
            } else {
                response.Errors = null;
                response.IsSuccess = true;
            }

            return response;
        }
    }
}