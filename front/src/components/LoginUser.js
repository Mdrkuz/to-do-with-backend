import {useCallback, useState} from "react";
import requester from "../utils/requester";
import Pathes from "../pathes";
import { connect } from 'react-redux';


const LoginUser = ({onLogin}) => {
  const [nameValue, setNameValue] = useState()
  const [passwordValue, setPasswordValue] = useState()
  const loginUser = async () => {
    const {token} = await requester.put(Pathes.login(), {
      name: nameValue,
      password: passwordValue
    })
    setNameValue('')
    setPasswordValue('')
    onLogin && onLogin(token)
  }
  return (
    <div>
      login
      <input type="text" value={nameValue} onChange={e => setNameValue(e.target.value)}/>name
      <input type="text" value={passwordValue} onChange={e => setPasswordValue(e.target.value)}/>password
      <button onClick={props.login(nameValue, passwordValue)}>signup</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  login: (name, password) => dispatch(loginUser(name, password))
}) 

export default connect (
  null, 
  mapDispatchToProps
) (LoginUser)