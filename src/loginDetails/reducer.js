import { LOGIN_ID } from "./action";
import { FLAT_ID } from "./action";
const initState={_id:null,flat_id:null};

export const loginReducer=(store=initState,{type,payload})=>{
    console.log(store);
    switch(type){
        case LOGIN_ID:
            return {...store,_id:payload};
            case FLAT_ID:
                return {...store,flat_id:payload}
        default:
            return store;
    }
}