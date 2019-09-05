import React from 'react'

import { withFirebase } from '../Firebase'
import {Button} from 'semantic-ui-react'
const SignOut = ({ firebase }) => (
  <Button type='button' onClick={firebase.doSignOut}>
    Sign Out
  </Button>
)


export default withFirebase(SignOut)