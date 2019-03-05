import React from 'react';
import axios from 'axios';
import User from './User';

class UsersPage extends React.Component {
    constructor() {
        super()

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/users')
            .then(res => {
                console.log(res.data)
                this.setState({
                    users: res.data
                })
            })
            .catch(err => err)
    }

    render() {
        return (
            <div>
                {/* {this.state.users.map((user, index) => {
                    return <User user={user} key={index} />
                })} */}
            </div>
        )
    }
}

export default UsersPage;