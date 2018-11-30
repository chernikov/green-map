using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace green_map.Models {
    public class UserRegistration {
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

        [DisplayName("Password")]
        [Required(ErrorMessage = "is required")]
        public string Password { get; set; }

        [DisplayName("RepeatPassword")]
        [Required(ErrorMessage = "is required")]
        public string RepeatPassword { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string RoleId { get; set; }
    }
}