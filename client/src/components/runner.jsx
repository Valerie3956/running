import React from "react";


export default function Runner(props){

    const {username, totalMiles} = props

    return(
        <div className = "runner">
        <h1>{username}</h1>
        <h2>{totalMiles} miles</h2>
        </div>
    )
}