import { BaseResponse, IBaseResponse } from "@classes/base-response.class";


export class LoginResponse extends BaseResponse implements ILoginResponse {
    result:string;

	constructor(data?:ILoginResponse) {
		super(data);
	}

	init(data?: any) {
		if (data) {
			super.init(data);
            this.result = data.result;
		}
	}

	static fromJS(data: any):LoginResponse {
		let result = new LoginResponse;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
        super.toJSON(data);
        data["Result"] = this.result;
		return data;
	}
}

export interface ILoginResponse extends IBaseResponse  {
    result:string;
}