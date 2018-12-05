import { BaseResponse, IBaseResponse } from "@classes/base-response.class";

export class SettingResponse extends BaseResponse implements ISettingResponse {
    result:string;

	constructor(data?:ISettingResponse) {
		super(data);
	}

	init(data?: any) {
		if (data) {
			super.init(data);
            this.result = data.result;
		}
	}

	static fromJS(data: any):SettingResponse {
		let result = new SettingResponse;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
        super.toJSON(data);
        data["Result"] = this.result;
		return data;
	}
}

export interface ISettingResponse extends IBaseResponse  {
    result:string;
}