import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import * as ROUTES from '../../constants/routes'
import {withFireBase, withFirebase} from '../Firebase'

import HomePage from '../Home'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import Navigation from '../Navigation'
import Account from '../Account'
import EditUser from '../EditUser'

class App extends Component {
    state = {
        authUser: null
    }


    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(authUser => {
          authUser.uid
          ? this.props.firebase.user(authUser.uid).get()
              .then(snapShot => this.setState({authUser: snapShot.data()}))
            // ? this.props.firebase.collection('users').doc(authUser.uid).get()
            //     .then(snapShot => this.setState({ authUser: snapShot.data() }))
            : this.setState({ authUser: null })
        })
      }
    render(){
        return (

            <div>
                <Navigation authUser={this.state.authUser}/>
                <hr />
                <Container style={{ marginTop: '10em' }}>
                    <Switch>
                        <Route exact path ={ROUTES.SIGN_UP} render={() =><SignUpPage/>}/>
                        <Route exact path={ROUTES.SIGN_IN} render ={() => <SignInPage authUser={this.state.authUser}/>}/>
                        <Route exact path={ROUTES.HOME} render={() => <HomePage authUser={this.state.authUser}/>} />
                        <Route exact path={ROUTES.ACCOUNT} render={() => <Account authUser={this.state.authUser}/>} />
                        <Route exact path={ROUTES.EDIT_USER} render={() => <EditUser authUser={this.state.authUser}/>} />

                    </Switch>
                </Container>
            </div>
        )
    }
}

export default withFirebase(App)