# Pok-mon_illustrated_guide
## サーバ立ち上げ
- API
  - Dockerコンテナ立ち上げ
    ```zsh
    docker compose up -d --build
    ```
  - Dockerコンテナに入る
    ```zsh
    docker compose exec api /bin/bash
    ```
  - サーバー立ち上げ
    ```zsh
    ./gradlew clean
    ```
  - サーバー立ち上げ
    ```zsh
    ./gradlew run
    ```