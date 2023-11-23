"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.post('/webhook', (req, res) => {
    const event = req.headers['x-docker-hub-event'];
    const repo = 'nairod36/zootest:main';
    if (event === 'push') {
        (0, child_process_1.exec)(`docker pull ${repo}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            console.log(`Pulling image: ${repo}`);
        });
    }
    res.status(200).end();
});
// Check for updates every 5 minutes 
const updateInterval = 300000;
setInterval(() => {
    const repo = 'nairod36/zootest:main';
    // Replace with the command to pull the updated image
    (0, child_process_1.exec)(`docker pull ${repo}`, (error, stdout, stderr) => {
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
