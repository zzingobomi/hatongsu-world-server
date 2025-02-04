#!/bin/bash
set -e

WORLDSERVER_SHARED="/home/zzingo/hatongsu/hatongsu-world-server/src/shared"
FRONTEND_SHARED="/home/zzingo/hatongsu/hatongsu-frontend/src/world/shared"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

validate_paths() {  
  if [ ! -d "$WORLDSERVER_SHARED" ]; then
    echo -e "${RED}ERROR: Source directory not found: $WORLDSERVER_SHARED${NC}"
    exit 1
  fi
  
  if [ ! -d "$FRONTEND_SHARED" ]; then
    echo -e "${RED}ERROR: Target directory not found: $FRONTEND_SHARED${NC}"
    exit 1
  fi
}

sync_assets() {
  echo -e "${YELLOW}🚀 Starting file synchronization...${NC}"
  
  # rsync 명령어 옵션 설명
  # -a: 아카이브 모드(권한, 수정시간 보존)
  # --delete: 소스에 없는 파일 삭제 (event server file 을 지우면 안되기 때문에 해당 옵션 삭제)
  rsync -a --info=progress2 \
    --exclude='*.tmp' \
    --exclude='.gitkeep' \
    "$WORLDSERVER_SHARED/" "$FRONTEND_SHARED/"
  
  local synced_files=$(find "$FRONTEND_SHARED" -type f | wc -l)
  echo -e "${GREEN}✅ Sync completed! Total files: $synced_files${NC}"
}

validate_paths
sync_assets