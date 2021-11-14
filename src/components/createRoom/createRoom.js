//IMPORT REACT
import React, { Component } from 'react';

import axios from 'axios';
import Select from 'react-select';


const initialState = {
    roomNo: '',
    name: '',
    description: '',
    value: 0,
    categories: [],
    options: [],
    selectedCategories: []
}

//CLASS COMPONENT
class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:9097/category').then(response => {
            console.log(response.data.data);
            this.setState({categories: response.data.data}, () => {
                let data = [];
                this.state.categories.map((item, index) => {
                    let category = {
                        value: item._id,
                        label: item.category
                    }
                    data.push(category);
                });
                this.setState({options: data});
            });
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }


    onCategorySelect(e) {
        this.setState({selected: e ? e.map(item => item.value) : []});
    }

onSubmit(e){
        e.preventDefault();
        let room = {
            roomNo: this.state.roomNo,
            name: this.state.name,
            description: this.state.description,
            value: this.state.value,
            categories: this.state.selectedCategories
        }
        console.log('DATA TO SEND', room )
        axios.post('http://localhost:9097/room/create', room)
        .then(response => {
            alert('Data Successfully inserted')
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message)
        })
    }

//RETURN
render() {
    return (
        <div className='container'>
        <h1> Add New Room </h1>
        <form onSubmit = {this.onSubmit}>
            <div className="mb-3">
                <label htmlFor="roomNo" className="form-label"> Room Number </label>
                <input 
                type="text" 
                className="form-control" 
                id="roomNo" 
                name="roomNo" 
                value={this.state.roomNo} 
                onChange={this.onChange}
                />
            </div>

            <div class="mb-3">
                <label htmlFor="name" className="form-label"> Room Name </label>
                <input 
                type="text" 
                className="form-control" 
                id="name" 
                name="name" 
                value={this.state.name} 
                onChange={this.onChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="type" className="form-label"> Description </label>
                <textarea 
                        className="form-control" 
                        id="description" rows="3" 
                        name="description" 
                        value={this.state.description}
                        onChange={this.onChange}>
                </textarea>
            </div>

            <div className="mb-3">
            <label htmlFor="value" className="form-label"> Room Value Per Hour </label>
                <input 
                type="Number" 
                className="form-control" 
                id="value" 
                name="value" 
                value={this.state.value} 
                onChange={this.onChange}
                />
            </div>

            <div className="mb-3">
            <label htmlFor="category" className="form-label"> categories </label>
            <Select
                            options={this.state.options}
                            onChange={this.onCategorySelect}
                            className={"basic-multi-select"}
                            isMulti
            />
            </div>

            <button type="submit" className="btn btn-primary"> ADD Room </button>
        </form>
    </div>
    )
  }
}

//EXPORT
export default CreateRoom;