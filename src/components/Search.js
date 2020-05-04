import React from 'react';
import './css/Search.css';

export default class Search extends React.Component {

    state = {
        username: ""
    }

    handleInput = event => {
        this.setState({
            username: event.target.value
        })
    }


    render() {

        const { fetchData } = this.props; 
        const { username } = this.state; 

        return (
            <div className="jumbotron" style={{margin: "50px 100px"}}>
                <h1 style={{textAlign: "center"}}> Search for User Repos in github</h1>
                <input value={this.state.username} type="text" name="username" className="form-control search-input" placeholder="Search Username" onChange={this.handleInput}/>
                <div>
                    <button onClick = {() => fetchData(username)} className="btn btn-large btn-success search-btn">Search</button>
                </div>
            </div>
        )
    }
}