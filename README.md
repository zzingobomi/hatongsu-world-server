### Hatongsu world server

- signaling tcp: 4100
- webrtc udp: 50000-51000
- stun udp: 19302
- network mode: host
- 현재 NAS 라우터 구성에 사용자 지정포트로 수동으로 열어준 상태
  - 새로운 컨테이너 띄울때마다 라우터 구성을 꼭 다시 해줘야 하나? 새로운 컨테이너 뜨면 자동으로 연결이 안되는듯 하다
- bridge 모드와 host 모드때문에 connection 이 안되었다? 정말인가?
- 현재는 turn 서버도 없는 상태..
- 추후에 내 k8s 클러스터 내에서 Stunner 를 실행시킨다면 어떻게 될까? -https://github.com/l7mp/stunner

- wsl2 에서 www폴더내에 client 실행시킬때는 localhost 를 입력해주어야 한다 (127.0.0.1 은 에러남)
