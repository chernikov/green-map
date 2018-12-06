import { Coordinate } from '@classes/coordinate.class';

export class Map implements IMap {
	id?:string;
	position:Coordinate;
	zoom:number;

	constructor(data?: IMap) {
		if (data) {
			for (var property in data)
				if (data.hasOwnProperty(property)) {
					(<any>this)[property] = (<any>data)[property];
				}
		}
	}

	init(data?: any) {
		if (data) {
			this.id = data.id;
			this.position = data.position ? Coordinate.fromJS(data.position) : <any>undefined;
			this.zoom = data.zoom;
		}
	}

	static fromJS(data: any):Map {
		let result = new Map;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {}
		data["Id"] = this.id;
		data["Position"] = this.position ? new Coordinate().toJSON(this.position) : <any>undefined;
		data["Zoom"] = this.zoom;
		return data;
	}
}

export interface IMap  {
	id?:string;
	position:Coordinate;
	zoom:number;
}