const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
//Connecting to a database
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => console.log('DB connection successful'));

//Starting a server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening to requests on PORT ${PORT}`);
});
