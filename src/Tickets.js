import React, { Component } from 'react';


class Tickets extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

// this component displays the name and ticket number of ticket buyers based on the array it receives (ticketsBought)

    render() {

        return (

            <div className="tickets">
                <p>Ticket Buyers</p>

                {this.props.list.map((ticket,i) =>

                    <p key = {i}>T{i+1} {ticket.ticketOwner}</p>

                )}

            </div>
        );
    }

}


export default Tickets;

