import { createStore } from "redux";
import statedata from "../data/statedata";

const treeStoreReducer = (state = statedata, action) => {

    const treedata = state.treedata.data;
    let updatedData = [];

    switch(action.type) {
        case 'CHECK':
            const {checkVal, props} = action;

            updatedData = treedata.map(cat => reduceCat(cat, props, checkVal))

            return { treedata: {data: updatedData }}
            
    }
    return state;
}

const reduceCat = (cat, props, checkVal) => {
    const catId = props.cat_id || props.id;
    
    if(cat.id === catId) {  // updated one

        let updatedOptions = cat.options.map(opt => reduceOpt(opt, props, checkVal))

        return {...cat,
            checked: props.level === 0 ? checkVal : updatedOptions.every(opt => opt.checked),
            options: updatedOptions
        }
    }

    return cat
}

const reduceOpt = (opt, props, checkVal) => {
    
    if(props.level === 0 || opt.id === props.id)
    return {...opt, checked: checkVal}
    
    return opt
}

const store = createStore(treeStoreReducer);

export default store