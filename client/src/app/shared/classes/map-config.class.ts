import { Coordinate } from '@classes/coordinate.class';
import { MapData } from './map-data.class';

export class MapConfig implements IMapConfig {
	id?:string;
	position:Coordinate;
	zoom:number;
	data?:MapData;

	constructor(data?: IMapConfig) {
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
			this.data = data.data ? MapData.fromJS(data.data) : <any>undefined;
		}
	}

	static fromJS(data: any):MapConfig {
		let result = new MapConfig;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {}
		data["Id"] = this.id;
		data["Position"] = this.position ? new Coordinate().toJSON(this.position) : <any>undefined;
		data["Zoom"] = this.zoom;
		data["Data"] = this.data ? new MapData().toJSON(this.position) : <any>undefined;
		return data;
	}
}

export interface IMapConfig  {
	id?:string;
	position:Coordinate;
	zoom:number;
	data?:MapData;
}