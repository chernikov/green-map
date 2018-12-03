export class Setting implements ISetting {
	id?:string;
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
			if(data.id) this.id = data.id;
            this.title = data.title;
			this.description = data.description;
		}
	}

	static fromJS(data: any):Setting {
		let result = new Setting;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {}
		if(this.id) data["Id"] = this.id;
        data["Title"] = this.title;
		data["Description"] = this.description;
		return data;
	}
}

export interface ISetting {
	id?:string;
    title:string;
	description:string;
}