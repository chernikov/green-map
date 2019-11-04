using AutoMapper;
using green_map.Configuration;
using green_map.Domains;
using green_map.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace green_map.Api
{
    [Route("api/login")]
    public class LoginController : BaseApiController
    {
        private readonly IMapper _mapper;

        public LoginController(IMongoDatabase mongoDatabase, IConfiguration config) : base(mongoDatabase, config)
        {
            var mapperConfig = new MapperConfiguration(cfg => cfg.CreateMap<UserRegistration, User>());
            _mapper = mapperConfig.CreateMapper();
        }

        [HttpPost]
        public ResponseBase<string> Post([FromBody]LoginRequest value)
        {
            var errors = new List<string>();

            if (ModelState.IsValid)
            {
                try
                {
                    var user = _mongoDatabase.GetCollection<UserRegistration>("User").Find(u => u.Email == value.Email).FirstOrDefault();

                    if (user != null && user.Password == value.Password)
                    {
                        var userClean = _mapper.Map<User>(user);
                        var userRole = _mongoDatabase.GetCollection<Role>("Role").Find(new BsonDocument { { "_id",
                                    ObjectId.Parse(user.RoleId) } }).FirstAsync().Result;
                        userClean.Role = userRole;
                        var token = GenerateAuthToken(userClean, value.IsPersistent);
                        return new ResponseBase<string>(token);
                    }
                    else
                    {
                        errors.Add("Wrong email or password");
                    }
                }
                catch (Exception ex)
                {
                    errors.Add(ex.Message);
                }
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
                return new ResponseBase<string>(null, errors);
            }
            else
            {
                return new ResponseBase<string>();
            }
        }

        private string GenerateAuthToken(User user, bool isPersistent)
        {
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

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}