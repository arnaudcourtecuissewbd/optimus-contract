const express = require('express');
const path = require('path');
const SwaggerExpress = require('swagger-express-mw');
const SwaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, 'api/swagger/swagger.yaml'));

app.use('/doc', SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));

const config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 5000;
  app.listen(port, (error) => console.log(error || `Listening on port ${port}`));
});

module.exports = app; // for testing
