import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    // this is a reusable Button component that receives a button label and the corresponding function to invoke.

    handleSubmit(event) {
        this.props.onSubmit();
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>

                        <button>{this.props.buttonLabel}</button>
                    </form>
                </div>
            </div>
        );
    }
}




export default Button;