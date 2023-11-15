import React, { useState} from 'react'

export default function RunForm(props){

    const initInputs = { 
        distance: props.initDistance || 0, 
        time: props.initTime || "", 
        pace: props.initPace || 0 ,
        date: props.initDate || ""
    }

    const [inputs, setInputs] = useState(initInputs)

    const {btnText, submit, runId} = props

//handle change

    function handleChange(e) {
        const { name, value } = e.target
        paceCalculator(inputs.distance, inputs.time)
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

//calculate pace

function paceCalculator(distance, time){
    const dist = distance
    const splitTime = time.split(":")

//for those long runs
    if(splitTime.length === 3){
        const hours = parseInt(splitTime[0])
        const minutes = parseInt(splitTime[1])
        const seconds = parseInt(splitTime[2])
        const timeInMinutes = hours * 60 + minutes + seconds / 60
        const pace = timeInMinutes / dist
        const paceMinutes = Math.floor(pace)
        const paceSeconds = String(Math.floor(pace - paceMinutes) * 60).padStart(2, '0')
        const formattedPace = `${paceMinutes}:${paceSeconds} minutes per mile`
    
        setInputs(prevInputs => ({
            ...prevInputs,
            pace: formattedPace}))

//for those shorter runs
    } else if (splitTime.length === 2){
        const minutes = parseInt(splitTime[0])
        const seconds = parseInt(splitTime[1])
        const timeInMinutes = minutes + seconds / 60
        const pace = timeInMinutes / dist
        const paceMinutes = Math.floor(pace)
        const paceSeconds = String(Math.floor(pace - paceMinutes) * 60).padStart(2, '0')
        const formattedPace = `${paceMinutes}:${paceSeconds} minutes per mile`
    
        setInputs(prevInputs => ({
            ...prevInputs,
            pace: formattedPace}))
        }
    }

//handle submit

function handleSubmit(e){
    e.preventDefault()
    submit(inputs, runId)
    setInputs(initInputs)
  }

    return(
        <div>
            <form className = "form" onSubmit = {handleSubmit}>
            <label htmlFor = "date" >Date</label>
                <input 
                type = "date"
                placeholder = "date"
                name = "date"
                onChange = {handleChange}
                value = {inputs.date}
                ></input>
                <label htmlFor = "distance" >Distance</label>
                <input 
                type = "number"
                placeholder = "Distance (in miles)"
                name = "distance"
                onChange = {handleChange}
                value = {inputs.distance}
                ></input>
                <label htmlFor = "time" >Time</label>
                <input 
                type = "text"
                placeholder = "HH:MM:SS"
                name = "time"
                pattern="[0-9]{1}:[0-9]{2}:[0-9]{2}|[0-9]{2}:[0-9]{2}|[0-9]{1}:[0-9]{2}"
                onChange = {handleChange}
                value = {inputs.time}
                ></input>
                <label htmlFor = "pace" >Pace</label>
                <input 
                type = "text"
                readOnly = "true"
                placeholder = "pace"
                name = "pace"
                onChange = {handleChange}
                value = {inputs.pace}
                ></input>
                <button className = "button">{btnText}</button>
            </form>
        </div>
    )
}