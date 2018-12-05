export class Role implements IRole {
    id:string;
    code:string;
    name:string;

	constructor(data?: IRole) {
		if (data) {
			for (var property in data)
				if (data.hasOwnProperty(property)) {
					(<any>this)[property] = (<any>data)[property];
				}
		}
	}

	init(data?: any) {
		if (data) {
            this.id = data.Id;
            this.code = data.Code;
			this.name = data.Name;
		}
	}

	static fromJS(data: any):Role {
		let result = new Role;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {}
        data["Id"] = this.id;
        data["Code"] = this.code;
		data["Name"] = this.name;
		return data;
	}
}

export interface IRole  {
    id:string;
    code:string;
    name:string;
}