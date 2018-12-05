import { Setting } from "@classes/setting.class";

export const SettingInitialState:Setting = null;

export const SettingAction = {
    update: 'UPDATE_SETTING'
}

export const SettingReducer = (state = SettingInitialState, action:{type:string, payload:Setting}):Setting => {
    switch(action.type) {
        case SettingAction.update:
            return state = { ...action.payload } as Setting;
        default:
            return state;
    }
}