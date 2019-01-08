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
using System.Threading.Tasks;

namespace green_map.Api {
    [Route("download")]
    public class Download : BaseApi {
        private readonly IMongoDatabase _db = null;

        public Download(IOptions<ServerConfiguration> settings, IConfiguration config) : base(settings, config) {
            _db = base.GetMongoDB();
        }

        [HttpGet("{id}")]
        public async Task<FileContentResult> Get(string id) {
            var objectId = new ObjectId(id);
            var bucket = new GridFSBucket(_db);
            var file = await bucket.OpenDownloadStreamAsync(objectId);
            byte[] bytes = null;
            string contentType = "";

            foreach(var item in file.FileInfo.Metadata.Elements) {
                if(item.Name == "contentType") {
                    contentType = item.Value.ToString();
                    break;
                }
            }

            using(var ms = new MemoryStream()) {
                file.CopyTo(ms);
                bytes = ms.GetBuffer();
            }

            return File(bytes, contentType);
        }
    }
}