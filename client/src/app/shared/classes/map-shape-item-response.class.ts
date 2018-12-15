import { BaseResponse, IBaseResponse } from "@classes/base-response.class";
import { MapShapeItem } from '@classes/map-shape-item.class';

export class MapShapeItemResponse extends BaseResponse implements IMapShapeItemResponse {
    result:MapShapeItem;

	constructor(data?:IMapShapeItemResponse) {
		super(data);
	}

	init(data?: any) {
		if (data) {
            super.init(data);
            this.result = data.result ? MapShapeItem.fromJS(data.result) : <any>undefined;
		}
	}

	static fromJS(data: any):MapShapeItemResponse {
		let result = new MapShapeItemResponse;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
        super.toJSON(data);
        data["Result"] = this.result ? new MapShapeItem().toJSON(this.result) : <any>undefined;
		return data;
	}
}

export interface IMapShapeItemResponse extends IBaseResponse  {
    result:MapShapeItem;
}