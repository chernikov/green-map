using green_map.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace green_map.Hubs
{
    public class MapShapeHub : Hub<IMapShapeHub> {
        public async Task Send(string type, MapShapeItem item) {
            await Clients.All.MapShapeChange(type, item);
        }
    }

    public interface IMapShapeHub {
        Task MapShapeChange(string type, MapShapeItem item);
    }
}