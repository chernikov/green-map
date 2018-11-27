import { MapShape } from "./map-shape.class";

export class MapData implements IMapData {
	polygon:MapShape[];

	constructor(data?: IMapData) {
		if (data) {
			for (var property in data)
				if (data.hasOwnProperty(property)) {
					(<any>this)[property] = (<any>data)[property];
				}
		}
	}

	init(data?: any) {
		if (data) {
            if (data.polygon && data.polygon.constructor === Array) {
                this.polygon = [];
                for (let item of data.polygon) {
                    this.polygon.push(MapShape.fromJS(item));
                }
            }
		}
	}

	static fromJS(data: any):MapData {
		let result = new MapData;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
        data = typeof data === 'object' ? data : {}
        if (this.polygon && this.polygon.constructor === Array) {
            data["Polygon"] = [];
            for (let item of this.polygon)
                data["Polygon"].push(item.toJSON());
        }
		return data;
	}
}

export interface IMapData  {
	polygon:MapShape[];
}