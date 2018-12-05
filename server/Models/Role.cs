using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace green_map.Models {
    public class Role {
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