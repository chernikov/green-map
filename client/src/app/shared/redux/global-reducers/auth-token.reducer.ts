export const AuthTokenInitialState:string = null;

export const AuthTokenAction = {
    save: 'SAVE_AUTH_TOKEN',
    remove: 'REMOVE_AUTH_TOKEN'
}

export const AuthTokenReducer = (state = AuthTokenInitialState, action: {type:string, payload:string}):string => {
    switch(action.type) {
        case AuthTokenAction.save:
            localStorage.setItem('authToken', action.payload);
            return state = action.payload;
        case AuthTokenAction.remove:
            localStorage.removeItem('authToken');
            return state = null;
        default:
            return state;
    }
}