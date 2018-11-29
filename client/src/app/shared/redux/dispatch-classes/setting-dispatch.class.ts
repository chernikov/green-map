import { BaseDispatch, IBaseDispatch } from "./base-dispatch.class";
import { Setting } from "@classes/setting.class";

export class SettingDispatch extends BaseDispatch implements ISettingDispatch {
	payload:Setting;

	constructor(data?:ISettingDispatch) {
		super(data);
	}
}

export interface ISettingDispatch extends IBaseDispatch  {
	payload:Setting;
}