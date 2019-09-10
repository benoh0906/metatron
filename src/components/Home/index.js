import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { withFirebase } from '../Firebase'

import{ Card, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import * as ROUTES from '../../constants/routes'



class Home extends Component {
    state = {

          topViews:[],
          topLikes:[]

      }
    componentDidMount(){
        this.pullBooksByViews()
        this.pullBooksByLikes()
    }
    pullBooksByViews = () => {
        this.props.firebase.db.collection("books")
        .orderBy('viewCount','desc').limit(5)
            .get()
            .then((querySnapshot) =>{
                this.setState({
                    topViews: querySnapshot.docs.map(q => Object.assign(q.data(),{id: q.id}))
                })
            })
        .catch(error => {
            console.log(error)
        })
    }
    pullBooksByLikes = () => {
        this.props.firebase.db.collection("books")
        .orderBy('likeCount','desc').limit(5)
            .get()
            .then((querySnapshot) =>{
                this.setState({
                    topLikes: querySnapshot.docs.map(q => Object.assign(q.data(),{id: q.id}))
                })
            })
        .catch(error => {
            console.log(error)
        })
    }
    
    render(){
        return (
            <div>
                <Header>Top 5 Views</Header>
                <Card.Group centered itemsPerRow={4}>

                    {this.state.topViews.map((doc)=>{
                        let values = doc.rating
                        let sum = values.reduce((previous, current) => current += previous)
                        let avg = sum / values.length
                        return(
                            <div >

                            <Card raised key={doc.id}
                            header={`Title: ${doc.title}`}
                            description={doc.description}
                            meta={`Views: ${doc.viewCount} | Likes: ${doc.likeCount} | Rating: ${avg} ` }
                            style={{'marginLeft': '5vw', 'marginBottom': '5vw'}}
                            extra={<Link to={`${ROUTES.SHOW_BOOK_OUT}/${doc.id}`}>Show</Link>}
                            />
                            </div>
                        )
                    })}
                </Card.Group>
                <Header>Top 5 Likes</Header>
                <Card.Group centered itemsPerRow={4}>

                    {this.state.topLikes.map((doc)=>{
                        let values = doc.rating
                        let sum = values.reduce((previous, current) => current += previous)
                        let avg = sum / values.length
                        return(
                            <div >

                            <Card raised key={doc.id}
                            header={`Title: ${doc.title}`}
                            description={doc.description}
                            meta={`Views: ${doc.viewCount} | Likes: ${doc.likeCount} | Rating: ${avg} `}
                            style={{'marginLeft': '5vw', 'marginBottom': '5vw'}}
                            extra={<Link to={`${ROUTES.SHOW_BOOK_OUT}/${doc.id}`}>Show</Link>}
                            />
                            </div>
                        )
                    })}
                </Card.Group>                
                
            </div>
        )
    }

}


export default withFirebase(withRouter(Home))