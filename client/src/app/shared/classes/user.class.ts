import { Role } from "@classes/role.class";

export class User implements IUser {
	id:string;
	firstName:string;
	lastName:string;
	email:string;
	role:Role;

	constructor(data?: IUser) {
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
			this.firstName = data.FirstName;
			this.lastName = data.LastName;
			this.email = data.Email;
			this.role = data.Role ? Role.fromJS(data.Role) : <any>undefined;
		}
	}

	static fromJS(data: any):User {
		let result = new User;
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {}
		data['Id'] = this.id;
		data["FirstName"] = this.firstName;
		data["LastName"] = this.lastName;
		data["Email"] = this.email;
		data["Role"] = this.role ? new Role().toJSON(this.role) : <any>undefined;
		return data;
	}
}

export interface IUser  {
	id:string;
	firstName:string;
	lastName:string;
	email:string;
	role:Role;
}