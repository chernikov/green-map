using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace green_map.Models {
    public class User {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string Id { get; set; }

        [DisplayName("FirstName")]
        [Required(ErrorMessage = "is required")]
        public string FirstName { get; set; }

        [DisplayName("LastName")]
        [Required(ErrorMessage = "is required")]
        public string LastName { get; set; }

        [DisplayName("Email")]
        [Required(ErrorMessage = "is required")]
        [EmailAddress(ErrorMessage = "is invalid")]
        public string Email { get; set; }

        public Role Role { get; set; }
    }
}