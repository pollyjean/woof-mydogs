# Woof My Dogs

## Goals

useSWR와 mutate를 사용하여 아래와 같은 화면을 구현하세요.

## Requirements

- 매 동영상마다 '좋아요' 버튼을 만드세요.
- mutate를 사용하여 isLiked의 값을 false -> true로 변경하고 UI에 적용하세요.
- 새로운 강아지 동영상을 얻을 수 있는 버튼을 만드세요.

## API

- [https://dogs-api.nomadcoders.workers.dev](https://dogs-api.nomadcoders.workers.dev)의 URL에 접속하면 강아지 동영상을 얻을 수 있습니다.
- 값을 다시 가져올땐 mutate함수를 인자값 없이 사용하세요.
- SWR은 챌린지 blueprint 예제에 설정되어있습니다.
- API 응답값은 아래와 같습니다.

```json
{
  "url": "https://random.dog/4eee5dd0-189c-45b0-83a5-c63d31c11242.mp4",
  "isLiked": false
}
```
