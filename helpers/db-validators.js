const Role = require('../models/role');
const Usuario = require( '../models/user' );

const isValidRole = async ( rol = '' ) => {
    const existRol = await Role.findOne({ rol });

    if( !existRol ) throw new Error( `El rol ${rol} no existe en la base de datos.` )
};

const emailValid = async( correo = '' ) => {
    // verificar correo
    const existEmail = await Usuario.findOne( {correo} ); // buscamos dentro de nuestro modelo un correo que se igual al correo que le estoy enviando
    if( existEmail ) throw new Error( 'El correo ya se encuentra registrado.' )

};

const validId = async( id ) => {
    const existId = await Usuario.findById( id );
    console.log('jash', existId );

    if( !existId ) throw new Error( 'El id ingresado no existe en la base de datos' );
};

module.exports = {
    isValidRole,
    emailValid,
    validId
}