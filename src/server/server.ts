import * as http from "http";
import * as fs from "fs";
import * as path from "path";

import { SERVER_PORT } from "../shared/constants.js";

export let server = http.createServer((request, response) => {
    let url = request.url ?? "/";

    if (url === "/") {
        url = "/client/index.html";
    }

    console.log(`Incoming request: ${url}`);

    let clientPath = path.resolve("dist/client");
    let filePath = path.join(clientPath, url);

    fs.readFile(filePath, (error, data) => {
        if (error) {
            console.error(`Could not read file: ${filePath}`);
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

        console.log(`Served: ${filePath}`);
    });
});

server.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});