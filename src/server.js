import express from 'express';
import routes from './routes/index';

const app = express();

app.use('/', routes);

// Error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .json({
      status: 'error',
      message: err.message,
    });
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world' });
});

app.listen(3000, () => {
  console.log('app listening on port 3000');
});
