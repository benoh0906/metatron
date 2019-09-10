import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';


const UpdatePw = (props)=>{
    return(
        <div><UpdatePwForm updateUser={props.updateUser} setUserId={props.setUserId} authUser={props.authUser}/></div>
    )
}

class UpdatePwFormBase extends Component {
    state={
        error:null,
        passwordOne:'',
        passwordTwo:''
    }
    componentDidMount() {
        this.props.firebase.user(this.props.match.params.id)
            .get()
            .then(snapShot => this.setState({...Object.assign(snapShot.data(), {imageURL: null})}))
    }
    onSubmit= event =>{
        const { passwordOne  }= this.state

        event.preventDefault()

        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(this.props.history.push(ROUTES.ACCOUNT))
        
            .catch(error => {
                this.setState({error})
                

            })
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state,'<state')
    }
    render(){
        console.log(this.state)
        const { username, email, passwordOne, passwordTwo, error}= this.state

        const isInvalid = 
            passwordOne !== passwordTwo ||
            passwordOne === ''

        return(
            <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' textAlign='center'>
                        Update Password
                    </Header>
                    <Form onSubmit={this.onSubmit}>
                        <Segment stacked>

                            New Password:
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password'  type='password' name='passwordOne' onChange={this.onChange}/>
                            Confirm Password:
                                <Form.Input fluid icon='lock' iconPosition='left' type='password'  placeholder='Password' name='passwordTwo' onChange={this.onChange}/>
                            <Button fluid size='large' type='sumbit' disabled={isInvalid}>Update</Button>
                            
                        </Segment>
                    </Form>
                </Grid.Column> 
            </Grid>            
        )
    }
}


const UpdatePwForm = withRouter(withFirebase(UpdatePwFormBase))



export default UpdatePw
