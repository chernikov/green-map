using System.Collections.Generic;

namespace green_map.Models
{
    public class ResponseBase<T>
    {
        public List<string> Errors { get; set; }

        public bool IsSuccess { get; set; }

        public T Result { get; set; }

        public ResponseBase(T result, List<string> errors)
        {
            this.Result = result;
            this.Errors = errors;
            this.IsSuccess = errors != null;
        }

        public ResponseBase(T result) : this(result, null)
        {

        }

        public ResponseBase() : this(default(T), null)
        {

        }
    }
}