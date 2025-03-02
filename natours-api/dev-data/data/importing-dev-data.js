const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
const dotenv = require('dotenv');

//connecting environment variable to app
dotenv.config({ path: `${__dirname}/../../config.env` });

//connecting to DB
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => console.log('DB connection successful'));

//reading data from JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
//importing data
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data added to DB');
  } catch (err) {
    console.log(err.message);
  }
};
//deleting the data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Deleted from DB');
  } catch (err) {
    console.log(err.message);
  }
};
const setUp = async () => {
  await deleteData();
  await importData();
};

setUp();
