import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload'
import postRoutes from './routes/post';
import cors from 'cors';

const server = new Server();

// Body parser
server.app.use( bodyParser.urlencoded( { extended:true } ));
server.app.use( bodyParser.json());

// FileUpload
server.app.use( fileUpload() );

// Configurar CORS
server.app.use( cors( { origin: true, credentials: true} ));

// Rutas de mi app
server.app.use( '/user', userRoutes );
server.app.use( '/posts', postRoutes );

// Conectar DB nube
// mongoose.connect('mongodb+srv://andrees0229:1192903802Andres@servidor01.7kqha.mongodb.net/fotosgram', {
//     useNewUrlParser: true, 
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// }, (error) => {
//     if (error) {
//         throw error;
//     }
//     console.log('Base de datos online');
// });    
// Conectar DB local
mongoose.connect('mongodb://localhost:27017/fotosgram', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (error) => {
    if (error) {
        throw error;
    }
    console.log('Base de datos online');
});    

// Levantar express
server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});