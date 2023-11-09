import React, { useState } from 'react'


export default function CommentForm(props){


const {
     btnText, toggle, submit, commentId, initContent } = props

const initInputs = {
     content: initContent || ""
  }

  const [inputs, setInputs] = useState(initInputs)

    //function for the comment form

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
          [name]: value
        }))
      }
    

      function handleSubmit(e){
        submit(inputs, commentId)
        setInputs({content : ""})
    
      }

  return (
    <div>

    <form className = "form" 
    onSubmit={(e) => {
      e.preventDefault()
      handleSubmit()
    }}
    >
      <input 
        type="text" 
        name="content" 
        value={inputs.content} 
        onChange={handleChange} 
        placeholder="comment"/>

      <button className = "smallButton">{btnText}</button>

    </form>
    <button className = "smallButton" onClick = {toggle}>Close</button>
        </div>
  )
}