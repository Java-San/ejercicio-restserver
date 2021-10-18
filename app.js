require('dotenv').config();
const Server = require( './models/server.js' )

const server = new Server( 'hola perros' );

server.listen();

