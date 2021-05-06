# what-to-watch

![Site Screenshot](./images/screen-1.png)

Demo site: https://what-to-watch-kohl.vercel.app/

## Stack

- NextJS (SSR)
- Typescript
- MobX
- Linaria
- Storybook

## Quick local start with Docker

```sh
docker build -t wtw .
docker run --init --rm -itp 3000:3000 wtw
# http://localhost:3000
# `ctrl + c` - for exit
```

## Local develop

```sh
yarn           # install deps
yarn dev       # -> app:       http://localhost:3000/
yarn storybook # -> storybook: http://localhost:6006/
```
