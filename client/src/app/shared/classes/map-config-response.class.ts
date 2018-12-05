import { BaseResponse, IBaseResponse } from "@classes/base-response.class";
import { MapConfig } from '@classes/map-config.class';

export class MapConfigResponse extends BaseResponse implements IMapConfigResponse {
    result:MapConfig;

	constructor(data?:IMapConfigResponse) {
		super(data);
	}

	init(data?: any) {
		if (data) {
            super.init(data);
            this.result = data.result ? MapConfig.fromJS(data.result) : <any>undefined;
		}
	}

	static fromJS(data: any):MapConfigResponse {
		let result = new MapConfigResponse;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
        super.toJSON(data);
        data["Result"] = this.result ? new MapConfig().toJSON(this.result) : <any>undefined;
		return data;
	}
}

export interface IMapConfigResponse extends IBaseResponse  {
    result:MapConfig;
}