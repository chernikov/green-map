export class BaseDispatch implements IBaseDispatch {
    type:string;

	constructor(data?: IBaseDispatch) {
		if (data) {
			for (var property in data)
				if (data.hasOwnProperty(property)) {
					(<any>this)[property] = (<any>data)[property];
				}
		}
	}

	init(data?: any) {
		if (data) {
            this.type = data.type;
		}
	}

	static fromJS(data: any):BaseDispatch {
		let result = new BaseDispatch;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {}
        data["Type"] = this.type;
		return data;
	}
}

export interface IBaseDispatch  {
    type:string;
}