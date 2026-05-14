import { server } from "./server.js";
import { WebSocketServer } from "ws";

export let wss = new WebSocketServer({ server });
