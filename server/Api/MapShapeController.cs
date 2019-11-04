using green_map.Domains;
using green_map.Hubs;
using green_map.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System.Collections.Generic;

namespace green_map.Api
{

    [Route("api/map-shape")]
    public class MapShapeController : BaseApiController
    {
        private readonly IHubContext<MapShapeHub, IMapShapeHub> _mapShapeHub = null;

        public MapShapeController(
            IMongoDatabase mongoDatabase,
            IConfiguration config,
            IHubContext<MapShapeHub, IMapShapeHub> mapShapeHub) : base(mongoDatabase, config)
        {
            _mapShapeHub = mapShapeHub;
        }

        [HttpGet]
        public List<MapShapeItem> Get()
        {
            return _mongoDatabase.GetCollection<MapShapeItem>("MapShape").Find(_ => true).ToList();
        }

        [Authorize(Roles = "admin, superAdmin")]
        [HttpPost]
        public ResponseBase<MapShapeItem> Post([FromBody]MapShapeItem value)
        {
            var errors = new List<string>();

            if (ModelState.IsValid)
            {
                var collection = _mongoDatabase.GetCollection<MapShapeItem>("MapShape");
                var item = collection.Find(i => i.Id == value.Id).FirstOrDefault();

                if (item == null)
                {
                    collection.InsertOne(value);
                }
                else
                {
                    if (item.Images != null)
                    {
                        foreach (var image in item.Images)
                        {
                            var exist = value.Images.Find(i => i == image);
                            if (exist == null)
                            {
                                if ((System.IO.File.Exists(image)))
                                {
                                    System.IO.File.Delete(image);
                                }
                            }
                        }
                    }

                    collection.ReplaceOneAsync(c => c.Id == value.Id, value);
                }
                _mapShapeHub.Clients.All.MapShapeChange("update", value);
                return new ResponseBase<MapShapeItem>(value);
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
                return new ResponseBase<MapShapeItem>(null, errors);
            }
            else
            {
                return new ResponseBase<MapShapeItem>();
            }
        }

        [HttpDelete("{id}")]
        public ResponseBase<MapShapeItem> Delete(string id)
        {
            var bucket = new GridFSBucket(_mongoDatabase);

            var item = _mongoDatabase.GetCollection<MapShapeItem>("MapShape").Find(i => i.Id == id).FirstOrDefault();
            _mongoDatabase.GetCollection<MapShapeItem>("MapShape").DeleteOne(i => i.Id == id);

            if (item != null && item.Images != null && item.Images.Count > 0)
            {
                foreach (var image in item.Images)
                {
                    var objectId = ObjectId.Parse(image);
                    bucket.Delete(objectId);
                }
            }

            _mapShapeHub.Clients.All.MapShapeChange("delete", item);

            return new ResponseBase<MapShapeItem>();
        }
    }
}