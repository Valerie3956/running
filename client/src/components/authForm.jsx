import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'

export default function AuthForm(props){

    const {
        handleChange, 
        handleSubmit, 
        btnText, 
        errMsg,
        inputs: {
          username, 
          password
        } 
      } = props

      const [showPassword, setShowPassword] = useState(false)

    return(
        <form onSubmit={handleSubmit} className = "form">
        <input 
          type="text" 
          value={username} 
          name="username (This will be visible by all users of the app!)" 
          onChange={handleChange} 
          placeholder="Username"/>
        <input 
          type={showPassword? "text" : "password"}
          value={password} 
          name="password" 
          onChange={handleChange} 
          placeholder="Password"
          />
          {showPassword?
            <FontAwesomeIcon icon={faEye} onClick = {() => setShowPassword(prevShowPassword => !prevShowPassword)}/> 
            : 
            <FontAwesomeIcon icon={faEyeSlash} onClick = {() => setShowPassword(prevShowPassword => !prevShowPassword)}/>
          }
        <button className = "button">{ btnText }</button>
        <p>{errMsg}</p>
      </form>
    )
}