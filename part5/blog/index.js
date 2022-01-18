const config = require("./utils/config");
const http = require("http");
const app = require("./app");
const logger = require("./utils/logger");

const PORT = config.PORT || 3003;
const server = http.createServer(app);
server.listen(PORT, () => {
  logger.info("Server running on port", PORT);
});
