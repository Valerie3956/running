import React from "react";


export default function Runner(props){

    const {username, totalMiles} = props

    const displayName = username.split("@")[0]

    return(
        <div className = "runner">
        <h1>{displayName}</h1>
        <h2>{totalMiles} miles</h2>
        </div>
    )
}