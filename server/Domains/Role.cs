using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace green_map.Domains
{
    public class Role
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string Id { get; set; }

        [DisplayName("Name")]
        [Required(ErrorMessage = "is required")]
        public string Name { get; set; }

        [DisplayName("Code")]
        [Required(ErrorMessage = "is required")]
        public string Code { get; set; }
    }
}