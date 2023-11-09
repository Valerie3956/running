import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'


export default function Menu() {

    const { logout, user: { username, totalMiles } } = useContext(UserContext)
    const [toggle, setToggle] = useState(false)


    return (
        <>
            <div className="menu">
                <div className="name">
                    <h1>{username}</h1>
                    <h4>{totalMiles.toFixed(1)} miles ran to date</h4>
                </div>
                <h2 className="menuToggle" onClick={() => setToggle(prevToggle => !prevToggle)}>Menu</h2>
            </div>
            {toggle &&
                <div className="dropDown">

                    <Link to="runLog" className="link">
                        <h2 className="nav" onClick={() => setToggle(prevToggle => !prevToggle)}>Log run</h2>
                    </Link>

                    <Link to="myRuns" className="link">
                        <h2 className="nav" onClick={() => setToggle(prevToggle => !prevToggle)}>View My Runs</h2>
                    </Link>

                    <Link to="lastRuns" className="link">
                        <h2 className="nav" onClick={() => setToggle(prevToggle => !prevToggle)}>View Friends' Last Run</h2>
                    </Link>

                    <Link to="leaderboard" className="link">
                        <h2 className="nav" onClick={() => setToggle(prevToggle => !prevToggle)}>Leaderboard</h2>
                    </Link>
                    <h2 onClick={logout} className="nav">Log out</h2>
                </div>
            }
        </>
    )
}