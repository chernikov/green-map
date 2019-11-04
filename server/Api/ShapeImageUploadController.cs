using green_map.Helpers;
using green_map.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.IO;

namespace green_map.Api
{
    [Route("api/shape-image-upload")]
    public class ShapeImageUploadController : BaseApiController
    {

        public ShapeImageUploadController(IMongoDatabase mongoDatabase, IConfiguration config) : base(mongoDatabase, config)
        {
        }

        [HttpPost]
        public ResponseBase<List<string>> Post(List<IFormFile> files)
        {
            if (files != null && files.Count > 0)
            {
                var result = new List<string>();

                foreach (var file in files)
                {
                    var bucket = new GridFSBucket(_mongoDatabase);
                    string fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);
                    GridFSUploadOptions options = new GridFSUploadOptions()
                    {
                        Metadata = new BsonDocument("contentType", file.ContentType)
                    };

                    using (var ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        byte[] fileBytes = ms.ToArray();
                        ObjectId id = bucket.UploadFromBytes(fileName, fileBytes, options);
                        result.Add(id.ToString());
                    }
                }
                return new ResponseBase<List<string>>(result);
            }
            else
            {
                return new ResponseBase<List<string>>(null, new List<string>() { "No images were uploaded." });
            }
        }
    }
}