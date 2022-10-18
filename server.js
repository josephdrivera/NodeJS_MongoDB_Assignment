const http = require('http');
const app = require('./app/app');
require('dotenv').config();



const server = http.createServer(app);
server.listen(process.env.port || 3000, () => console.log(`Server is running on port ${process.env.port || 3000}`));