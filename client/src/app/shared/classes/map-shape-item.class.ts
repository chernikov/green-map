import { Coordinate } from '@classes/coordinate.class';

export class MapShapeItem implements IMapShapeItem {
	id?:string;
	title:string;
	description:string;
	coordinates:Coordinate[];
	images:string[];

	constructor(data?: IMapShapeItem) {
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
			this.title = data.title;
			this.description = data.description;
            this.coordinates = [];
			for(let item of data.coordinates) this.coordinates.push(Coordinate.fromJS(item));
			this.images = data.images;
		}
	}

	static fromJS(data: any):MapShapeItem {
		let result = new MapShapeItem();
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {}
		data["Id"] = this.id;
		data["Title"] = this.title;
		data["Description"] = this.description;
        data["Coordinates"] = [];
		for(let item of this.coordinates) data["Coordinates"].push(item.toJSON());
		data["Images"] = [];
		for(let item of this.images) data["Images"].push(item);
		return data;
	}
}

export interface IMapShapeItem {
	id?:string;
	title:string;
	description:string;
	coordinates:Coordinate[];
	images:string[];
}