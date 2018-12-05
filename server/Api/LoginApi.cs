using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using green_map.Models;
using System;

namespace green_map.Api {
    [Route("api/login")]
    public class LoginApi : BaseApi {
        private readonly IMongoDatabase _db = null;
        private readonly IMapper _mapper;

        public LoginApi(IOptions<ServerConfiguration> settings, IConfiguration config) : base(settings, config) {
            _db = base.GetMongoDB();

            var mapperConfig = new MapperConfiguration(cfg => cfg.CreateMap<UserRegistration, User>());

           _mapper = mapperConfig.CreateMapper();
        }

        [HttpPost]
        public LoginResponse Post([FromBody]Login value) {
            var errors = new List<string>();
            var response = new LoginResponse();

            if(ModelState.IsValid) {
                try {
                    var user = _db.GetCollection<UserRegistration>("User").Find(u => u.Email == value.Email).FirstOrDefault();

                    if(user != null && user.Password == value.Password) {
                        var userClean = _mapper.Map<User>(user);
                        var userRole = _db.GetCollection<Role>("Role").Find(new BsonDocument { { "_id", MongoDB.Bson.ObjectId.Parse(user.RoleId) } }).FirstAsync().Result;
                        userClean.Role = userRole;
                        response.Result = base.GenerateAuthToken(userClean, value.IsPersistent);
                    } else {
                        errors.Add("Wrong email or password");
                    }
                } catch (Exception ex) {
                    errors.Add(ex.Message);
                }
            } else {
                foreach(var item in ModelState) {
                    var key = item.Key;
                    foreach(var error in item.Value.Errors) {
                        errors.Add(key + ' ' + error.ErrorMessage);
                    }
                }
            }

            if(errors.Count > 0) {
                response.Errors = errors;
                response.IsSuccess = false;
                response.Result = null;
            } else {
                response.Errors = null;
                response.IsSuccess = true;
            }
            return response;
        }
    }
}