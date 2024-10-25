import { createSlice } from '@reduxjs/toolkit'
import statedata from "../data/statedata";

const fetchData = () => {
    if(sessionStorage.getItem('treedata') !== null) {
        return JSON.parse(sessionStorage.getItem('treedata'))
    }
    return statedata
}

const treeSlice = createSlice({
    name: 'treedata',
    initialState: fetchData(),
    reducers: {

        check: (state, action) => {
            const {checkVal, props} = action.payload
            state.treedata.data = state.treedata.data.map(cat => checkCat(cat, props, checkVal))
            sessionStorage.setItem('treedata', JSON.stringify(state))
        },

        remove: (state, action) => {
            const {id, cat_id} = action.payload
            state.treedata.data = state.treedata.data.map(cat => {
                if(cat.id === cat_id) {
                    const updatedOptions = cat.options.filter(opt => opt.id !== id)
                    return {...cat,
                        options: updatedOptions,
                        checked: updatedOptions.every(opt => opt.checked),
                        indeterminate: updatedOptions.some(opt => opt.checked) && !updatedOptions.every(opt => opt.checked)
                    }
                }
                return cat
            })
            sessionStorage.setItem('treedata', JSON.stringify(state))
        },

        edit: (state, action) => {
            const { props: {id, cat_id}, newVal} = action.payload

            const toUpdate = state.treedata.data.find(cat => cat.id === cat_id).options.find(opt => opt.id === id);
            toUpdate.name = newVal;
            sessionStorage.setItem('treedata', JSON.stringify(state));
        },

        reorder: (state, action) => {
            const {draggedId, newIndex, cat_id} = action.payload

            state.treedata.data = state.treedata.data.map(cat => {
                if(cat.id === cat_id) {
                    reOrderOptions(cat, draggedId, newIndex)
                }
                return cat
            })
            sessionStorage.setItem('treedata', JSON.stringify(state))
        }
    }
})

const reOrderOptions = (cat, draggedId, newIndex) => {
  const oldIndex = cat.options.find(opt => opt.id === draggedId).order
  if(oldIndex === newIndex) return cat
  
  const updatedOptions = cat.options.map(opt => {

      // move order by 1 for options between oldIndex and newIndex
      if(oldIndex < newIndex) {
          if(opt.order <= newIndex && opt.order > oldIndex) opt.order = opt.order - 1
      }
      else {  // (oldIndex > newIndex)
          if(opt.order >= newIndex && opt.order < oldIndex) opt.order = opt.order + 1
      }

      // set the newIndex for dragged option 
      if(opt.id === draggedId) opt.order = newIndex

      return opt
  })

  updatedOptions.sort((a, b) => {
        return a.order > b.order ? 1 : -1
    });

  return {...cat, options: updatedOptions}
}

const checkCat = (cat, props, checkVal) => {
  const catId = props.cat_id || props.id;
  
  if(props.isCheckAll || cat.id === catId) {  // updated one

      const updatedOptions = cat.options.map(opt => checkOpt(opt, props, checkVal))

      return {...cat,
          options: updatedOptions,
          checked: props.isCheckAll || props.level === 0 ? checkVal : updatedOptions.every(opt => opt.checked),
          indeterminate: updatedOptions.some(opt => opt.checked) && !updatedOptions.every(opt => opt.checked)
      }
  }

  return cat
}

const checkOpt = (opt, props, checkVal) => {
  
  if(props.isCheckAll || props.level === 0 || opt.id === props.id)
  return {...opt, checked: checkVal}
  
  return opt
}


export const { check, edit, remove, reorder } = treeSlice.actions

export default treeSlice.reducer