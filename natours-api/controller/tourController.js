const fs = require('fs');

//tours data
const tours = JSON.parse(
  fs.readFileSync('../starter/dev-data/data/tours-simple.json', 'utf-8')
);
exports.checkId = (req, res, next, val) => {
  if (val >= tours.length) {
    return res.status(404).send({ status: 'Fail', message: 'Invalid ID' });
  }
  next();
};
exports.getAllTours = (req, res) => {
  res.status(200).json({ status: 'success', data: { tours: tours } });
};
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) return console.log(err.message);
      res.status(201).json({ status: 'success', data: { newTour } });
    }
  );
};
exports.getTour = (req, res) => {
  const tourId = req.params.id * 1;
  const tour = tours.find((el) => el.id === tourId);
  res.status(200).send({ status: 'success', data: { tours: tour } });
};
exports.updateTour = (req, res) => {
  res
    .status(200)
    .send({ status: 'success', data: { tours: '<Updated Tour>' } });
};
exports.deleteTour = (req, res) => {
  res.status(204).send({ status: 'success', data: null });
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: 'Fail', message: 'Missing name or price' });
  }
  next();
};
