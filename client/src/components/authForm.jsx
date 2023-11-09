import React from 'react'

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

    return(
        <form onSubmit={handleSubmit} className = "form">
        <input 
          type="text" 
          value={username} 
          name="username" 
          onChange={handleChange} 
          placeholder="Username"/>
        <input 
          type="text" 
          value={password} 
          name="password" 
          onChange={handleChange} 
          placeholder="Password"/>
        <button className = "button">{ btnText }</button>
        <p>{errMsg}</p>
      </form>
    )
}