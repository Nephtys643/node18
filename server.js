// =============================================================================
// BASE SETUP
// =============================================================================
import express from 'express';
import bodyParser from 'body-parser';
//import mongoose from 'mongoose';
import morgan from 'morgan';
import Bear from './app/models/bear.js';

const app = express();
const port = process.env.PORT || 8080;

// =============================================================================
// APP CONFIG
// =============================================================================
app.use(morgan('dev'));
app.use(bodyParser.json());

// =============================================================================
// DATABASE SETUP
// =============================================================================
//mongoose
 // .connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o')
//then(() => console.log('DB connection alive'))
  //.catch(err => console.error('MongoDB connection error:', err));

// =============================================================================
// ROUTES
// =============================================================================
const router = express.Router();

router.use((req, res, next) => {
  console.log('Something is happening.');
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

// /bears
router
  .route('/bears')
  .post(async (req, res) => {
    try {
      const bear = new Bear({ name: req.body.name });
      await bear.save();
      res.json({ message: 'Bear created!' });
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .get(async (req, res) => {
    try {
      const bears = await Bear.find();
      res.json(bears);
    } catch (err) {
      res.status(500).send(err);
    }
  });

// /bears/:bear_id
router
  .route('/bears/:bear_id')
  .get(async (req, res) => {
    try {
      const bear = await Bear.findById(req.params.bear_id);
      res.json(bear);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .put(async (req, res) => {
    try {
      const bear = await Bear.findById(req.params.bear_id);
      bear.name = req.body.name;
      await bear.save();
      res.json({ message: 'Bear updated!' });
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .delete(async (req, res) => {
    try {
      await Bear.findByIdAndDelete(req.params.bear_id);
      res.json({ message: 'Successfully deleted' });
    } catch (err) {
      res.status(500).send(err);
    }
  });

// =============================================================================
// REGISTER ROUTES
// =============================================================================
app.use('/api', router);

// =============================================================================
// START SERVER
// =============================================================================
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
