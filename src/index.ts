import "dotenv/config";
import geckos, { Data } from "@geckos.io/server";
import {
  IWSAnimationData,
  IWSPlayerData,
  IWSTransform,
  WSMessageType,
} from "./shared/worldserver.type";
import { findSafePosition } from "./utils";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const io = geckos();
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

io.listen(PORT);
