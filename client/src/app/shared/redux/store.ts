import { combineReducers } from "redux";

import { User } from "@classes/user.class";
import { MapConfig } from "@classes/map-config.class";
import { Setting } from "@classes/setting.class";

import { AuthTokenReducer, AuthTokenInitialState } from "@global-reducers/auth-token.reducer";
import { AuthUserReducer, AuthUserInitialState } from "@global-reducers/auth-user.reducer";
import { SettingInitialState, SettingReducer } from "@global-reducers/setting.reducer";



import { MapConfigReducer, MapConfigInitialState } from "@global-reducers/map.reducer";

export interface IAppState {
    authToken:string;
    authUser:User;
    setting:Setting;



    mapConfig:MapConfig;
}

export const INITIAL_STATE:IAppState = {
    authToken: AuthTokenInitialState,
    authUser: AuthUserInitialState,
    setting: SettingInitialState,



    mapConfig: MapConfigInitialState,
};

export const rootReducer = combineReducers<IAppState>({
    authToken: AuthTokenReducer,
    authUser: AuthUserReducer,
    setting: SettingReducer,





    mapConfig: MapConfigReducer
});