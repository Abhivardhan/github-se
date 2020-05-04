import React from 'react'


export default function RepoCard({ repo }) {
    return(
        <div className="card" style={{margin: "50px 100px"}}>
            <div className="card-body">
                <a href={repo.html_url} target="_blank">
                    <h3>{repo.full_name}</h3>
                </a>
                <p><strong>Description: </strong>{repo.description}</p>
            </div>
        </div>
    );
}