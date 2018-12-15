import { BaseDispatch, IBaseDispatch } from "./base-dispatch.class";
import { MapShapeItem } from "@classes/map-shape-item.class";

export class MapShapeDispatch extends BaseDispatch implements IMapShapeDispatch {
	payload:MapShapeItem[];

	constructor(data?:IMapShapeDispatch) {
		super(data);
	}
}

export interface IMapShapeDispatch extends IBaseDispatch  {
	payload:MapShapeItem[];
}