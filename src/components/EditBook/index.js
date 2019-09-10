import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';




const EditBook = (props)=> {
    return (
        <div>
            <EditBookForm setUserId={props.setUserId} authUser={props.authUser} />
        </div>
    )
}

class EditBookFormBase extends Component {
    state={
        error: null
    }

    componentDidMount() {
        this.readTextFile(this.props.match.params.id)
    }

    readTextFile = id => {
        console.log(id)
        this.props.firebase.db.collection("books").doc(id)
            .get()
            .then( doc => {
                console.log(doc.data(),"<doc")
                this.setState({
                    author:doc.data().author,
                    title: doc.data().title,
                    textfile: doc.data().textFile,
                    description: doc.data().description,
                    rater: doc.data().rater,
                    viewCount: doc.data().viewCount,
                    currentRating: doc.data().rating,
                    genre: doc.data().genre,
                    mounted:true
                })
            })
        console.log(this.state)
	};


    onSubmit = event => {
        const { title, description, genre  }= this.state
        const { authUser } = this.props

        event.preventDefault()

        this.props.firebase.db.collection('books').doc(this.props.match.params.id).update({
                    title,
                    description,
                    genre
                  })

            .then(()=>{
                this.props.history.push(`${ROUTES.BOOK_SHELF}/${authUser.uid}`)
            })
        .catch(error => {
            this.setState({error})
        })
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    onGenreChange = (e,data)=> {
        this.setState({
            [data.name]: data.value
        })
    }
    render () {
        const {
            title,
            description,
            genre
          } = this.state
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

    return (
        <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' textAlign='center'>
            Edit Book Info
          </Header>
          <Form onSubmit={this.onSubmit}>
              <Segment stacked>
                Change Title:
                    <Form.Input placeholder='Title' value={title} type='text' name='title' onChange={this.onChange}/>
                Change Description:
                  <Form.Input  type="text" placeholder='Description' name='description'  value={description} onChange={this.onChange}/>
                Change Genre: <br/>
                    <Form.Select type="select" placeholder="Genre" name="genre" value={genre} onChange={(e, data) => this.onGenreChange(e, data)} options={genreOptions} value={this.state.genre}/><br/>

                <Button fluid size='large' type='sumbit'>Edit</Button>
            </Segment>
          </Form>
        </Grid.Column> 
      </Grid>
    )

}
}



const EditBookForm = withRouter(withFirebase(EditBookFormBase))



export default EditBook