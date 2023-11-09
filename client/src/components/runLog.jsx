import React, { useContext } from 'react'
import RunForm from './runForm'
import { UserContext } from '../context/userContext'


export default function RunLog(){

const {addRun} = useContext(UserContext)


    return(
        <div className = "main">
        <RunForm btnText = "Log Run"
        submit = {addRun}
        />
        </div>
    )
}