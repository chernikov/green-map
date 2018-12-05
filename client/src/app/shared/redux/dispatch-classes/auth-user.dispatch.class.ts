import { BaseDispatch, IBaseDispatch } from "./base-dispatch.class";
import { User } from "@classes/user.class";

export class AuthUserDispatch extends BaseDispatch implements IAuthUserDispatch {
	payload:User;

	constructor(data?:IAuthUserDispatch) {
		super(data);
	}
}

export interface IAuthUserDispatch extends IBaseDispatch  {
	payload:User;
}