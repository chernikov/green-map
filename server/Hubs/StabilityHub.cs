using green_map.Domains;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace green_map.Hubs
{
    public class StabilityHub : Hub<IStabilityHub>
    {
        public async Task Send(string type, StabilityItem item)
        {
            await Clients.All.StabilityChange(type, item);
        }
    }

    public interface IStabilityHub
    {
        Task StabilityChange(string type, StabilityItem item);
    }
}