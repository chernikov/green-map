import { MapShapeItem } from "@classes/map-shape-item.class";

export const MapShapeInitialState:MapShapeItem[] = [];

export const MapShapeAction = {
    add: 'ADD_MAP_SHAPE',
    update: 'UPDATE_MAP_SHAPE',
    remove: 'REMOVE_MAP_SHAPE'
}

export const MapShapeReducer = (state = MapShapeInitialState, action:{type:string, payload:MapShapeItem[]}):MapShapeItem[] => {
    switch(action.type) {
        case MapShapeAction.add:
            return state = [ ...state, ...action.payload ];
        case MapShapeAction.update:
            return state.map(i => {
                let item = action.payload.find(newItem => i.id === newItem.id);
                return item ? { ...item } as MapShapeItem : i;
            });
        case MapShapeAction.remove:
            return state.filter(i => (action.payload.find(b => b.id != i.id)));
        default:
            return state;
    }
}