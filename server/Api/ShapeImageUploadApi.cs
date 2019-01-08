using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using green_map.Models;
using green_map.Helpers;
using MongoDB.Driver.GridFS;
using MongoDB.Bson;

namespace green_map.Api {
    [Route("api/shape-image-upload")]
    public class ShapeImageUpload : BaseApi {
        private readonly IMongoDatabase _db = null;

        public ShapeImageUpload(IOptions<ServerConfiguration> settings, IConfiguration config) : base(settings, config) {
            _db = base.GetMongoDB();
        }

        [HttpPost]
        public ShapeImageUploadResponse Post(List<IFormFile> files) {
            var response = new ShapeImageUploadResponse();

            if(files != null && files.Count > 0) {
                response.Result = new List<string>();

                foreach(var file in files) {
                    GridFSBucket bucket = new GridFSBucket(_db);
                    string fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);
                    GridFSUploadOptions options = new GridFSUploadOptions() {
                        Metadata = new BsonDocument("contentType", file.ContentType)
                    };

                    using(var ms = new MemoryStream()) {
                        file.CopyTo(ms);
                        byte[] fileBytes = ms.ToArray();
                        ObjectId id = bucket.UploadFromBytes(fileName, fileBytes, options);
                        response.Result.Add(id.ToString());
                    }
                }

                response.Errors = null;
                response.IsSuccess = true;
            } else {
                response.Errors = new List<string>() { "No images were uploaded." };
                response.IsSuccess = false;
                response.Result = null;
            }

            return response;
        }
    }
}