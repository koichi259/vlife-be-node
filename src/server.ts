import express from 'express';
import usuariosRoutes from './routes/usuariosRoutes';
import provinciaRoutes from './routes/provinciaRoutes';
import paisRoutes from './routes/paisRoutes';
import practicaRoutes from './routes/practicaRoutes';
import especialidadRoutes from './routes/especialidadRoutes';
import LoginJWTRoutes from './routes/LoginJWTRoutes';
import DataService from './service/DataService';

// import cors from 'cors';

const app = express();
if (app.get('env') == 'development') {
    require('dotenv').config();
}

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
};

const PORT = process.env.PORT || 3000;
// console.log('############# dbConfig: ', dbConfig);

const ds = new DataService(dbConfig);

ds.connect();

//Middelware

app.use(express.json());

// add routes
usuariosRoutes(app, ds);
paisRoutes(app, ds);
provinciaRoutes(app, ds);
especialidadRoutes(app, ds);
practicaRoutes(app, ds);
LoginJWTRoutes(app, ds);

app.get('/', (req: any, res: any) => res.send(`VLife API on PORT: ${PORT} hello javi 20200120`));
app.post('/post', (req: any, res: any) => res.send(`VLife API on PORT: ${PORT} hello Maca en el Post 20200127`));
// app.use(function(req, res, next) {
//   console.log(`${req.method} request for '${req.url}`);
//   next();
// });

// apply CORS middleware to allow requests from any domain
// app.use(cors());

// // serve static files for test environment
// app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(
        `VLife server app running in: http://localhost:${PORT} in the ${process.env.ENVIRONMENT} env WITH Typescript!!!`
    );
});

export default app;
