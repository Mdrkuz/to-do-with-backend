import requester from "../utils/requester";
import Pathes from "../pathes";

export function Todo({todo, onRemove, onChange, token}) {
  const removeTodo = async () => {
    try {
      await requester.delete(Pathes.todoId(todo.id), token)
      onRemove && onRemove()
    } catch (e) {
      console.log(e)
    }
  }
  const changeStatus = async () => {
    try {
      await requester.post(Pathes.todoId(todo.id), {
        isDone: !todo.isDone
      }, token)
      onChange && onChange()
    } catch (e) {
      console.log(e)
    }
  }
  return <tr>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td>{todo.isDone ? 'done' : 'not done'}</td>
    <td>
      <button onClick={removeTodo}>delete todo</button>
      <button onClick={changeStatus}>change status</button>
    </td>
  </tr>
}