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
using System.Threading.Tasks;

namespace green_map.Api
{
    [Route("download")]
    public class DownloadController : BaseApiController
    {

        public DownloadController(IMongoDatabase mongoDatabase, IConfiguration config) : base(mongoDatabase, config)
        {
        }

        [HttpGet("{id}")]
        public async Task<FileContentResult> Get(string id)
        {
            var objectId = new ObjectId(id);
            var bucket = new GridFSBucket(_mongoDatabase);
            var file = await bucket.OpenDownloadStreamAsync(objectId);
            byte[] bytes = null;
            string contentType = "";

            foreach (var item in file.FileInfo.Metadata.Elements)
            {
                if (item.Name == "contentType")
                {
                    contentType = item.Value.ToString();
                    break;
                }
            }

            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                bytes = ms.GetBuffer();
            }

            return File(bytes, contentType);
        }
    }
}