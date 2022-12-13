const express = require('express');
const cors = require('cors');

require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

require('./server/config/expense.config')

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );// need these 2 lines in order to use .post method
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());


require('./server/routes/expense.routes')(app);
require('./server/routes/user.routes')(app);


app.listen(port, () => console.log(`Listening on port: ${port}`) );