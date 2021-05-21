import {Todo} from "./Todo";

export const TodoList = ({todoList, token, onRemove, onChange, sort, setSort}) => {
  const dir = sort.dir === 'asc' ? 'Δ' : '∇';
  const changeSort = (field) => () => {
    const newDir = sort.field !== field ? 'asc' : sort.dir === 'asc' ? 'desc' : 'asc';
    setSort({field: field, dir: newDir})
  }
  return <table width={'600px'}>
    <tr>
      <th onClick={changeSort('id')}>
        id {sort.field === 'id' ? dir : ''}
      </th>
      <th onClick={changeSort('title')}>
        title {sort.field === 'title' ? dir : ''}
      </th>
      <th onClick={changeSort('isDone')}>
        is done {sort.field === 'isDone' ? dir : ''}
      </th>
      <th>
        actions
      </th>
    </tr>
    {todoList.map(it =>
      <Todo key={it.id} todo={it}
            onRemove={onRemove}
            onChange={onChange}
            token={token}/>
    )}
  </table>
}