import { combineReducers } from 'redux'
// import {addid,deleteid} from './action'

function collectChange(state=[],action){
    console.log(state)
    switch(action.type){
        case 'ADD':
            console.log("add")
            return [action.id , ...state]
        case 'DELETE':
            console.log("delete")
            let a=[...state]
            a.splice(state.indexOf(action.id),1)
            return a
        default:
            return state
    }
}

const collect = combineReducers({collectChange})

export default collect