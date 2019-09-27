var socket = io();

let LblTicket1 = $("#lblTicket1");
let LblTicket2 = $("#lblTicket2");
let LblTicket3 = $("#lblTicket3");
let LblTicket4 = $("#lblTicket4");


let LblDesck1 = $("#lblEscritorio1");
let LblDesck2 = $("#lblEscritorio2");
let LblDesck3 = $("#lblEscritorio3");
let LblDesck4 = $("#lblEscritorio4");

let LblTickets = [LblTicket1, LblTicket2, LblTicket3, LblTicket4];
let LblDesks = [LblDesck1, LblDesck2, LblDesck3, LblDesck4];


socket.on('TicketActual', function(data) {
    UpdateHTML(data.GetLastForTickets);
});

socket.on('LastForTickets', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    UpdateHTML(data.GetLastForTickets);
});

function UpdateHTML(LastForTickets) {
    let i = 0;
    LastForTickets.forEach(element => {
        LblTickets[i].text('Ticket ' + element.Numero);
        LblDesks[i].text('Desk ' + element.Escritorio);
        i++;
    });
}