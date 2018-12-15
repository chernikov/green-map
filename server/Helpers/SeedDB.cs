using green_map.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;

namespace green_map.Helpers {
    public class SeedDB {
        private IMongoDatabase _database = null;
        public SeedDB(IOptions<ServerConfiguration> settings) {
            var mongoClient = new MongoClient(settings.Value.MongoConnectionString);  
            if (mongoClient != null) _database = mongoClient.GetDatabase(settings.Value.MongoDatabase); 
        }

        public void Run() {
            this.SeedRole();
            this.SeedUser();
            this.SeedMap();
        }

        public void SeedRole() {
            List<Role> seedList = new List<Role> {
                new Role() {
                    Name = "Admin",
                    Code = "admin"
                },
                new Role() {
                    Name = "User",
                    Code = "User"
                }
            };

            var collection = _database.GetCollection<Role>("Role");
            var list = collection.Find(_ => true).ToList();

            if(list.Count < 1) collection.InsertMany(seedList);
        }

        public void SeedUser() {
            var adminRoleId = _database.GetCollection<Role>("Role").Find(p => p.Code == "admin").First().Id;

            var user = new UserRegistration {
                FirstName = "Dima",
                LastName = "Spodeniuk",
                Email = "dima.spodeniuk@gmail.com",
                Password = "12345",
                RepeatPassword = "12345",
                RoleId = adminRoleId
            };

            var collection = _database.GetCollection<UserRegistration>("User");
            var items = collection.Find(_ => true).ToList();

            if(items.Count < 1) collection.InsertOne(user);
        }

        public void SeedMap() {
            var configs = new Map {
                Zoom = 12,
                Position = new Coordinate {
                    Lat = 48.92446768264424,
                    Lng = 24.707784322753934
                }
            };

            var collection = _database.GetCollection<Map>("Map");
            var items = collection.Find(_ => true).ToList();
            if(items.Count < 1) collection.InsertOne(configs);
        }
    }
}