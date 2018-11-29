export class Setting implements ISetting {
    title:string;
	description:string;

	constructor(data?:ISetting) {
		if (data) {
			for (var property in data)
				if (data.hasOwnProperty(property)) {
					(<any>this)[property] = (<any>data)[property];
				}
		}
	}

	init(data?: any) {
		if (data) {
            this.title = data.email;
			this.description = data.password;
		}
	}

	static fromJS(data: any):Setting {
		let result = new Setting;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {}
        data["Title"] = this.title;
		data["Description"] = this.description;
		return data;
	}
}

export interface ISetting {
    title:string;
	description:string;
}