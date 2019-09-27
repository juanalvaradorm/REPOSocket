const FS = require('fs');

class Ticket {
    constructor(Numbers, Desk) {
        this.Numero = Numbers;
        this.Escritorio = Desk;
    }
}

class TicketControl {

    constructor() {
        this.Ultimo = 0;
        this.Today = new Date().toLocaleDateString();

        this.Tickets = [];
        this.LastTickets = [];

        let Data = require('../Data/Data.json');
        // console.log(Data);
        // console.log(this.Today);
        //console.log(Data.Today === this.Today);
        if (Data.Today === this.Today) {
            this.Ultimo = Data.Last;
            this.Tickets = Data.Tickets;
            this.LastTickets = Data.LastTickets;
        } else {
            this.ResetCount();
        }
    }

    NextCount() {
        this.Ultimo += 1;
        let ticket = new Ticket(this.Ultimo, null);
        this.Tickets.push(ticket);
        this.RecordFile();
        return `Ticket No.: ${this.Ultimo}`;
    }

    GetLastTicket() {
        return `Ticket No.: ${this.Ultimo}`;
    }

    GetLastForTickets() {
        return this.LastTickets;
    }

    AttendTicket(NumberDesk) {
        // console.log(NumberDesk);
        // debugger
        if (this.Tickets.length === 0) {
            return {
                ok: false,
                message: 'No hay tickets pendientes'
            }
        }
        let NumberTiket = this.Tickets[0].Numero;
        this.Tickets.shift();
        let atenderTicket = new Ticket(NumberTiket, NumberDesk);

        //this.LastTickets.unshift(atenderTicket);
        this.LastTickets.unshift(atenderTicket);

        if (this.LastTickets.length > 4) {
            this.LastTickets.splice(-1, 1); // Borra el ultimo elemento
        }
        //console.log(this.LastTickets);
        this.RecordFile();
        return atenderTicket;
    }

    ResetCount() {

        this.Ultimo = 0;
        this.Tickets = [];
        this.LastTickets = [];
        this.RecordFile();
        console.log('Se ha reinicializado el sistema');

    }

    RecordFile() {
        let JsonData = {
            "Last": this.Ultimo,
            "Today": this.Today,
            "Tickets": this.Tickets,
            "LastTickets": this.LastTickets
        }

        let JsonDataSt = JSON.stringify(JsonData);
        FS.writeFileSync('./server/Data/Data.json', JsonDataSt);

        console.log('Se ha actualizado el log');
    }

}




module.exports = {
    TicketControl
}