import React from 'react'
import { withRouter } from 'react-router-dom'

import { withFirebase } from '../Firebase'
import {Button} from 'semantic-ui-react'

const SignOut = ({ firebase, history }) => {
  const signOut = () => {
    firebase.doSignOut()
    history.push('/home')
  }
  return (
    <Button type='button' onClick={signOut}>
      Sign Out
    </Button>
  )
}


export default withRouter(withFirebase(SignOut))