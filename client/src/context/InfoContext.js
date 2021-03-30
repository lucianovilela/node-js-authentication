import React, { createContext } from "react";
const ContextAuth = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        case "FETCHING_URL_START":
          console.log("FETCHING_URL_START", action);
          return {
            ...prevState,
            isLoading:true,
            info:{}
          };
          
        case "FETCHING_URL_END":
          console.log("FETCHING_URL_END", action);
          AsyncStorage.setItem(action.payload.info?.name, JSON.stringify(action.payload));
          return {
            ...prevState,
            isLoading:false,
            info:action.payload
          };
        case "LOAD_LIST":
          return {
            ...prevState,
            lista:action.payload
          };
      }
    },
    {
      isLoading: true,
      isSignout: true,
      user: {},
      userToken: null,
      info:undefined, 
      lista:[]
    }
  );

  const listenerUser = async (user) => {
    if(!user) return;
    console.log("onChangeUser", user);
    const token = await  user.getIdToken();
    const serverUser = await fetch(`https://portaoeletronico.herokuapp.com/api/user/validate?email=${user.email}`,{
      method:"GET",
      headers : new Headers({'token':token})
    }).then(result => result.json());
    console.log("onChangeUser", serverUser)
    if (user) {
      dispatch({ type: "SIGN_IN", user: user });
    }
  };

  React.useEffect(() => {
    (async () => {
      const lista = [];
      const keys = await AsyncStorage.getAllKeys();
      for (let key of keys) {
        const item = await AsyncStorage.getItem(key);
        try {
          lista.push(JSON.parse(item));

        } catch (error) {

        }
      }
      dispatch({type:"LOAD_LIST", payload:lista})
    })();

  }, []);

  const action = React.useMemo(() => ({
    signIn: async ({ email, password }) => {
    },
    signOut: async () => {

    },
    signUp: async ({ email, password }) => {

    },
    fechingURL: async ( url, token ) => {
      dispatch({ type: "FETCHING_URL_START" })
      fetch(url, { method:"GET", headers:new Headers({"token":token})})
      .then(result=>result.json())
      .then(result=> dispatch({ type: "FETCHING_URL_END", payload:result }))
    },

    
  }));
  return (
    <ContextAuth.Provider value={{ action, state }}>
      {children}
    </ContextAuth.Provider>
  );
};

export { InfoProvider   };
