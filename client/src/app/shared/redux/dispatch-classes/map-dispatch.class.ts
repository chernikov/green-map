import { BaseDispatch, IBaseDispatch } from "./base-dispatch.class";
import { Map } from "@classes/map.class";

export class MapDispatch extends BaseDispatch implements IMapDispatch {
	payload:Map;

	constructor(data?:IMapDispatch) {
		super(data);
	}
}

export interface IMapDispatch extends IBaseDispatch  {
	payload:Map;
}