//IMPORT REACT
import React, { Component } from 'react';
import axios from 'axios';

//import Swal from 'sweetalert2';

//CLASS COMPONENT
class Rooms extends Component {
    constructor(props) {
        super(props);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.state = {
            rooms: []
            }
    }


    componentDidMount() {
        axios.get('http://localhost:9097/room').then(response => {
            console.log(response.data.data);
            this.setState({rooms: response.data.data});
        })
    }

    deleteRoom(e, roomId) {
        axios.delete(`http://localhost:9097/room/d2/${roomId}`).then(response => {
            console.log(response.data.data);
            alert('Deleted');
            window.location.reload();
        })
    }


//RETURN
render() {
    return (
        <div className="container">
                <h1>Rooms</h1>
                {this.state.rooms.length > 0 && this.state.rooms.map((item, index)=>
                    <div key={index} className="card mb-3">
                        <div className="p-3">
                            <h4>Room No : {item.roomNo}</h4>
                            <h4>Name : {item.name}</h4>
                            <h4>Description : {item.description}</h4>

                            <button type="button" className="btn btn-warning" onClick={this.updateRoom}> Update </button> {' '}
                            <button onClick={e => this.deleteRoom(e, item._id)} className="btn btn-danger">Delete</button> {' '}
                        </div>
                        
                    </div>
                )}
            </div>
    )
  }
}

//EXPORT
export default Rooms;