import {useState} from "react";
import { connect } from 'react-redux';
import requester from "../utils/requester";
import Pathes from "../pathes";
import { createTodo } from "../utils/action";


function CreateTodo(props) {
  const [inputValue, setInputValue] = useState('')
  const addNewTodo = async () => {
    await requester.put(Pathes.todo(), {
      title: inputValue
    }, token)
    setInputValue('')
    onAdd && onAdd()
  }
  return <>
    <input
      type="text"
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
    />
    <button onClick={props.create(inputValue)}>add</button>
  </>
}


const mapDispatchToProps = dispatch => ({
  create: title => dispatch(createTodo(title))
})


export default connect(
  null,
  mapDispatchToProps
)(CreateTodo); 
