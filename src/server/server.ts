import http = require("http");
import fs = require("fs");
import path = require("path");

import { SERVER_PORT } from "../shared/constants.js";
import { httpLogger } from "./logger.js";

export let server = http.createServer((request, response) => {
    let url = request.url ?? "/";

    if (url === "/") {
        url = "/client/index.html";
    }

    httpLogger.debug(`Incoming request: ${url}`);

    let clientPath = path.resolve("dist/client");
    let filePath = path.join(clientPath, url);

    fs.readFile(filePath, (error, data) => {
        if (error) {
            httpLogger.error(`Could not read file: ${filePath}`);
            response.writeHead(404);
            response.end("File not found");
            return;
        }

        let extension = path.extname(filePath);

        let contentType = "text/plain";

        switch (extension) {
            case ".html":
                contentType = "text/html";
                break;

            case ".js":
                contentType = "application/javascript";
                break;

            case ".css":
                contentType = "text/css";
                break;
        }

        response.writeHead(200, { "Content-Type": contentType });
        response.end(data);

        httpLogger.debug(`Served: ${filePath}`);
    });
});

server.listen(SERVER_PORT, () => {
    httpLogger.info(`Server running on port ${SERVER_PORT}`);
});