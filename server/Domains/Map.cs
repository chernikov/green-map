using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace green_map.Domains
{
    public class Map
    {
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
