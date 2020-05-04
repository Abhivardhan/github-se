import React from 'react'
import './css/Card.css'

export default function UserCard({user}) {

    return (
        <div className="card" style={{margin: "50px 100px"}}>
            <div className="card-body">
                <img src={user.avatar_url} />
                <div style={{float: "left", margin: "0"}}>
                <h1>{user.name}</h1>
                <p>{user.company}</p>
                <p>{user.bio}</p>
                </div>
            </div>
        </div>
    )
}