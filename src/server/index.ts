/*
import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {
    let filePath = "dist/client" + (req.url === "/" ? "/index.html" : req.url);

    const ext = path.extname(filePath);

    const contentType =
        ext === ".js" ? "text/javascript" :
            ext === ".html" ? "text/html" :
                ext === ".css" ? "text/css" :
                    "text/plain";

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Not found");
            return;
        }

        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
*/