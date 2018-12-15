import { BaseResponse, IBaseResponse } from "@classes/base-response.class";

export class FileUploadResponse extends BaseResponse implements IFileUploadResponse {
    result:string[];

	constructor(data?:IFileUploadResponse) {
		super(data);
	}

	init(data?: any) {
		if (data) {
            super.init(data);
            this.result = data.result && data.result.length ? data.result : null;
		}
	}

	static fromJS(data: any):FileUploadResponse {
		let result = new FileUploadResponse;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
        super.toJSON(data);
        data["Result"] = this.result;
		return data;
	}
}

export interface IFileUploadResponse extends IBaseResponse  {
    result:string[];
}