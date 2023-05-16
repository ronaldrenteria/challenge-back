const express = require('express');
const cors = require('cors');
require('dotenv').config();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.filesPath = '/files/data'

        // Middlewares
        this.middlewares();

        //App Routes
        this.routes();
    }

    middlewares() {
        // CORS enabled
        this.app.use(cors());
        
        // Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.filesPath,require('../routes/files.route'));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto: ${this.port}`);
        });
    }
}


module.exports = Server;