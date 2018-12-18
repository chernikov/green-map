import { MapShapeItem } from "@classes/map-shape-item.class";

export const MapShapeInitialState:MapShapeItem[] = [];

export const MapShapeAction = {
    update: 'UPDATE_MAP_SHAPE',
    remove: 'REMOVE_MAP_SHAPE'
}

export const MapShapeReducer = (state = MapShapeInitialState, action:{type:string, payload:MapShapeItem[]}):MapShapeItem[] => {
    switch(action.type) {
        case MapShapeAction.update:
            if(state.length) {
                let newState = [];
                
                // update
                for(let current of state) {
                    let item = action.payload.find(newItem => current.id === newItem.id);
                    item ? newState.push(item) : newState.push(current);
                }

                // add new
                for(let newItem of action.payload) {
                    let item = newState.find(i => i.id === newItem.id);
                    if(!item) newState.push(newItem)
                }

                return state = newState;
            } else {
                return state = [ ...state, ...action.payload ];
            }
        case MapShapeAction.remove:
            return state.filter(i => (action.payload.find(b => b.id != i.id)));
        default:
            return state;
    }
}