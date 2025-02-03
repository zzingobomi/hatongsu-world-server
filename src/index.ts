import "dotenv/config";
import geckos, { Data } from "@geckos.io/server";
import {
  IWSAnimationData,
  IWSPlayerData,
  IWSTransform,
  WSMessageType,
} from "./shared/worldserver.type";
import { findSafePosition } from "./utils";
import express from "express";
import http from "http";
import https from "https";
import cors from "cors";
import fs from "fs";

const isProduction = process.env.NODE_ENV === "production";
const TCP_PORT = process.env.TCP_PORT
  ? parseInt(process.env.TCP_PORT, 10)
  : 4100;
const UDP_MIN_PORT = process.env.UDP_MIN_PORT
  ? parseInt(process.env.UDP_MIN_PORT, 10)
  : 50000;
const UDP_MAX_PORT = process.env.UDP_MAX_PORT
  ? parseInt(process.env.UDP_MAX_PORT, 10)
  : 50010;

const app = express();
let server: http.Server | https.Server;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

if (isProduction) {
  const sslOptions = {
    key: fs.readFileSync(
      process.env.SSL_KEY_PATH || "/etc/ssl/certs/privkey.pem"
    ),
    cert: fs.readFileSync(
      process.env.SSL_CERT_PATH || "/etc/ssl/certs/cert.pem"
    ),
    ca: fs.readFileSync(
      process.env.SSL_CHAIN_PATH || "/etc/ssl/certs/chain.pem"
    ),
  };
  server = https.createServer(sslOptions, app);
} else {
  server = http.createServer(app);
}

const io = geckos({
  portRange: {
    min: UDP_MIN_PORT,
    max: UDP_MAX_PORT,
  },
  cors: { allowAuthorization: true, origin: "*" },
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
});
io.addServer(server);

const players: Map<string, IWSPlayerData> = new Map();

io.onConnection((channel) => {
  console.log(`Client connected! ID: ${channel.id}`);

  const playerId = channel.id as string;
  const safePosition = findSafePosition(players);

  const newPlayer: IWSPlayerData = {
    playerId,
    transform: {
      position: safePosition,
      rotation: {
        x: 0,
        y: Math.sin(Math.PI / 4),
        z: 0,
        w: Math.sin(Math.PI / 4),
      },
    },
  };
  players.set(playerId, newPlayer);

  channel.emit(WSMessageType.SERVER_NEW_PLAYER, newPlayer);
  channel.emit(
    WSMessageType.SERVER_EXISTING_PLAYERS,
    Array.from(players.values())
  );

  channel.broadcast.emit(WSMessageType.SERVER_NEW_PLAYER, newPlayer);

  channel.on(WSMessageType.CLIENT_PLAYER_UPDATE, (data: Data) => {
    const playerData = data as IWSTransform;

    if (players.has(playerId)) {
      const player = players.get(playerId)!;
      player.transform = playerData;

      channel.broadcast.emit(WSMessageType.SERVER_PLAYER_UPDATE, {
        playerId,
        transform: playerData,
      });
    }
  });

  channel.on(WSMessageType.CLIENT_ANIMATION_UPDATE, (data: Data) => {
    const { state } = data as IWSAnimationData;

    channel.broadcast.emit(WSMessageType.SERVER_PLAYER_ANIMATION, {
      playerId,
      state,
    });
  });

  channel.onDisconnect(() => {
    console.log(`Client disconnected! ID: ${playerId}`);
    players.delete(playerId);
    io.emit(WSMessageType.SERVER_PLAYER_DISCONNECTED, playerId);
  });
});

server.listen(TCP_PORT, () => {
  console.log(`server ${TCP_PORT} started`);
});
