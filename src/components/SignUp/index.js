import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {withFirebase} from  '../Firebase'
import * as ROUTES from '../../constants/routes'

import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const SignUp = (props => {
    return (
        <div>
            <SignUpForm setUserId={props.setUserId}/>
        </div>
    )
})

class SignUpFormBase extends Component {
    state ={
        username:'',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        image: null,
        error: null
    }
    onSubmit = event => {
        const { username, email, passwordOne, image }= this.state
        event.preventDefault()

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email,passwordOne)
            .then(authUser => {
                image
                ? this.props.firebase.doStoreFile(this.state.image)
                    .then(file => file.ref.getDownloadURL())
                    .then(url => {
                        this.props.firebase.db.collection('users').doc(authUser.user.uid).set({
                            username,
                            email,
                            imageURL: url
                        })
                    })
                : this.props.firebase.db.collection('users').doc(authUser.user.uid).set({
                    username,
                    email,
                    imageURL:'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                  })
            })
            .then(()=>{
                this.props.history.push(ROUTES.HOME)
            })
        .catch(error => {
            this.setState({error: error.message})
        })
    }
    onChange = e => {
        if(e.target.name !== 'image'){
            this.setState({[e.target.name]: e.target.value})
        } else {
            this.setState({image : e.target.files[0]})
        }

    }
    render(){
        const { username, email, passwordOne, passwordTwo, image, error}= this.state

        const isInvalid = 
            passwordOne !== passwordTwo ||
            passwordOne === ''||
            email===''||
            username===''
        
        return (
            <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
            <Grid.Column style={{maxWidth: 450}}>
              <Header as='h2' textAlign='center'>
                Sign Up
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
                  Username:
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='username' type='text' name='username' value={username} onChange={this.onChange}/>
                  Email:
                  <Form.Input fluid icon='mail' iconPosition='left' placeholder='email' type='text' name='email' value={email} onChange={this.onChange}/>
                  Password:
                  <Form.Input fluid icon='lock' iconPosition='left' type='password' name='passwordOne' value={passwordOne} onChange={this.onChange}/>
                  Confirm Password:
                  <Form.Input fluid icon='lock' iconPosition='left' type='password' name='passwordTwo' value={passwordTwo} onChange={this.onChange}/>
                  Profile Image (.jpg, .jpeg, .png):
                  <Form.Input fluid icon='image' iconPosition='left' type="file" name='image' accept = ".jpeg, .jpg, .png" onChange={this.onChange}/>

                  <Button fluid size='large' type='sumbit' disabled={isInvalid}>Sign Up</Button>
                  {error && error.message}
                  <Message>
                    Already a member? <Link to='/signin'>Login</Link>
                  </Message>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        )
    }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase))


export default SignUp