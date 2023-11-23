import express from 'express';
import bodyParser from 'body-parser';
import { exec } from 'child_process';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const event = req.headers['x-docker-hub-event'];
  const repo = 'nairod36/zootest:main';

  if (event === 'push') {
    exec(`docker pull ${repo}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      console.log(`Pulling image: ${repo}`);
    });
  }

  res.status(200).end();
});

const updateInterval = 25000;

setInterval(() => {
  const repo = 'nairod36/zootest:main';

  exec(`docker pull ${repo}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    console.log('Periodic update check - Image pulled successfully.');
  });
}, updateInterval);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
