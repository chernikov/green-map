using green_map.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace greenmap.Db
{
    public class DbFactory : IDbFactory
    {
        private readonly IOptions<ServerConfiguration> settings;

        public DbFactory(IOptions<ServerConfiguration> settings)
        {
            this.settings = settings;
        }

        public IMongoDatabase GetDb()
        {
            return new MongoClient(settings.Value.MongoConnectionString).GetDatabase(settings.Value.MongoDatabase);
        }
    }
}
