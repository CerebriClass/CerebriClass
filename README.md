# Cerebri Class

## how to build

when prod
`docker-compose up --build`

when local
`docker-compose -f docker-compose.local.yml up --build`

## tech stack

frontend

- react + ts
- vite + pnpm
- @emotion/styled
- react-responsive
- react-hook-form
- jotai
- ky

requester

- python
- fastapi
- python-docx
- 생성 : openai
- 번역 : papago API

deploy

- AWS EC2
- docker-compose
