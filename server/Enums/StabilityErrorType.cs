using System;

namespace green_map.Enums
{
    [Flags]
    public enum StabilityErrorType
    {
        WebApi = 0,
        WebApp = 1,
        MobileApi = 2,
        MobileApp = 3
    }
}