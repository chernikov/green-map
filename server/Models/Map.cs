using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace green_map.Models {
    public class Map {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string Id { get; set; }

        [DisplayName("Zoom")]
        [Required(ErrorMessage = "is required")]
        public double Zoom { get; set; }

        [DisplayName("Position")]
        [Required(ErrorMessage = "is required")]
        public Coordinate Position { get; set; }
    }
}
