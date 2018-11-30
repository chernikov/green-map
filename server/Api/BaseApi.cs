using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using green_map.Models;

namespace green_map.Api {
    public abstract class BaseApi : Controller {
        private readonly IOptions<ServerConfiguration> _settings;
        private IConfiguration _config;

        public BaseApi(IOptions<ServerConfiguration> settings, IConfiguration config) {
            _settings = settings;
            _config = config;
        }

        public string GenerateAuthToken(User user, bool isPersistent) {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var authUser = Newtonsoft.Json.JsonConvert.SerializeObject(user); 

            var claimsData = new[] { 
                new Claim("user", authUser),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.Code)
            };

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims: claimsData,
                expires: isPersistent ? DateTime.Now.AddYears(1) : DateTime.Now.AddMinutes(15),
                signingCredentials: creds
            );

            return  new JwtSecurityTokenHandler().WriteToken(token);
        }

        public IMongoDatabase GetMongoDB() {
            var mongoClient = new MongoClient(_settings.Value.MongoConnectionString);  
            if (mongoClient != null) return mongoClient.GetDatabase(_settings.Value.MongoDatabase); 
            return null;
        }
    }
}