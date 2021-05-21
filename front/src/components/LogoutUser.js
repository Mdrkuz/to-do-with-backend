import {useCallback, useState} from "react";
import requester from "../utils/requester";
import Pathes from "../pathes";

export const LogoutUser = ({onLogout, token}) => {
  const logoutUser = async () => {
    await requester.post(Pathes.logout(), {} , token)
    onLogout && onLogout()
  }

  return (
    <div>
      <button onClick={logoutUser}>logout</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
}) 

export default connect (
  null, 
  mapDispatchToProps
) (LogoutUser)

export default LogoutUser;