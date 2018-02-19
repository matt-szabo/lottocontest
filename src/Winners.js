import React, { Component } from 'react';

class Winners extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    // this component displays a list of winners if the props array it receives has winners (> 0).
    // else it displays nothing.

    render() {

        if (this.props.list.length > 0){

            return (
                <div>
                    {this.props.list.map((winner,i) =>

                        <p key = {i}>Winner #{i+1} {winner.ticketOwner} {Math.round(winner.winningAmount)}$</p>

                    )}

                </div>
            );
        }
        else{

            return (
                <div></div>
            );
        }


    }
}




export default Winners;