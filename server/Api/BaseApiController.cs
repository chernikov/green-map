using green_map.Domains;
using green_map.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace green_map.Api
{
    public abstract class BaseApiController : Controller
    {
        protected IMongoDatabase _mongoDatabase;
        protected IConfiguration _config;

        public BaseApiController(IMongoDatabase mongoDatabase, IConfiguration config)
        {
            _mongoDatabase = mongoDatabase;
            _config = config;
        }
    }
}