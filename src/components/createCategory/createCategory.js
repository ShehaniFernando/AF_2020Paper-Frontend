import React, {Component} from "react";
import axios from "axios";
import Select from 'react-select';

const initialState = {
    name: '',
    cost: 0,
    rooms: [],
    options: [],
    selected: []
}

class CreateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onRoomSelect = this.onRoomSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:9097/room').then(response => {
            console.log(response.data.data);
            this.setState({rooms: response.data.data}, () => {
                let data = [];
                this.state.rooms.map((item, index) => {
                    let room = {
                        value: item._id,
                        label: item.roomNo
                    }
                    data.push(room);
                });
                this.setState({options: data});
            });
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onRoomSelect(e) {
        this.setState({selected: e ? e.map(item => item.value) : []});
    }

    onSubmit(e) {
        let category = {
            category: this.state.name,
            value: this.state.cost,
            rooms: this.state.selected
        }
        console.log('DATA TO SEND', category);
        axios.post('http://localhost:9097/category/create', category).then(response => {
            alert('category Added');
        }).catch(error => {
            alert(error.message);
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Create category</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">category Name</label>
                        <input type="text" className="form-control" onChange={this.onChange} name="name"
                               value={this.state.name}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rooms" className="form-label">Rooms</label>
                        <Select
                            options={this.state.options}
                            onChange={this.onRoomSelect}
                            isMulti
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cost" className="form-label">category Price</label>
                        <input type="Number" className="form-control" onChange={this.onChange} name="cost"
                               value={this.state.cost}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add category</button>
                </form>
            </div>
        )
    }
}

export default CreateCategory;