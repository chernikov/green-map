import { MapConfig } from "@classes/map-config.class";

export const MapConfigInitialState:MapConfig = null;

export const MapConfigAction = {
    update: 'UPDATE_MAP_CONFIG'
}

export const MapConfigReducer = (state = MapConfigInitialState, action:{type:string, payload:MapConfig}):MapConfig => {
    switch(action.type) {
        case MapConfigAction.update:
            return state = action.payload;
        default:
            return state;
    }
}