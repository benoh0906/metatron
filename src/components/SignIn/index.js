import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignIn = () => (
    <div>
      <SignInForm />
    </div>
  )

class SignInFormBase extends Component {
    state = {
        email: '',
        password: '',
        error: ''
    }

    onSubmit = event => {
        const { email, password } = this.state
        event.preventDefault()
        this.props.firebase
          .doSignInWithEmailAndPassword(email, password)
          .then(() => 

            this.props.history.push(ROUTES.HOME)
          )
          .catch(error => {
            this.setState({error: error.message})
          })
          
      }

    onChange = event => 
        this.setState({ [event.target.name] : event.target.value})



    render() {
        const {email, password, error}=this.state
            return (
            <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' textAlign='center'>
                        Login
                    </Header>
                    {this.state.error ?
                    <Message negative>
                        {this.state.error}
                    </Message>
                    :
                    <span></span>
                    }
                    <Form onSubmit={this.onSubmit}>
                        <Segment stacked>
                        Email:
                        <Form.Input fluid icon='mail' iconPosition='left' placeholder='email' type='text' name='email' value={email} onChange={this.onChange}/>
                        password:
                        <Form.Input fluid icon='lock' iconPosition='left' type='password' name='password' value={password} onChange={this.onChange}/>
                        <Button fluid size='large' type='submit'>Login</Button>
                        <Message>
                            Not a member? <NavLink exact to={ROUTES.SIGN_UP}>Sign Up</NavLink>
                        </Message>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}


const SignInForm = withRouter(withFirebase(SignInFormBase))


  



export default SignIn