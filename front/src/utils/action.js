import Pathes from "../pathes"
import requester from "./requester"
import './constants'
import { types } from "./constants"

export const refreshTodo = (filter, 
                            searchText, 
                            sort,
                            currentPage, 
                            PAGE_LIMIT, 
                            token) => async (dispatch) => {
  const {list, total} = await requester.put(Pathes.todo(filter,
                                                        searchText,
                                                        sort, 
                                                        currentPage, 
                                                        PAGE_LIMIT), {
  }, token)
  dispatch({type: types.LOAD_LIST}, {list, total})
} 

export const createTodo = (title) => async (dispatch) => {
  const list = await requester.put(Pathes.todo(), {
    title
  }, token)
  dispatch({type: types.LOAD_LIST, list})
}

export const removeTodo = (id) => async (dispatch) => {
  const list = await requester.delete(Pathes.todoId(id), {
    id
  })
  dispatch({types: types.LOAD_LIST, list})
}

export const changeStatus = (id) => async (dispatch) => {
  const list = await requester.post(Pathes.todoId(id), {
    id
  })
  dispatch({types: types.LOAD_LIST, list})
}


export const createUser = (name, parsword) => (dispatch) => {
  const userList = await requester.put(Pathes.signUp(), {
    name, 
    password
  })
  dispatch({type: type.LOAD_LIST, userList})
}

export const loginUser = (name, password) => (dispatch) => {
  const {token} = await requester.put(Pathes.login(), {
    name, 
    password
  })
  dispatch({type: type.LOAD_LIST, token})
}

export const logout = () => (dispatch) => {
  const list = await requester.post(Pathes.logout())
  dispatch({type: type.LOAD_LIST})
}