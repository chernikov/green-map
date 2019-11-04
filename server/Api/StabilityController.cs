using green_map.Domains;
using green_map.Hubs;
using green_map.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;

namespace green_map.Api
{
    [Route("api/stability")]
    public class StabilityController : BaseApiController
    {
        private readonly IHubContext<StabilityHub, IStabilityHub> _stabilityHub = null;

        public StabilityController(IMongoDatabase mongoDatabase, IConfiguration config,
            IHubContext<StabilityHub, IStabilityHub> stabilityHub) : base(mongoDatabase, config)
        {
            _stabilityHub = stabilityHub;
        }

        [Authorize(Roles = "superAdmin")]
        [HttpGet]
        public List<StabilityItem> Get()
        {
            return _mongoDatabase.GetCollection<StabilityItem>("Stability").Find(_ => true).ToList();
        }

        [HttpPost]
        public ResponseBase<StabilityItem> Post([FromBody]StabilityItem value)
        {
            var errors = new List<string>();

            if (ModelState.IsValid)
            {
                var collection = _mongoDatabase.GetCollection<StabilityItem>("Stability");
                collection.InsertOne(value);
                _stabilityHub.Clients.All.StabilityChange("add", value);
                return new ResponseBase<StabilityItem>(value);
            }
            else
            {
                foreach (var item in ModelState)
                {
                    var key = item.Key;
                    foreach (var error in item.Value.Errors)
                    {
                        errors.Add(key + ' ' + error.ErrorMessage);
                    }
                }
            }

            if (errors.Count > 0)
            {
                return new ResponseBase<StabilityItem>(null, errors);
            }
            else
            {
                return new ResponseBase<StabilityItem>();
            }
        }
    }
}