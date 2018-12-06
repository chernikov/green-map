import { Map } from "@classes/map.class";

export const MapInitialState:Map = null;

export const MapAction = {
    update: 'UPDATE_MAP'
}

export const MapReducer = (state = MapInitialState, action:{type:string, payload:Map}):Map => {
    switch(action.type) {
        case MapAction.update:
            return state = action.payload;
        default:
            return state;
    }
}