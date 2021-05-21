class Pathes {
  static todo =
    (
      filter = '',
      searchText = '',
      sort = {field: 'id', dir: 'asc'},
      currentPage = 1,
      limit = 10
    ) =>
      `/todo?filter=${filter}&searchText=${searchText}&sortField=${sort.field}&sortDir=${sort.dir}&page=${currentPage}&limit=${limit}`
  static todoId = id => `/todo/${id}`
  static signUp = () => `/signup`
  static login = () => `/login`
  static logout = () => `/logout`
}

export default Pathes
