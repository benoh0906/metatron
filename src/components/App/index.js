import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import * as ROUTES from '../../constants/routes'
import {withFirebase} from '../Firebase'

import HomePage from '../Home'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import Navigation from '../Navigation'
import Account from '../Account'
import EditUser from '../EditUser'
import UpdatePw from '../UpdatePw'
import BookShelf from '../BookShelf'
import CreateBook from '../CreateBook'
import ShowBook from '../ShowBook'
import EditBook from '../EditBook'
import ShowBookOut from '../ShowBookOut'

class App extends Component {
    state = {
        authUser: {}
    }

    updateUser = uid =>
        this.props.firebase.user(uid)
            .get()
            .then(snapShot => this.setState({authUser: Object.assign(snapShot.data(), {uid})}))


    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(authUser => {
          authUser
          ? this.props.firebase.user(authUser.uid).get()
              .then(snapShot => this.setState({authUser: Object.assign(snapShot.data(), { uid: authUser.uid } )}))
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
                        <Route exact path={`${ROUTES.ACCOUNT}/:id`} render={() => <Account authUser={this.state.authUser}/>} />
                        <Route exact path={`${ROUTES.EDIT_USER}/:id`} render={() => <EditUser updateUser={this.updateUser} authUser={this.state.authUser}/>} />
                        <Route exact path={`${ROUTES.UPDATE_PW}/:id`} render={() => <UpdatePw updateUser={this.updateUser} authUser={this.state.authUser}/>} />
                        <Route exact path={`${ROUTES.BOOK_SHELF}/:id`} render={() => <BookShelf updateUser={this.updateUser} authUser={this.state.authUser}/>} />
                        <Route exact path={`${ROUTES.CREATE_BOOK}`} render={() => <CreateBook updateUser={this.updateUser} authUser={this.state.authUser}/>} />
                        <Route exact path={`${ROUTES.SHOW_BOOK}/:id`} render={() => <ShowBook updateUser={this.updateUser} authUser={this.state.authUser}/>} />
                        <Route exact path={`${ROUTES.EDIT_BOOK}/:id`} render={() => <EditBook updateUser={this.updateUser} authUser={this.state.authUser}/>} />
                        <Route exact path={`${ROUTES.SHOW_BOOK_OUT}/:id`} render={() => <ShowBookOut updateUser={this.updateUser} authUser={this.state.authUser}/>} />

                    </Switch>
                </Container>
            </div>
        )
    }
}

export default withFirebase(App)