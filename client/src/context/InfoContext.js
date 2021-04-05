import React, { createContext } from "react";
import AsyncStorage from 'AsyncStorage';

import instance from "../api/loader";

const ContextAuth = createContext();
export default ContextAuth;

const InfoProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        userToken: action.token,
                        isSignout: false,
                        isLoading: false,
                    };
                case "SIGN_IN":
                    //console.log('action.user', action.user)
                    return {
                        ...prevState,
                        isSignout: false,
                        user: action.user,
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        user: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: true,
            user: {},
            userToken: null,
            info: undefined,
            lista: []
        }
    );

    const action = React.useMemo(() => ({
        signIn: async ({ email, password }) => {
            instance({
                method: "POST",
                url: "/api/signin",
                data: { email, password }
            })
                .then(response => console.log);

        },
        signOut: async () => {

        },
        signUp: async ({firstName, lastName, email, password, confirmPassword }) => {
            instance({
                method: "POST",
                url: "/api/signup",
                data: { firstName, lastName, email, password, confirmPassword }
            })
                .then(response => console.log);

        },
        fechingURL: async (url, token) => {
            dispatch({ type: "FETCHING_URL_START" })
            fetch(url, { method: "GET", headers: new Headers({ "token": token }) })
                .then(result => result.json())
                .then(result => dispatch({ type: "FETCHING_URL_END", payload: result }))
        },


    }));
    return (
        <ContextAuth.Provider value={{ action, state }}>
            {children}
        </ContextAuth.Provider>
    );
};

export { InfoProvider };
