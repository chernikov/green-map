using System.Collections.Generic;

namespace green_map.Models {
    public class ResponseBase {
        public List<string> Errors { get; set; }
        public bool IsSuccess { get; set; }
    }
}