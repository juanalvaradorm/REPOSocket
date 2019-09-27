//import { io } from "../../server/server";

var socket = io();
var Label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al Servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del Servidor');
});

socket.on('TicketActual', function(resp) {
    Label.text(resp.Actual);
});

$('button').on('click', function() {
    //console.log('Click');
    socket.emit('NextTicket', null, function(NextValue) {
        Label.text(NextValue);
    });
});