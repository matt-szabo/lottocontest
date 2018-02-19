import React, { Component } from 'react';
import NameForm from './NameForm';
import Button from './Button';
import Winners from './Winners';
import Tickets from './Tickets';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);

        //State values used below reflect the Number of tickets purchased (ticketNum), the actual (tickets) array,
        // (results) array containing winners, initial (pot) value, (ready) Boolean flag to initialize page after first load,
        // (ticketsBought) array to keep track of ticket holder names for display, (final) Boolean to hide name entry fields
        // once the contest is finalized, and (game) to keep track of game #.

        this.state = {
            ticketNum : 0,
            tickets:[],
            results:[],
            pot : 200,
            ready:false,
            ticketsBought:[],
            final:false,
            game:0
        };


    }


    // resetTickets function creates a new local array (temparray) of 50 "Unsold" tickets containing
    // objects with ticketOwner name value, the corresponding ticket # and whether the ticket was sold.
    // This local array is then used to create the state array (tickets).
    // This function resets the list of tickets at the start of a game or after a draw
    // and also resets the ticketNum variable to 0, as well as reinitializes the winning tickets array (results).
    // This function is invoked using an instance of the Button component.



    resetTickets = () => {

        let temparray = [];

        for (var i = 1; i <= 50; i++) {
            temparray.push({ticketOwner:"Unsold",ticketNumber:i,sold:false});
        }

        this.setState({final:false,tickets: temparray,ticketNum:0,ready:true,results:[],ticketsBought:[],game:this.state.game +1})

    }


    // The buyer function first checks if less than 50 tickets are sold and then proceeds to create local arrays
    // (temparray2) and (nameHolder) to copy state arrays for mutability purposes.
    // A new ticket buyer's name is passed from the NameForm component's prop function and is used to set the main
    // array's ticket buyers name at the correct index tracked by (this.state.ticketNum) as well as adding a ticket holder's
    // name to the nameHolder array via a push method.
    // This function is invoked using a button with a prop function within the NameForm component.


    buyer = (name) => {

        if (this.state.ticketNum < 50) {

            let temparray2 = this.state.tickets;
            let nameHolder = this.state.ticketsBought;

            nameHolder.push({ticketOwner: name,ticketNumber:this.state.ticketNum});

            // temparray2[this.state.ticketNum].ticketOwner = name;
            // temparray2[this.state.ticketNum].ticketNumber = this.state.ticketNum;
            // temparray2[this.state.ticketNum].sold = true;

            temparray2[this.state.ticketNum] = {ticketOwner: name, ticketNumber : this.state.ticketNum, sold:true};

            this.setState({
                tickets: temparray2,
                ticketNum: this.state.ticketNum + 1,
                pot: this.state.pot + 10,
                ticketsBought:nameHolder
            });
        }

    }

    // getRandomIntInclusive is a function using the window.crypto.getRandomValues for a
    // truer random number selection as opposed to using Math.random

    getRandomIntInclusive = (min, max) => {
        const randomBuffer = new Uint32Array(1);

        window.crypto.getRandomValues(randomBuffer);

        let randomNumber = randomBuffer[0] / (0xffffffff + 1);

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(randomNumber * (max - min + 1)) + min;
    }

    // finalizeDraw is the function used to manage the selection of 3 winners at random from the main tickets array
    // (this.state.tickets).  It calculates prize money based on the ratio of the pot provided.
    // Further description below.

    finalizeDraw = () => {

        // this temparray3 array receives a copy of the master array containing 50 "Unsold" tickets.

        let temparray3 = this.state.tickets;

        let winners = [];

        let prizeMoney1 = this.state.pot * 0.375;
        let prizeMoney2 = this.state.pot * 0.075;
        let prizeMoney3 = this.state.pot * 0.05;

        var prizeMoney = [prizeMoney1,prizeMoney2,prizeMoney3];


        let runningPrize = 0;


        // this loop selects 3 winners

        for (let i = 0; i <3 ; i++){

            // each iteration of the loop gets a new random index # based on the length of the master tickets array
            // the array is shortened after each selection of a winner using the splice method to ensure
            // the same winner cannot be selected twice

            let index = this.getRandomIntInclusive(0, temparray3.length);

            winners.push(temparray3[index]);  // adds the ticket object from the index position of the master array to the winners array
            winners[i].winningAmount = prizeMoney[i];  // sets the prize amount to the corresponding winner

            temparray3.splice(index,1);  // removes winning ticket from copy of master array

        }

        // this loop checks if a winning ticket has been sold


        for (let i = 0;i < winners.length;i++){
            if (winners[i].sold){
                runningPrize += prizeMoney[i];
            }

        }

        // the master tickets array, results array containing winners and the pot value are then updated as follows

        this.setState({final:true,tickets:temparray3,results:winners,pot:Math.round(this.state.pot - runningPrize)});


    }


    render() {



        return (
            <div className="App">
                <div className="header">
                    <p>Pot Value: {this.state.pot}$</p>

                    {/*if game was never initialized then do not show ticket numbers and lotto #*/}

                    { this.state.ready ? <p>{50 - this.state.ticketNum} tickets left</p> : ''}
                    { this.state.ready ? <p>Lotto #{this.state.game}</p> : ''}

                </div>

                <Button buttonLabel="Start New Lottery" onSubmit={this.resetTickets}/>

                {/*// if this.state.final then remove name submission form elements from display*/}

                { this.state.ready && !this.state.final ? <NameForm onSubmit={this.buyer}/> : ''}
                { this.state.ready && !this.state.final ? <Button buttonLabel="Pick the Winners" onSubmit={this.finalizeDraw}/> : ''}

                <Winners list={this.state.results} />

                { this.state.ready ? <Tickets list={this.state.ticketsBought}/> : ''}


            </div>
        );
    }
}

export default App;
