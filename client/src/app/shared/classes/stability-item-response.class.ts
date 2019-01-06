import { BaseResponse, IBaseResponse } from "@classes/base-response.class";
import { StabilityItem } from "./stability-item.class";

export class StabilityItemResponse extends BaseResponse implements IStabilityItemResponse {
    result:StabilityItem;

	constructor(data?:IStabilityItemResponse) {
		super(data);
	}

	init(data?: any) {
		if (data) {
            super.init(data);
            this.result = data.result ? StabilityItem.fromJS(data.result) : <any>undefined;
		}
	}

	static fromJS(data: any):StabilityItemResponse {
		let result = new StabilityItemResponse;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
        super.toJSON(data);
        data["Result"] = this.result ? new StabilityItem().toJSON(this.result) : <any>undefined;
		return data;
	}
}

export interface IStabilityItemResponse extends IBaseResponse  {
    result:StabilityItem;
}