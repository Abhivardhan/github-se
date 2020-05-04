import React from 'react'


export default function RepoCard({ repo }) {
    return(
        <div className="card">
            <div className="card-body">
                <a href={repo.html_url} target="_blank">
                    <h3>{repo.full_name}</h3>
                </a>
                <p><strong>Stars: </strong>{repo.stargazers_count}</p>
                <p><strong>Watchers: </strong>{repo.watchers_count}</p>
            </div>
        </div>
    );
}