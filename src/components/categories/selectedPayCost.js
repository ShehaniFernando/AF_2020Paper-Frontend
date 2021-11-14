//IMPORT REACT
import React, { Component } from 'react';

//IMPORT AXIOS
import axios from 'axios';

const initialState = {
    selectedCategory: [],
    selectedRoom: [],
    duration: 1,
    cost: null
}

class SelectedPayCost extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        console.log('V ID:', this.props.match.params.id);
        console.log('C ID:', this.props.match.params.cid);
        axios.get(`http://localhost:9097/room/${this.props.match.params.id}`).then(response => {
            this.setState({selectedRoom: response.data.data});
        });

        axios.get(`http://localhost:9097/category/v2/${this.props.match.params.cid}`).then(response => {
            console.log(response.data.data.category);
            this.setState({selectedCategory: response.data.data});
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let data = {
            categoryValue: this.state.selectedCategory.value,
            roomValue: this.state.selectedRoom.value,
            duration: this.state.duration
        }

        axios.post('http://localhost:9097/category/calculate', data).then(response => {
            console.log('COST RESPONSE', response.data.data);
            this.setState({cost: response.data.data});
            console.log('COST', this.state.cost);
        })
    }

    displayCost() {
        if (this.state.cost == null) {
            return 0;
        } else {
            return this.state.cost;
        }
    }

    render() {
        return (
            <div className="container">
                <h2>You have selected: {this.state.selectedCategory.category}</h2>
                <h4>Room:<br/>&nbsp;&nbsp;{this.state.selectedRoom.roomNo}<br/>&nbsp;&nbsp;{this.state.selectedRoom.name} {this.state.selectedRoom.description}
                </h4>
                <br/>
                <p>Insert the amount of hours you wish to have,</p>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="roomNo" className="form-label">Duration in hours</label>
                        <input type="Number" className="form-control" name="duration" value={this.state.duration}
                               onChange={this.onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Calculate Payment</button>
                </form>
                <br/>
                <h2>Room charge costs: LKR {this.displayCost()}</h2>
            </div>
        )
    }
}

export default SelectedPayCost;