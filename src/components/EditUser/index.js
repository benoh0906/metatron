import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';




const EditUser = (props)=> {
    return (
        <div>
            <EditUserForm setUserId={props.setUserId}/>
        </div>
    )
}

class EditUserFormBase extends Component {
    state={
        username: this.props.authUser.username,
        email: this.props.authUser.email,
        password: '',
        imageUrl:"",
        error: null
    }

    onChange = event => {
        this.setState({
          [event.target.name] : event.target.value 
        })
    }

    render () {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
          } = this.state
    

    return (
        <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' textAlign='center'>
            Edit
          </Header>
          <Form onSubmit={this.onSubmit}>
              <Segment stacked>
              New Username:
              <Form.Input fluid icon='user' iconPosition='left' placeholder='username' value={username} type='text' name='username' onChange={this.handleChange}/>
              Email:
              <Form.Input fluid icon='mail' iconPosition='left' placeholder='email' value={email} type='text' name='email' onChange={this.handleChange}/>
              Password:
              <Form.Input fluid icon='lock' iconPosition='left' type='password' name='password' onChange={this.handleChange}/>
              <Button fluid size='large' type='sumbit'>Edit</Button>
              <Message>
                Edit Password<Link to='/pw'>Edit Password</Link>
              </Message>
            </Segment>
          </Form>
        </Grid.Column> 
      </Grid>
    )

}
}



const EditUserForm = withRouter(withFirebase(EditUserForm))



export default EditUser