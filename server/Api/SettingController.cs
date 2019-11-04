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
    [Route("api/settings")]
    public class SettingController : BaseApiController
    {
        public SettingController(IMongoDatabase mongoDatabase, IConfiguration config) : base(mongoDatabase, config)
        {
        }

        [HttpGet]
        public Setting Get()
        {
            return _mongoDatabase.GetCollection<Setting>("Setting").Find(_ => true).FirstOrDefault();
        }

        [Authorize(Roles = "admin, superAdmin")]
        [HttpPost]
        public ResponseBase<Setting> Post([FromBody]Setting value)
        {
            var errors = new List<string>();

            if (ModelState.IsValid)
            {
                var collection = _mongoDatabase.GetCollection<Setting>("Setting");
                var items = collection.Find(_ => true).ToList();

                if (items.Count < 1 && value.Id == null)
                {
                    collection.InsertOne(value);
                }
                else
                {
                    collection.ReplaceOneAsync(c => c.Id == value.Id, value);
                }
                return new ResponseBase<Setting>(value);
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
                return new ResponseBase<Setting>(null, errors);
            }
            else
            {
                return new ResponseBase<Setting>();
            }
        }
    }
}