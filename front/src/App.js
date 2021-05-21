import './App.css';
import LoginUser from './components/LoginUser';
import CreateUser from './components/CreateUser'
import {useEffect, useState} from "react";
import requester from "./utils/requester";
import Pathes from "./pathes";
import {Filters} from "./constants";
import {Filter} from "./components/Filters";
import {Search} from "./components/Search";
import {TodoList} from "./components/TodoList";
import { ChangePages } from './components/ChangePages';
import {LogoutUser} from './components/LogoutUser'
import { createUser, refreshTodo } from './utils/action';
import { connect } from 'react-redux';
import CreateTodo from './components/CreateTodo';



function App(props) {
  const [todoList, setTodoList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [todoTotal, setTodoTotal] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [sort, setSort] = useState({field: 'id', dir: 'asc'})
  const [token, setToken] = useState()
  const PAGE_LIMIT = 10

  const refreshTodoList = async () => {
    const {list, total} = await requester.get(Pathes.todo(filter, searchText, sort, currentPage, PAGE_LIMIT), token)
    setTodoList(list)
    setTodoTotal(total)
    
    console.log(token);
  }
  useEffect(() => {
    refreshTodoList()
    console.log(todoList);
  }, [filter, searchText, sort, currentPage, token])


  if(!props.token) {
    return (
      <div align='center'>
        <CreateUser onSignUp={refresh}/>
        <LoginUser onLogin={(token) => {setToken(token)}}/> 
      </div>
    );
  } 
    return (
      <div className="App"> 
        <CreateTodo onAdd={refresh} token={token}/>
        <Filter filter={filter} setFilter={setFilter}/>
        <Search searchText={searchText} setSearchText={setSearchText}/>
        <TodoList list={props.list}
                  token={token}
                  sort={sort}
                  setSort={setSort}
                  delete={props.delete}
                  onChange={refresh}/>
  
        <ChangePages todoTotal={todoTotal}
                     currentPage={currentPage}
                     setCurrentPage={setCurrentPage}
                     PAGE_LIMIT={PAGE_LIMIT}/>  
                     
        <LogoutUser onLogout={() => setToken(undefined)}
                    token={token}/>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}
const mapDispatchToProps = dispatch => ({
  refresh: (filter, 
            searchText, 
            sort, 
            currentPage, 
            PAGE_LIMIT, 
            token) => dispatch(refreshTodo(
              filter, 
              searchText, 
              sort, 
              currentPage, 
              PAGE_LIMIT, 
              token
            )),
  delete: id => dispatch(removeTodo(id)),
  filter: type => dispatch(changeTodo(type)),
  toggle: (complete, id) => dispatch(toggleTodo(complete, id))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App); 
