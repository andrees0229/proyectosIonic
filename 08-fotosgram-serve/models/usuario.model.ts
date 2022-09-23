import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';


const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },

    email: {
        type: String,
        required: [true,'el email es requerido']
        // match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      },
    password: {
        type: String,
        required: [true, 'el password es necesario' ]
        // match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
        // minlength: 8
    }
});


usuarioSchema.method('comparaPassword', function( password: string = ''): boolean {
    if ( bcrypt.compareSync( password, this.password ) ){
        return true;
    } else {
        return false;
    }
});


interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;

    compararPassword( password : string ) : boolean;
}


export const Usuario = model<IUsuario>('Usuario', usuarioSchema);


