import { StabilityErrorType } from "@enums/stability.enum";

export class StabilityItem implements IStabilityItem {
	id?:string;
    url?:string;
    apiUrl?:string;
    postData?:string;
    message:string;
    jwtToken?:string;
    addedDate?:Date;
    type:StabilityErrorType;
    functionName?:string;

	constructor(data?:IStabilityItem) {
		if (data) {
			for (var property in data)
				if (data.hasOwnProperty(property)) {
					(<any>this)[property] = (<any>data)[property];
				}
		}
	}

	init(data?: any) {
		if (data) {
			if(data.id) this.id = data.id;
            if(data.url) this.url = data.url;
            if(data.apiUrl) this.apiUrl = data.apiUrl;
            if(data.postData) this.postData = data.postData;
            if(data.functionName) this.functionName = data.functionName;
            if(data.addedDate) this.addedDate = data.addedDate ? new Date(data.addedDate.toString()) : <any>undefined;
            this.message = data.message;
            if(data.jwtToken) this.jwtToken = data.jwtToken;
            this.type = data.type;
		}
	}

	static fromJS(data: any):StabilityItem {
		let result = new StabilityItem;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {}
		if(this.id) data["Id"] = this.id;
        if(this.url) data["Url"] = this.url;
        if(this.apiUrl) data["ApiUrl"] = this.apiUrl;
        if(this.postData) data["PostData"] = this.postData;
        if(this.functionName) data["FunctionName"] = this.functionName;
        if(this.addedDate) data["AddedDate"] = this.addedDate ? this.addedDate.toISOString() : <any>undefined
        data["Message"] = this.message;
        data["Type"] = this.type;
        if(this.jwtToken) data["JwtToken"] = this.jwtToken;
		return data;
	}
}

export interface IStabilityItem {
	id?:string;
    url?:string;
    apiUrl?:string;
    postData?:string;
    message:string;
    jwtToken?:string;
    addedDate?:Date;
    type:StabilityErrorType;
    functionName?:string;
}