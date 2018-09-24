require('dotenv').config();

const server = require('./main.js');

server.listen(process.env.PORT, () => console.log(`WR History server listening on port ${process.env.PORT}`));