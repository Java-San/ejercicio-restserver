const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require( '../controllers/users.controller' )
const { isValidRole, emailValid, validId } = require('../helpers/db-validators');
const router = Router();

router.get('/', usuariosGet );

router.post( '/', [
    check( 'nombre', 'El nombre es requerido' ).not().isEmpty(),
    check( 'password', 'La contraseña debe tener al menos 6 carácteres' ).isLength( {min: 6} ),
    check( 'correo', 'El correo ingresado no es válido' ).isEmail(),
    check( 'correo' ).custom( emailValid ),
    check( 'rol').custom( isValidRole ), // no enviamos el 'rol' ya que si tenemos (rol) => isvalidRole(rol), podemos obiar esa parte, custom enviará el argumento por defecto
    validarCampos
] ,usuariosPost );

router.put( '/:id',
    check( 'id', 'No es un ID válido' ).isMongoId(),
    check( 'id' ).custom( validId ),
    validarCampos
, usuariosPut );

router.delete( '/:id', [
    check( 'id', 'No es un ID válido' ).isMongoId(),
    check( 'id' ).custom( validId ),
    validarCampos
] , usuariosDelete );

module.exports = router;