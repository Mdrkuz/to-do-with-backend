import {useCallback, useState} from "react";
import requester from "../utils/requester";
import Pathes from "../pathes";
import { connect } from 'react-redux';
import { createUser } from "../utils/action";


const CreateUser = (props) => {
  const [nameValue, setNameValue] = useState()
  const [passwordValue, setPasswordValue] = useState()
  const addNewUser = async () => {
    await requester.put(Pathes.signUp(), {
      name: nameValue,
      password: passwordValue
    })
    setNameValue('')
    setPasswordValue('')
    onSignUp && onSignUp()
  }
  return (
  <div>
    signup
    <input type="text" value={nameValue} onChange={e => setNameValue(e.target.value)}/>name
    <input type="text" value={passwordValue} onChange={e => setPasswordValue(e.target.value)}/>password
    <button onClick={props.create(nameValue, passwordValue)}>signup</button>
  </div>
  )
}

const mapDispatchToProps = dispatch => ({
  create: (name, password) => dispatch(createUser(name, password  ))
})

export default connect(
  null, 
  mapDispatchToProps
) (CreateUser);