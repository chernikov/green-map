using green_map.Domains;
using green_map.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;

namespace green_map.Api
{
    [Route("api/map")]
    public class MapController : BaseApiController
    {
        public MapController(IMongoDatabase mongoDatabase, IConfiguration config) : base(mongoDatabase, config)
        {
        }

        [HttpGet]
        public Map Get()
        {
            return _mongoDatabase.GetCollection<Map>("Map").Find(_ => true).FirstOrDefault();
        }

        [Authorize(Roles = "admin, superAdmin")]
        [HttpPost]
        public ResponseBase<Map> Post([FromBody]Map value)
        {
            var errors = new List<string>();

            if (ModelState.IsValid)
            {
                var collection = _mongoDatabase.GetCollection<Map>("Map");
                var items = collection.Find(_ => true).ToList();

                if (items.Count < 1 && value.Id == null)
                {
                    collection.InsertOne(value);
                }
                else
                {
                    collection.ReplaceOneAsync(c => c.Id == value.Id, value);
                }
                return new ResponseBase<Map>(value);
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
                return new ResponseBase<Map>(null, errors);
            }
            return new ResponseBase<Map>();
        }
    }
}