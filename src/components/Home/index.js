import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { withFirebase } from '../Firebase'



class Home extends Component {
    state = {
        user: {
          username: '',
          email: ''
        }
      }
    componentDidMount(){
        
    }
    render(){
        return (
            <div>
                {this.props.authUser
                ?
                <div>
                <h1>This is the username {this.props.authUser.username}</h1>
                <h2>This is the email {this.props.authUser.email}</h2>
                </div>
                : null
                }
            </div>
        )
    }

}


export default withFirebase(withRouter(Home))