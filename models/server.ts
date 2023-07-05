import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPath = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8887';

        //conexion
        this.dbConnection();

        //meddlewares
        this.meddlewares();

        //defeinir rutas
        this.routes();
    }

    async dbConnection() {
        try {

            await db.authenticate();
            console.log('database online...')

        } catch (error) {
            throw new Error(String(error));
        }
    }


    meddlewares(): void {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`servidor corriendo en ${this.port}`);
        });
    }

    routes(): void {
        this.app.use(this.apiPath.usuarios, userRoutes);
    }

}

export default Server;