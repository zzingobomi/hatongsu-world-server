# Hatongsu World Server

## Demo

[https://practice-zzingo.net](https://practice-zzingo.net)

## Architecture

![Architecture](./docs/architecture.svg)

- HTTPS: 웹 서비스 엔드포인트 및 API 통신
- WebRTC: 실시간으로 캐릭터 위치/회전 정보를 Low latency로 동기화
- WebSocket: 갤러리 내 실시간 채팅을 위한 양방향 통신
- RabbitMQ: 대량의 이미지 업로드 요청을 안정적으로 처리하기 위한 메시지 큐 시스템
- gRPC: 백엔드 마이크로서비스간 Protocol Buffers를 활용한 효율적인 데이터 전송

## Screenshot

<div align="center">
  <h3>메인 페이지</h3>
  <p align="center">
    <img src="./docs/hatongsu_main_1.png" width="45%" style="vertical-align: middle">
    <img src="./docs/hatongsu_main_2.png" width="45%" style="vertical-align: middle">
  </p>
  
  <h3>3D 갤러리</h3>
  <p align="center">
    <img src="./docs/hatongsu_gallery_1.jpg" width="45%" style="vertical-align: middle">
    <img src="./docs/hatongsu_gallery_2.png" width="45%" style="vertical-align: middle">
  </p>

  <h3>대시보드</h3>
  <p align="center">
    <img src="./docs/hatongsu_dashboard_1.png" width="45%" style="vertical-align: middle">
    <img src="./docs/hatongsu_dashboard_2.png" width="45%" style="vertical-align: middle">
  </p>
</div>

## Features

- [x] Geckos.io를 사용하여 캐릭터 위치/회전 동기화 구현
- [x] WebRTC 기반으로 낮은 지연 시간 및 높은 성능 보장

## My Project

|                                                 [Frontend](https://github.com/zzingobomi/hatongsu-frontend)                                                  |                                                 [Backend](https://github.com/zzingobomi/hatongsu-backend)                                                 |                                                   [World Server](https://github.com/zzingobomi/hatongsu-world-server)                                                    |                                                   [Event Server](https://github.com/zzingobomi/hatongsu-event-server)                                                    |                                              [Infra](https://github.com/zzingobomi/on-premise)                                              |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |
| [![Frontend](https://img.shields.io/github/languages/top/zzingobomi/hatongsu-frontend?style=for-the-badge)](https://github.com/zzingobomi/hatongsu-frontend) | [![Backend](https://img.shields.io/github/languages/top/zzingobomi/hatongsu-backend?style=for-the-badge)](https://github.com/zzingobomi/hatongsu-backend) | [![World Server](https://img.shields.io/github/languages/top/zzingobomi/hatongsu-world-server?style=for-the-badge)](https://github.com/zzingobomi/hatongsu-world-server) | [![Event Server](https://img.shields.io/github/languages/top/zzingobomi/hatongsu-event-server?style=for-the-badge)](https://github.com/zzingobomi/hatongsu-event-server) | [![Infra](https://img.shields.io/github/languages/top/zzingobomi/on-premise?style=for-the-badge)](https://github.com/zzingobomi/on-premise) |
