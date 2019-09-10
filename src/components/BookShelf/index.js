import React, {Component} from 'react'
import {Header, Card} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import {withRouter} from 'react-router-dom'
import {withFirebase} from  '../Firebase'




const BookShelf = ({authUser}) => (
    <div>
        {authUser ? <BookShelfForm authUser = {authUser}/> : <NoAuth /> }
    </div>
)  

class BookShelfBase extends Component {
    state={
        textfiles:[],
        name:'name',
        likedBooks:[]
    }

    componentDidMount() {
        this.pullBooks()
        this.pullLikedBooks()
    }


    pullBooks = ()=>{
        const userId = this.props.match.params.id
        this.props.firebase.db.collection("books").where("authorId", "==", userId)
            .get()
            .then((querySnapshot) =>{
                this.setState({
                    textfiles: querySnapshot.docs.map(q => Object.assign(q.data(),{id: q.id}))
                })
            })
        .catch(error => {
            console.log(error)
        })

    }

    pullLikedBooks=()=>{
        const userId = this.props.match.params.id

        this.props.firebase.db.collection("books").where("liker", "array-contains", userId)
            .get()
            .then((querySnapshot) =>{
                this.setState({
                    likedBooks: querySnapshot.docs.map(q => Object.assign(q.data(),{id: q.id}))
                })
            })
        .catch(error => {
            console.log(error)
        })
    }

    sendShow(id){
        this.props.history.push(`${ROUTES.SHOW_BOOK}/${id}`)
    }

    render (){
        return(
            <main>

                <Header as="h2">My Bookshelf</Header>

                <Card.Group centered itemsPerRow={4}>
                    {this.state.textfiles.map((doc)=>{
                        let values = doc.rating
                        let sum = values.reduce((previous, current) => current += previous)
                        let avg = sum / values.length
                        return(
                            <div >

                            <Card raised key={doc.id}
                            header={doc.title}
                            description={doc.description}
                            meta={`Views: ${doc.viewCount} | Rating: ${avg} `}
                            style={{'marginLeft': '5vw', 'marginBottom': '5vw'}}
                            extra={<Link to={`${ROUTES.SHOW_BOOK}/${doc.id}`}>Show</Link>}
                            />
                            </div>
                            
                        )
                    })}
                </Card.Group>


                <Header as="h2">Liked Books</Header>

                    <Card.Group centered itemsPerRow={4}>
                        {this.state.likedBooks.map((doc)=>{
                            let values = doc.rating
                            let sum = values.reduce((previous, current) => current += previous)
                            let avg = sum / values.length
                            return(
                                <div >

                                <Card raised key={doc.id}
                                header={doc.title}
                                description={doc.description}
                                meta={`Views: ${doc.viewCount} | Rating: ${avg} `}
                                style={{'marginLeft': '5vw','marginBottom': '5vw'}}
                                extra={<Link to={`${ROUTES.SHOW_BOOK_OUT}/${doc.id}`}>Show</Link>}
                                />
                                </div>
                                
                            )
                        })}
                    </Card.Group>



            </main>
        )
    }
}

const NoAuth = () => (
    <div>Please Log In</div>
)


const BookShelfForm = withRouter(withFirebase(BookShelfBase))




export default BookShelf
