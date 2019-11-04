using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace green_map.Domains
{
    public class MapShapeItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string Id { get; set; }

        [DisplayName("Title")]
        [Required(ErrorMessage = "is required")]
        public string Title { get; set; }

        [DisplayName("Description")]
        [Required(ErrorMessage = "is required")]
        public string Description { get; set; }

        [DisplayName("Coordinates")]
        [Required(ErrorMessage = "is required")]
        public List<Coordinate> Coordinates { get; set; }

        [DisplayName("Images")]
        public List<string> Images { get; set; }
    }
}
