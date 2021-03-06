import React from 'react'
import {Button, Item, Grid, Header, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import * as ROUTES from '../../constants/routes'


const Account = ({authUser}) => (
    <div>
        {authUser ? <AccountInfo authUser = {authUser}/> : <NoAuth /> }
    </div>
)

const AccountInfo = ({authUser}) => (

    <Grid centered columns={3} padded celled='internally' style={{ height: '100vh'}}>

        <Grid.Row>

            <Grid.Column>
                <Grid.Row>
                    <Header as='h2' textAlign='center' style={{ marginBottom: '1em' }}>
                        Account
                    </Header>
                </Grid.Row>

                <Grid.Row>
                    <Item.Group>
                        <Item>
                        <Image src={authUser.imageURL} wrapped ui={false} />
                            <Item.Content>
                                <Item.Header>Username: {authUser.username}</Item.Header>
                                <Item.Description>
                                    Email: {authUser.email}<br/>
                                </Item.Description>
                                <Item.Extra>
                                    <Button><Link to={`${ROUTES.EDIT_USER}/${authUser.uid}`}>Edit User Info</Link></Button>
                                    <Button><Link to={`${ROUTES.UPDATE_PW}/${authUser.uid}`}>Update PW</Link></Button>
                                </Item.Extra>       
                            </Item.Content>
                        </Item>   
                    </Item.Group>                         
                </Grid.Row>
                
            </Grid.Column>

        </Grid.Row>

</Grid>

)

const NoAuth = () => (
    <div>Please Log In</div>
)

  
  export default Account