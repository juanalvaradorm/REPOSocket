const { io } = require('../server');
const { TicketControl } = require('../Classes/Ticket-Control.js');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    //console.log('Usuario conectado');

    client.on('NextTicket', (data, callback) => {
        let NextValue = ticketControl.NextCount();
        console.log(NextValue);
        callback(NextValue);
    });

    client.emit('TicketActual', {
        Actual: ticketControl.GetLastTicket(),
        GetLastForTickets: ticketControl.GetLastForTickets()
    });

    client.on('ProcessTicket', (data, callback) => {
        // console.log('No. Escritorio: ' + data.Desk);
        if (!data.Desk) {
            return callback({
                ok: false,
                message: 'Favor de proporcionar el escritorio'
            })
        }
        let AtenderTicket = ticketControl.AttendTicket(data.Desk);
        //console.log(AtenderTicket);
        callback(AtenderTicket);

        client.broadcast.emit('LastForTickets', {
            GetLastForTickets: ticketControl.GetLastForTickets()
        });

    });

    // client.emit('enviarMensaje', {
    //     usuario: 'Administrador',
    //     mensaje: 'Bienvenido a esta aplicación'
    // });



    // client.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });

    // // Escuchar el cliente
    // client.on('enviarMensaje', (data, callback) => {

    //     console.log(data);

    //     client.broadcast.emit('enviarMensaje', data);


    //     // if (mensaje.usuario) {
    //     //     callback({
    //     //         resp: 'TODO SALIO BIEN!'
    //     //     });

    //     // } else {
    //     //     callback({
    //     //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     //     });
    //     // }



    // });

});