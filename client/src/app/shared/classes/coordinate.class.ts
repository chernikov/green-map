export class Coordinate implements ICoordinate {
    lat:number;
    lng:number;

	constructor(data?: ICoordinate) {
		if (data) {
			for (var property in data)
				if (data.hasOwnProperty(property)) {
					(<any>this)[property] = (<any>data)[property];
				}
		}
	}

	init(data?: any) {
		if (data) {
            this.lat = data.lat;
            this.lng = data.lng;
		}
	}

	static fromJS(data: any):Coordinate {
		let result = new Coordinate;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {}
        data["Lat"] = this.lat;
        data["Lng"] = this.lng;
		return data;
	}
}

export interface ICoordinate  {
    lat:number;
    lng:number;
}