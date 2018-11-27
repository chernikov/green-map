import { User } from "@classes/user.class";

export const AuthUserInitialState:User = null;

export const AuthUserAction = {
    save: 'SAVE_AUTH_USER',
    remove: 'REMOVE_AUTH_USER'
}

export const AuthUserReducer = (state = AuthUserInitialState, action:{type:string, payload:User}):User => {
    switch(action.type) {
        case AuthUserAction.save:
            return state = action.payload;
        case AuthUserAction.remove:
            return state = null;
        default:
            return state;
    }
}