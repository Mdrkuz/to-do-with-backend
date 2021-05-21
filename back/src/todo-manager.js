const Todo = require('./todo')
const {Filters} = require("./constants");

const filters = {
  [Filters.ALL]: () => true,
  [Filters.ACTIVE]: it => !it.isDone,
  [Filters.COMPLETED]: it => it.isDone,
}
const sortings = {
  id: (a, b) => a.id - b.id,
  title: (a, b) => a.title.localeCompare(b.title),
  isDone: (a, b) => (a.isDone === b.isDone) ? 0 : a.isDone ? -1 : 1
}


class TodoManager {
  constructor() {
    this.list = [];
    this.idCounter = 0;
  }
  

  createTodo(title, user) {
    return new Todo(title, this.idCounter++, user)
  }

  add(todo) {
    this.list.push(todo)
  }

  addIfNotPresentedByTitle(todo) {
    const similarTodos = this.findByTitle(todo.title)
    if (similarTodos.length === 0) {
      this.add(todo)
    }
  }

  findByTitle(title,  todoList) {
    return (todoList || this.getAll())
      .filter(it => it.title === title)
  }

  searchByTitle(title, todoList) {
    return (todoList || this.getAll())
      .filter(it => it.title.includes(title))
  }

  getAll(user) {
    return this.list.filter(it => it.user === user)
  }

  getFiltered(filter, todoList) {
    return (todoList || this.getAll())
      .filter(filters[filter] || filters[Filters.ALL])
  }

  getByFilterAndSearchText(filter = Filters.ALL, searchText = '', user) {
    return this.getAll(user)
      .filter(filters[filter] || filters[Filters.ALL])
      .filter(it => it.title.includes(searchText))
      .filter(it => it.user === user)
  }

  getByFilterAndSearchTextAndSort(filter = Filters.ALL,
                                  searchText = '',
                                  sortField = 'id',
                                  sortDir = 'asc',
                                  page = 1,
                                  limit = 10,
                                  user) {
    const list = this.getByFilterAndSearchText(filter, searchText, user)
      .sort(sortings[sortField])
    const filteredAndSorted = sortDir === 'asc' ? list : list.reverse()
    const start = (page - 1) * limit
    const end = page * limit
    const paged = filteredAndSorted.slice(start, end);
    return {list: paged, total: list.length}
  }

  getById(id, user) {
    return this.list
      .find(it => it.user === user)
      .find(it => it.id === id)
  }

  changeTodo(id, changeSet) {
    const todo = this.getById(id, user)
    if (todo) {
      Object.keys(todo)
        .forEach(field => {
          if (field in changeSet) {
            todo[field] = changeSet[field];
          }
        })
    }
  }

  remove(id) {
    this.list = this.list.filter(it => it.id !== id)
  }
}


module.exports = TodoManager;
