import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk';
import {combineReducers} from 'redux'


export const todoReducer = (state = {list: []}, action) => {
  switch(action.type) {
    case 'LOAD_LIST':
      return {

      }
    default: 
      return state
  }
}


export const userReducer = (state = {userList: []}, action) => {
  switch(action.type) {
    case '': 
      return {

      }
    default: 
      return state
  }
}

const mega = combineReducers ({
  todoReducer,
  userReducer
})

const store = createStore(mega, applyMiddleware(thunk))
export default store;


