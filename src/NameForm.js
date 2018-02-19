import React, { Component } from 'react';

class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    // this form component manages the name entry and passes the name to the main component using the onSubmit prop function

    //this handleChange function acts to control the input value

    handleChange(event) {
        this.setState({name: event.target.value});
    }


    // handleSubmit will check if the name entered is not empty and sends the name value to the main component
    // this.setState resets the (name) controlled input field

    handleSubmit(event) {

        if (this.state.name.length === 0) {

            let text = "Please enter a valid name.";

            this.props.errorMsg(text);

            event.preventDefault();

        }

        else {

            this.props.onSubmit(this.state.name);
            event.preventDefault();
            this.setState({name: ''})
        }


    }


    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>

                        <input type="text" placeholder="Enter ticket buyer's name..." value={this.state.name} onChange={this.handleChange} />

                        <div>
                            <button>Sell a Ticket</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}




export default NameForm;