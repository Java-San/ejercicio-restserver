var bcrypt = require('bcryptjs');
const { response, request } = require('express');
const Usuario = require('../models/user');

const usuariosGet = async (req = request, res = response) => {
    const { desde = 0, limit = 5 } = req.query;
    
    const query =  { estado: true };
    
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
        .limit( Number(limit) )
        .skip( Number( desde ) )
    ]);

    res.json( { total, usuarios } );
};

const usuariosPut = async ( req, res = response ) => {
    const { id } = req.params;
    const body = req.body;

    const { _id, password, google, correo, ...resto } = req.body;

    if( password ){
        // encriptar contraseña
        const salt = bcrypt.genSaltSync(); // 10 es por defecto
        body.password = bcrypt.hashSync( password, salt );
    };

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( usuario );
};

const usuariosPost = async ( req = request, res = response ) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // encriptar contraseña
    const salt = bcrypt.genSaltSync(); // 10 es por defecto
    usuario.password = bcrypt.hashSync( password, salt );

    // guardar
    await usuario.save();

    res.json( usuario );
};

const usuariosDelete = async( req = request, res = response ) => {
    const { id } = req.params;

    // borramos fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    // modificamos el estado
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );

    res.json( usuario );
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost, 
    usuariosDelete
};