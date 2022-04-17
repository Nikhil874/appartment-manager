import { LOGIN_ID } from "./action";

const initState={_id:null};

export const loginReducer=(store=initState,{type,payload})=>{
    console.log(store);
    switch(type){
        case LOGIN_ID:
            return {...store,_id:payload};
        default:
            return store;
    }
}