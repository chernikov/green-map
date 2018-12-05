import { BaseDispatch, IBaseDispatch } from "./base-dispatch.class";
import { User } from "@classes/user.class";

export class AuthTokenDispatch extends BaseDispatch implements IAuthTokenDispatch {
	payload:string;

	constructor(data?:IAuthTokenDispatch) {
		super(data);
	}
}

export interface IAuthTokenDispatch extends IBaseDispatch  {
	payload:string;
}