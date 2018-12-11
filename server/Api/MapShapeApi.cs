using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using green_map.Models;

namespace green_map.Api {
    [Route("api/map-shape")]
    public class MapShapeApi : BaseApi {
        private readonly IMongoDatabase _db = null;

        public MapShapeApi(IOptions<ServerConfiguration> settings, IConfiguration config) : base(settings, config) {
            _db = base.GetMongoDB();
        }

        [HttpGet]
        public List<MapShapeItem> Get() {
            return _db.GetCollection<MapShapeItem>("MapShape").Find(_ => true).ToList();
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public MapShapeItemResponse Post([FromBody]MapShapeItem value) {
            var errors = new List<string>();
            var response = new MapShapeItemResponse();

            if(ModelState.IsValid) {
                var collection = _db.GetCollection<MapShapeItem>("MapShape");
                var item = collection.Find(i => i.Id == value.Id).FirstOrDefault();


                if(item == null) {
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

        [HttpDelete("{id}")]
        public MapShapeItemResponse Delete(string id) {
            var response = new MapShapeItemResponse();

            _db.GetCollection<MapShapeItem>("MapShape").DeleteOne(i => i.Id == id);

            response.Errors = null;
            response.IsSuccess = true;

            return response;
        }
    }
}