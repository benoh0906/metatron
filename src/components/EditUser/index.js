import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';




const EditUser = (props)=> {
    return (
        <div>
            <EditUserForm updateUser={props.updateUser} setUserId={props.setUserId} authUser={props.authUser} />
        </div>
    )
}

class EditUserFormBase extends Component {
    state={
        error: null
    }

    componentDidMount() {
        this.props.firebase.user(this.props.match.params.id)
            .get()
            .then(snapShot => this.setState({...Object.assign(snapShot.data(), {imageURL: null})}))
    }

    onSubmit = event => {
        const { username, email, imageURL, image  }= this.state
        const { authUser } = this.props

        event.preventDefault()

        // this.props.firebase
            // .doUpdateProfile(email,username,imageURL)
            // .then(authUser => {
                image
                ? this.props.firebase.doStoreFile(this.state.image)
                    .then(file => file.ref.getDownloadURL())
                    .then(url => this.props.firebase.db.collection('users').doc(authUser.uid).update({
                            username,
                            imageURL: url
                        })
                        .then(() => {
                            this.props.updateUser(authUser.uid)
                            this.props.history.push(ROUTES.ACCOUNT)
                        })
                    )
                : this.props.firebase.db.collection('users').doc(authUser.uid).update({
                    username
                  })
            // })
            .then(()=>{
                this.props.updateUser(authUser.uid)
                this.props.history.push(ROUTES.ACCOUNT)
            })
        .catch(error => {
            this.setState({error})
        })
    }

    onChange = e => {
        console.log(e.target.files)
        if(e.target.name !== 'image'){
            this.setState({[e.target.name]: e.target.value})
        } else {
            this.setState({image : e.target.files[0]})
        }

    }
    render () {
        const {
            username,
            email,
            error,
            imageURL
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
                <Form.Input fluid icon='user' iconPosition='left' placeholder='username' value={this.state.username} type='text' name='username' onChange={this.onChange}/>
                New Profile Image:
                  <Form.Input fluid icon='image' iconPosition='left' type="file" name='image' onChange={this.onChange}/>

                <Button fluid size='large' type='sumbit'>Edit</Button>
                <Message>
                    <Link to='/pw'>Edit Password</Link>
                </Message>
            </Segment>
          </Form>
        </Grid.Column> 
      </Grid>
    )

}
}



const EditUserForm = withRouter(withFirebase(EditUserFormBase))



export default EditUser