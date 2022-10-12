const http = require('http');
require('dotenv').config();


const server = http.createServer();
server.listen(process.env.port || 3000, () => console.log(`Server is running on port ${process.env.port || 3000}`));