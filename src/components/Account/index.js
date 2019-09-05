import React from 'react'
import {Container, Button, Item, Form, Grid, Header, Image, Message, Card, Icon} from 'semantic-ui-react';
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
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                            <Item.Content>
                                <Item.Header>Username: {authUser.username}</Item.Header>
                                <Item.Description>
                                    Email: {authUser.email}<br/>
                                </Item.Description>
                                <Item.Extra>
                                    <Button><Link to={ROUTES.EDIT_USER}>Edit User Info</Link></Button>
                                    <Button><Link to={ROUTES.UPDATE_PW}>Update PW</Link></Button>
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