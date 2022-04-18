export const LOGIN_ID="LOGIN_ID";
export const FLAT_ID="FLAT_ID";
export const LOADING_STATE="LOADING_STATE";

export const getLogin=(payload)=>({type:LOGIN_ID,payload})
export const getFlat=(payload)=>({type:FLAT_ID,payload})
export const toggleLoading=(payload)=>({type:LOADING_STATE,payload})