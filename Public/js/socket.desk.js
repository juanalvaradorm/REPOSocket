var socket = io();

var SerchParam = new URLSearchParams(window.location.search);

if (!SerchParam.has('desk')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario');

}

var Desk = SerchParam.get('desk');
var Label = $('small');

console.log(Desk);

$('h1').text('Escritorio: ' + Desk);

$('button').on('click', function(resp) {

    socket.emit('ProcessTicket', {
        Desk: Desk
    }, function(resp) {
        if (resp.ok === false) {
            alert(resp.message);
            return;
        }
        Label.text('Ticket No. ' + resp.Numero);
    });
});;