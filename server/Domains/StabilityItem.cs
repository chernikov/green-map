using green_map.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace green_map.Domains
{
    public class StabilityItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string Id { get; set; }

        [DisplayName("Url")]
        public string Url { get; set; }

        [DisplayName("ApiUrl")]
        public string ApiUrl { get; set; }

        [DisplayName("PostData")]
        public string PostData { get; set; }

        [DisplayName("Message")]
        [Required(ErrorMessage = "is required")]
        public string Message { get; set; }

        [DisplayName("JwtToken")]
        public string JwtToken { get; set; }

        [DisplayName("AddedDate")]
        public DateTime AddedDate { get; set; }

        [DisplayName("Type")]
        [Required(ErrorMessage = "is required")]
        public StabilityErrorType Type { get; set; }

        [DisplayName("FunctionName")]
        public string FunctionName { get; set; }
    }
}