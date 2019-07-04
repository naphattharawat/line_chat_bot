# ExpressJS and TypeScript

## Installation

```
npm i typescript -g
npm i ts-node -g
```

```
git clone https://github.com/naphattharawat/line-chat-bot
cd line-chat-bot
npm i
```

## Running

```
cp .env.example.txt .env
npm start
```

open browser and go to http://localhost:3000

## PM2

```
pm2 start --interpreter ts-node src/bin/www.ts MyServerName
```
