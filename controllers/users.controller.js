const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const { nombre, edad = 0 } = req.query;
    
    res.json( { 
        message: 'get api - controller',
        nombre,
        edad
    } );
};

const usuariosPut = ( req, res = response ) => {
    const { id } = req.params;

    res.json( { 
        message: 'put api - controller',
        id
    } );
};

const usuariosPost = ( req, res = response ) => {
    console.log( req.body );
    const { nombre, apellido } = req.body;

    res.json( { 
        message: 'get api - controller',
        nombre,
        apellido
    } );
};

const usuariosDelete = ( req, res = response ) => {
    res.json( { message: 'delete api - controller' } );
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost, 
    usuariosDelete
};