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
            //this.SeedMapConfigs();
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

/*         public void SeedMapConfigs() {
            var configs = new MapConfig {
                Zoom = 12,
                Position = new Coordinate {
                    Lat = 48.925370,
                    Lng = 24.707441
                }
            };

            var collection = _database.GetCollection<MapConfig>("MapConfig");
            var items = collection.Find(_ => true).ToList();
            if(items.Count < 1) collection.InsertOne(configs);
        } */
    }
}