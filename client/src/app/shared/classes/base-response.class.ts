export class BaseResponse implements IBaseResponse {
    errors:string[];
    isSuccess:boolean;

	constructor(data?: IBaseResponse) {
		if (data) {
			for (var property in data)
				if (data.hasOwnProperty(property)) {
					(<any>this)[property] = (<any>data)[property];
				}
		}
	}

	init(data?: any) {
		if (data) {
			this.errors = data.errors;
			this.isSuccess = data.isSuccess;
		}
	}

	static fromJS(data: any):BaseResponse {
		let result = new BaseResponse;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {}
		data["Errors"] = this.errors;
		data["IsSuccess"] = this.isSuccess;
		return data;
	}
}

export interface IBaseResponse  {
    errors:string[];
    isSuccess:boolean;
}