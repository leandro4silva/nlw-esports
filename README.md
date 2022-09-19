
<p align=center>
<img src="https://i.imgur.com/DBrxrLu.png"/>
</p>

## Technologies
- ``React``
- ``React Native``
- ``Nodejs``
- ``TypeScript``
- ``Prisma``
- ``Expo``
- ``Axios``
## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


# eSports


Project created to connect players who want to play games together. In the application it is possible to create advertisements, which other players can see and contact to play


## Installation

Install esports web

```bash
  cd esports
  cd web
  npm install
```

Install esports mobile

```bash
  cd esports
  cd mobile
  expo install
```

Install esports backend

```bash
  cd esports
  cd server
  npm install
```


## Demo

[![Click here](https://i.imgur.com/KzPbg7d.png)](https://youtu.be/vt5fpE0bzSY)


## Features
- Create Ad
- Filter ads for a game
- List all games
- Cross platform


## API Reference

### Routes ADS

#### Get all Ads

```http
  GET /ads
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  |  | Return all ads |

#### Show discord of Ad

```http
  GET /ads/${adId}/discord
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of ad to fetch |


#### Create Ad

```http
  POST /games/${gameId}/ads
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of game to fetch |
| `name`      | `string` | **Required**. name  |
| `yearsPlaying`      | `string` | **Required**. yearsPlaying |
| `discord`      | `string` | **Required**. discord |
| `weekDays`      | `string[]` | **Required**. weekDays |
| `hourStart`      | `string` | **Required**. hourStart |
| `hourEnd`      | `string` | **Required**. hourEnd |
| `useVoiceChannel`      | `boolean` | **Required**. useVoiceChannel |


### Routes GAMES
#### Get all games

```http
  GET /games
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  |  | Return all ads |


#### Show a game

```http
  GET /games/{gameId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. id of game to fetch |
