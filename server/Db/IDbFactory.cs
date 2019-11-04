using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace greenmap.Db
{
    public interface IDbFactory
    {
        IMongoDatabase GetDb();
    }
}
