import React from 'react'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import { withFirebase } from '../Firebase'
import {Button} from 'semantic-ui-react'

const SignOut = ({ firebase, history }) => {
  const signOut = () => {
    firebase.doSignOut()
    history.push(ROUTES.HOME)
  }
  return (
    <Button type='button' onClick={signOut}>
      Sign Out
    </Button>
  )
}


export default withRouter(withFirebase(SignOut))