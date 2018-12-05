export class Login implements ILogin {
    email:string;
	password:string;
	isPersistent:boolean;

	constructor(data?: ILogin) {
		if (data) {
			for (var property in data)
				if (data.hasOwnProperty(property)) {
					(<any>this)[property] = (<any>data)[property];
				}
		}
	}

	init(data?: any) {
		if (data) {
            this.email = data.email;
			this.password = data.password;
			this.isPersistent = data.isPersistent;
		}
	}

	static fromJS(data: any):Login {
		let result = new Login;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {}
        data["Email"] = this.email;
		data["Password"] = this.password;
		data["IsPersistent"] = this.isPersistent;
		return data;
	}
}

export interface ILogin  {
    email:string;
	password:string;
	isPersistent:boolean;
}