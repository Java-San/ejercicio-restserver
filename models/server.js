const express = require('express');
const cors = require('cors')
const { dbConnection } = require('../db/config.db')

class Server{

    constructor( ){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // conección a la base de datos
        this.connectToDB();

        // middleware
        this.middleware();

        // rutas de mi aplicacion
        this.routes();
    };

    async connectToDB(){
        await dbConnection();
    };

    middleware(){
        this.app.use( cors() );
        
        this.app.use( express.json() );

        this.app.use( express.static('public') )
    };

    routes(){
        this.app.use( this.usuariosPath, require( '../routes/users.routes' ) );
    };

    listen(){
        this.app.listen( this.port, () => console.log(`Escuchando en el puerto: ${this.port}`) );
    };
};

module.exports = Server;