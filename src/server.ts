import { createServer } from './app';
import { config } from './config/env';

const app = createServer();

const port = config.port;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api-docs`);
});
