import { IWSPlayerData, IWSVector3 } from "./shared/worldserver.type";

const MIN_DISTANCE = 2;
const MAX_SPAWN_RADIUS = 5;

function getDistance(pos1: IWSVector3, pos2: IWSVector3): number {
  const dx = pos1.x - pos2.x;
  const dz = pos1.z - pos2.z;
  return Math.sqrt(dx * dx + dz * dz);
}

export function findSafePosition(
  players: Map<string, IWSPlayerData>
): IWSVector3 {
  const basePosition = { x: 0, y: 0, z: 0 };

  if (players.size === 0) {
    return basePosition;
  }

  const isPositionSafe = (pos: IWSVector3) => {
    return Array.from(players.values()).every(
      (player) => getDistance(pos, player.transform.position) >= MIN_DISTANCE
    );
  };

  if (isPositionSafe(basePosition)) {
    return basePosition;
  }

  for (let radius = 1; radius <= MAX_SPAWN_RADIUS; radius++) {
    for (let attempts = 0; attempts < 8; attempts++) {
      const angle = Math.random() * Math.PI * 2;
      const position = {
        x: Math.cos(angle) * radius,
        y: 0,
        z: Math.sin(angle) * radius,
      };

      if (isPositionSafe(position)) {
        return position;
      }
    }
  }

  return {
    x: (Math.random() - 0.5) * MAX_SPAWN_RADIUS * 2,
    y: 0,
    z: (Math.random() - 0.5) * MAX_SPAWN_RADIUS * 2,
  };
}
