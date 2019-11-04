using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace green_map.Models
{
    public class LoginRequest
    {
        [DisplayName("Email")]
        [Required(ErrorMessage = "is required")]
        [EmailAddress(ErrorMessage = "is invalid")]
        public string Email { get; set; }

        [DisplayName("Password")]
        [Required(ErrorMessage = "is required")]
        public string Password { get; set; }

        public bool IsPersistent { get; set; }
    }
}