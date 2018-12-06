using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace green_map.Models {
    public class Coordinate {

        [DisplayName("Lat")]
        [Required(ErrorMessage = "is required")]
        public double Lat { get; set; }

        [DisplayName("Lng")]
        [Required(ErrorMessage = "is required")]
        public double Lng { get; set; }
    }
}
