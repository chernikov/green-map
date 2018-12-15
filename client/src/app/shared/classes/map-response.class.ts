import { BaseResponse, IBaseResponse } from "@classes/base-response.class";
import { Map } from '@classes/map.class';

export class MapResponse extends BaseResponse implements IMapResponse {
    result:Map;

	constructor(data?:IMapResponse) {
		super(data);
	}

	init(data?: any) {
		if (data) {
            super.init(data);
            this.result = data.result ? Map.fromJS(data.result) : <any>undefined;
		}
	}

	static fromJS(data: any):MapResponse {
		let result = new MapResponse;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
        super.toJSON(data);
        data["Result"] = this.result ? new Map().toJSON(this.result) : <any>undefined;
		return data;
	}
}

export interface IMapResponse extends IBaseResponse  {
    result:Map;
}