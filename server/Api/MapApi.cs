using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using green_map.Models;

namespace green_map.Api {
    [Route("api/map")]
    public class MapApi : BaseApi {
        private readonly IMongoDatabase _db = null;

        public MapApi(IOptions<ServerConfiguration> settings, IConfiguration config) : base(settings, config) {
            _db = base.GetMongoDB();
        }

        [HttpGet]
        public Map Get() {
            return _db.GetCollection<Map>("Map").Find(_ => true).FirstOrDefault();
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public MapResponse Post([FromBody]Map value) {
            var errors = new List<string>();
            var response = new MapResponse();

            if(ModelState.IsValid) {
                var collection = _db.GetCollection<Map>("Map");
                var items = collection.Find(_ => true).ToList();

                if(items.Count < 1 && value.Id == null) {
                    collection.InsertOne(value);
                } else {
                    collection.ReplaceOneAsync(c => c.Id == value.Id, value);
                }
                response.Result = value;
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