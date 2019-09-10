import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {Form, Grid, Header,Input, Button, Container, Select} from 'semantic-ui-react'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';

const CreateBook = (props) => {
    return (
        <div>
            <CreateBookForm setUserId={props.setUserId} authUser={props.authUser} />
        </div>
    )
}

class CreateBookFormBase extends Component {
    state={
        title:'',
        description:'',
        genre:"",
        textFile:null,
        error: null
    }


    onSubmit = e => {
        const { title,description, textFile, genre }= this.state
        const { authUser } = this.props
        console.log(authUser)

        e.preventDefault()

        
        this.props.firebase.doStoreFile(textFile)
            .then(file => file.ref.getDownloadURL())
            .then(url => {
                this.props.firebase.db.collection('books').doc().set({
                    title,
                    description,
                    author: authUser.username,
                    authorId: authUser.uid,
                    textFile: url,
                    rating:[3],
                    rater:[],
                    viewCount:0,
                    likeCount:0,
                    liker:[],
                    genre
                })
            })
            .then(()=>{
                this.props.history.push(`${ROUTES.BOOK_SHELF}/${authUser.uid}`)

            })
        .catch(error => {
            this.setState({error})
        })
    
}

    onChange = (e) => {
        if(e.target.name !== 'textFile'){
            this.setState({[e.target.name]: e.target.value})
            console.log(e.target.name,'<e target name')
        
        } else {
            this.setState({textFile : e.target.files[0]})
            console.log(e.target.files[0],"<e target")
        }
        console.log(this.state)

    }

    onGenreChange = (e,data)=> {
        this.setState({
            [data.name]: data.value
        })
    }

    render (){
        const {textFile, title, description}= this.state
        const isInvalid = textFile ===null ||
            title === '' ||
            description === ''
        
        const genreOptions = [
            { key: 'fantasy', value: 'fantasy', text: 'fantasy' },
            { key: 'sci-fi', value: 'sci-fi', text: 'sci-fi' },
            { key: 'romance', value: 'romance', text: 'romance' },
            { key: 'thriller', value: 'thriller', text: 'thriller' },
            { key: 'mystery', value: 'mystery', text: 'mystery' },
            { key: 'horror', value: 'horror', text: 'horror' },
            { key: 'historical', value: 'historical', text: 'historical' },
            { key: 'non-fiction', value: 'non-fiction', text: 'non-fiction' },
            { key: 'others', value: 'others', text: 'others' }


        ]


        return(
            <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' textAlign='center'>
                        New Book
                    </Header>
                    <Container>
                        Must complete all sections
                    </Container>
                    <Form onSubmit={this.onSubmit}>  
                        Title:
                        <Form.Input type="text" onChange={this.onChange} placeholder="title" name="title" value={this.state.title}/>
                        Description:
                        <Form.Input type="textarea" onChange={this.onChange} placeholder="description" name="description" value={this.state.description}/>
                        Genre: <br/>
                        <Form.Select type="select" placeholder="Genre" name="genre" onChange={(e, data) => this.onGenreChange(e, data)} options={genreOptions} value={this.state.genre}/><br/>
                        Upload Text File (.txt):
                        <Form.Input fluid icon='file' iconPosition='left' type="file" name='textFile' accept = ".txt" onChange={this.onChange}/>
                        

                        <Button type="submit" disabled={isInvalid} >Submit</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}





const CreateBookForm = withRouter(withFirebase(CreateBookFormBase))



export default CreateBook
