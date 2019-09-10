import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { Icon,Label, Rating, Button, Dimmer, Loader, Header, Segment} from 'semantic-ui-react';

import './index.css';



const ShowBook = (props)=> {
    return (
        <div>
            <ShowBookForm updateUser={props.updateUser} setUserId={props.setUserId} authUser={props.authUser} />
        </div>
    )
}


class ShowBookFormBase extends Component {
    state={
        author:'',
        description:'',
        textfile: '',
        title:'',
        rating:0,
        rater: [],
        liker:[],
        mounted:null,
        viewCount:0,
        rated:false,
        likeCount:0,
        liked:null
    }

    componentDidMount() {
        // this.setState({bookId:this.props.match.params.id})
        // const textfile = fetch('https://firebasestorage.googleapis.com/v0/b/metatron-c9885.appspot.com/o/testtext.txt?alt=media&token=b4484bc4-9891-442b-a0d3-822a5367c2bd')
        // var storage = this.props.firebase.storage();
        // var httpsReference = this.props.firebase.storage().refFromURL('https://firebasestorage.googleapis.com/v0/b/metatron-c9885.appspot.com/o/testtext.txt?alt=media&token=b4484bc4-9891-442b-a0d3-822a5367c2bd')
        this.readTextFile(this.props.match.params.id)

        this.viewCount()

    }
    
    submitRating = () => {
        this.state.rater.find( e => {return e==this.props.authUser.uid})
        ? 
            this.setState({rated:true})
        :
        this.props.firebase.db.collection('books').doc(this.props.match.params.id).update({
            rating: this.props.firebase.firestore.FieldValue.arrayUnion(parseInt(this.state.rating)),
            rater: this.props.firebase.firestore.FieldValue.arrayUnion(this.props.authUser.uid)
        })
        this.setState({rated:true})
    }
    likeCount=() => {
        this.state.liker.find(e => {return e==this.props.authUser.uid })
        ?
            this.setState({liked:true})
        :
        this.props.firebase.db.collection('books').doc(this.props.match.params.id).update({
            likeCount: this.props.firebase.firestore.FieldValue.increment(1),
            liker: this.props.firebase.firestore.FieldValue.arrayUnion(this.props.authUser.uid)
        })
        this.props.firebase.db.collection('users').doc(this.props.authUser.uid).update({
            likedBook: this.props.firebase.firestore.FieldValue.arrayUnion(this.props.match.params.id)
        })
    }

    viewCount = () => {
        this.props.firebase.db.collection('books').doc(this.props.match.params.id).update({
            viewCount: this.props.firebase.firestore.FieldValue.increment(1)
        })
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
                    likeCount:doc.data().likeCount,
                    liker:doc.data().liker,
                    rating:doc.data().rating,
                    mounted:true
                })
            })
    };
    likeCheck = () => {
                
        if(this.state.liker.find(e => {return e === this.props.authUser.uid })){
            return true
        }
    }

    rateCheck = () => {
        if(this.state.rater.find(e => {return e === this.props.authUser.uid })){
            return true
        }
    }

    handleChange = (e) => this.setState({ rating: e.target.value })
    
    
    deleteBook = () => {
        this.props.firebase.db.collection("books").doc(this.props.match.params.id).delete()
            .then(() => {
                this.props.history.push(`${ROUTES.BOOK_SHELF}/${this.props.authUser.uid}`)
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        
    }

    avgRating = () => {
        let values = this.state.rating
        console.log(values,'values')
        let sum = values.reduce((previous, current) => current += previous)
        let avg = sum / values.length    
        return avg
    }

    render(){
        const { rating } = this.state

        return(
            <div id="mainDiv">
                {this.state.mounted ? 
                <div>
                    <Segment textAlign='center' >
                        <Header dividing as='h1'>
                            Title: {this.state.title}

                        </Header>
                        <Header  as='h3' dividing>Author: {this.state.author}</Header>
                        <Header  as='h5' dividing> 
                        {this.likeCheck() ?
                            <Button 
                            color='red'
                            content='Liked'
                            icon='heart'
                            label={{ as: 'a', basic: true, content: this.state.likeCount }}
                            labelPosition='right'
                            />
                        :
                        
                        <Button
                            inverted color='red'
                            content='Like'
                            icon='heart'
                            label={{ as: 'a', basic: true, content: this.state.likeCount }}
                            labelPosition='right'
                            onClick={this.likeCount}
                        />
                        }

                        <Button
                            content='View'
                            icon='eye'
                            label={{ as: 'a', basic: true, content: this.state.viewCount }}
                            labelPosition='right'
                        />
                        
                        
                        </Header>
                        <iframe id="frame" width="800" height="400" src={this.state.textfile} ></iframe>
                    </Segment>                    
                        
                    <Segment textAlign="center" >
                        {this.rateCheck() ?
                        <div>
                            <Rating defaultRating={this.avgRating()} maxRating={5} disabled /><p>{this.avgRating()}</p>
                            <Button color='orange' >Rating Complete</Button>

                        </div>
                        :
                        <div>
                            <div>Rating: {rating}</div>
                            <input
                                type='range'
                                min={0}
                                max={5}
                                value={rating}
                                onChange={this.handleChange}
                            />
                            <br />
                            <Rating rating={this.state.rating} maxRating={5} /><br/>
                            <Button inverted color='orange' onClick={ this.submitRating}>Submit Rating</Button>
                        </div>

                        }

                    </Segment>
                    <Segment textAlign="center">
                        <Button onClick={this.deleteBook}>Delete Book</Button>
                        <Button><Link to ={`${ROUTES.EDIT_BOOK}/${this.props.match.params.id}`}>Edit Book</Link></Button>
                    </Segment>
                    

                </div>
                     
                    : 
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
                }

            </div>
        )
    }

}




const ShowBookForm = withRouter(withFirebase(ShowBookFormBase))



export default ShowBook