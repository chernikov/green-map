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

namespace green_map.Api {
    [Route("api/shape-image-upload")]
    public class ShapeImageUpload : BaseApi {
        private readonly IMongoDatabase _db = null;
        private readonly UploadManager _uploadManager;

        public ShapeImageUpload(IOptions<ServerConfiguration> settings, IConfiguration config, UploadManager uploadManager) : base(settings, config) {
            _db = base.GetMongoDB();
            _uploadManager = uploadManager;
        }

        [HttpPost]
        public ShapeImageUploadResponse Post(List<IFormFile> files) {
            var response = new ShapeImageUploadResponse();

            if(files != null && files.Count > 0) {
                response.Result = new List<string>();

                foreach(var file in files) {
                    var fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);
                    
                    using (var fileStream = new FileStream(Path.Combine(_uploadManager.paths.ServiceBackground, fileName), FileMode.Create)) {
                        file.CopyTo(fileStream);
                        response.Result.Add(_uploadManager.paths.ServiceBackground + '/' + fileName);
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