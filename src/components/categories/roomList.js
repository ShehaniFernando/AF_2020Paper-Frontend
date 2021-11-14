//IMPORT REACT
import React, { Component } from 'react';

//IMPORT AXIOS
import axios from 'axios'

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pay: '',
            categoryId: '',
            rooms: []
        }
    }

    componentDidMount() {
        console.log('Category ID: ', this.props.match.params.id);
        axios.get(`http://localhost:9097/category/${this.props.match.params.id}`).then(response => {
            console.log('Rooms: ', response.data.data);
            this.setState({rooms: response.data.rooms});
            this.setState({pay: response.data.rooms.category, categoryId: this.props.match.params.id});
            console.log('Count:', this.state.rooms.length>0);
        })
    }


    navigateRoomPage(e, roomId){
        window.location = `/cost/${roomId}/${this.state.categoryId}`
    }

    render() {
        return (
            <div className="container">
                <h1>Room List - {this.state.pay}</h1>
                {this.state.rooms.length > 0 && this.state.rooms.map((item, index)=>
                    <div key={index} className="card mb-3">
                        <div className="p-3" onClick={e => this.navigateRoomPage(e, item._id)}>
                            <h4>Room No : {item.roomNo}</h4>
                            <h4>Name : {item.name}</h4>
                            <h4>Description : {item.description}</h4>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default RoomList;