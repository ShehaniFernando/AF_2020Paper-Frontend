import React, {Component} from "react";
import axios from 'axios';
import Select from 'react-select';

const initialState = {
    category: '',
    room: '',
    categories: [],
    optionsCategory: [],
    selectedCategory: [],
    optionsRooms: [],
    selected: []
}

class PayCharges extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onRoomSelect = this.onRoomSelect.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:9097/category').then(response => {
            console.log(response.data.data);
            this.setState({categories: response.data.data}, () => {
                let data = [];
                this.state.categories.map((item, index)=>{
                    let category = {
                        value: item.category,
                        label: item.category
                    }
                    data.push(category);
                });
                this.setState({optionsCategory: data});
            });
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    onRoomSelect(e) {
        this.setState({selectedCategory: e ? e.map(item => item.value) : []});
    }


    onSubmit(e) {
        let room = {
            roomNo: this.state.roomNo,
            name: this.state.name,
            description: this.state.description,
            categories: this.state.categories
        }
        console.log('DATA TO SEND', room);
    }

    render() {
        return (
            <div className="container">
                <h1>Create Room</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="roomNo" className="form-label">category</label>
                        <Select
                            options={this.state.optionsCategory}
                            onChange={this.onChange}
                            className={"basic-select"}
                            isMulti
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Rooms</label>
                        <Select
                            options={this.state.optionsRooms}
                            onChange={this.onChange}
                            className={"basic-select"}
                            isMulti
                        />

                    </div>
                </form>
                <h3>Full Payment</h3>
            </div>
        )
    }
}

export default PayCharges;