import React from 'react'

export default function UserCard({user}) {

    return (
        <div className="card">
            <div className="card-body">
                <img src={user.avatar_url} />
                <h1>{user.name}</h1>
                <p>{user.company}</p>
                <p>{user.bio}</p>
            </div>
        </div>
    )
}