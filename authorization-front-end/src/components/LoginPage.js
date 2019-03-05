import React from 'react';
import axios from 'axios';


class LoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: '',
            password: ''
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loginUser = e => {
        e.preventDefault()
        const user = {
            username: this.state.user,
            password: this.state.password
        }
        axios.post('http://localhost:4000/api/login', user)
            .then(res => {
                this.props.history.push('/users')
            })
            .catch(err => err)
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default LoginPage;