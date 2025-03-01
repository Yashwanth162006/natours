const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

//Starting a server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening to requests on PORT ${PORT}`);
});
