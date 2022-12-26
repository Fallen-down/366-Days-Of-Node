import http from "node:http";

const PORT = 8000;
import serverHandle from "../index.js";

const server = http.createServer(serverHandle);
server.listen(PORT);
