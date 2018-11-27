import { Coordinate } from "./coordinate.class";

export class MapShape implements IMapShape {
	coordinate:Coordinate[];

	constructor(data?: IMapShape) {
		if (data) {
			for (var property in data)
				if (data.hasOwnProperty(property)) {
					(<any>this)[property] = (<any>data)[property];
				}
		}
	}

	init(data?: any) {
		if (data) {
            if (data.coordinate && data.coordinate.constructor === Array) {
                this.coordinate = [] as Coordinate[];
                for (let item of data.coordinate) {
                    this.coordinate.push(Coordinate.fromJS(item));
                }
            }
		}
	}

	static fromJS(data: any):MapShape {
		let result = new MapShape;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
        data = typeof data === 'object' ? data : {}
        if (this.coordinate && this.coordinate.constructor === Array) {
            data["Coordinate"] = [];
            for (let item of this.coordinate as Coordinate[])
                data["Coordinate"].push(item.toJSON());
        }
		return data;
	}
}

export interface IMapShape  {
	coordinate:Coordinate[];
}