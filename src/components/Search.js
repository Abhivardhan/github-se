import React from 'react';


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
            <div>
                <input value={this.state.username} type="text" name="username" placeholder="Search User" onChange={this.handleInput}/>
                <button onClick = {() => fetchData(username)} className="btn btn-large btn-success">Search</button>
            </div>
        )
    }
}