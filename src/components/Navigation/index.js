import React from 'react'
import { NavLink, Link } from 'react-router-dom'


import * as ROUTES from '../../constants/routes'
import SignOutButton from '../SignOut'
import "./index.css"
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
  } from 'semantic-ui-react'
import logo from './logo2.png'


const Navigation = ({authUser})=>
    (
    <div>
        {authUser ? <NavigationAuth authUser = {authUser}/> : <NavigationNonAuth /> }
    </div>
    )


const NavigationAuth = ({authUser})=> (
    <Menu fixed='top' id="navOn">
        <Menu.Item header>
            <Link to={ROUTES.HOME}><Image size='small' src={logo} style={{ marginRight: '1.5em' }} /></Link>
        </Menu.Item>
        <Menu.Item >
            <Link to={`${ROUTES.ACCOUNT}/${authUser.uid}`}>Account</Link>
        </Menu.Item>
        <Menu.Item >
            <Link to={`${ROUTES.BOOK_SHELF}/${authUser.uid}`}>Book Shelf</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to={ROUTES.CREATE_BOOK}>Make Book</Link>
        </Menu.Item>
        <Menu.Item >
            <SignOutButton />
        </Menu.Item>
    </Menu>
)

const NavigationNonAuth = () => (
       <Menu fixed='top' id="navOff" >
            <Menu.Item header>
                <Link to={ROUTES.HOME}><Image size='small' src={logo} style={{ marginRight: '1.5em' }} /></Link>
            </Menu.Item>
            <Menu.Item position='right' size='small'>
                <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
            </Menu.Item>
            <Menu.Item >
                <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
            </Menu.Item>
        </Menu>
        )
    
       

export default Navigation