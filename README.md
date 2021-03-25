# Okaeri SDK for Node.js

![License](https://img.shields.io/github/license/OkaeriPoland/okaeri-sdk-node)
![Total lines](https://img.shields.io/tokei/lines/github/OkaeriPoland/okaeri-sdk-node)
![Repo size](https://img.shields.io/github/repo-size/OkaeriPoland/okaeri-sdk-node)
![npm](https://img.shields.io/npm/v/okaeri-sdk)
![Contributors](https://img.shields.io/github/contributors/OkaeriPoland/okaeri-sdk-node)
[![Discord](https://img.shields.io/discord/589089838200913930)](https://discord.gg/hASN5eX)

Currently supported services:
- [OK! AI.Censor](#ok-aicensor)
- [OK! No.Proxy](#ok-noproxy)
- [OK! GameData](#ok-gamedata)
- [OK! OpenVote](#ok-openvote)

Full documentation available on [wiki.okaeri.eu](https://wiki.okaeri.eu/) in:
- [Polish](https://wiki.okaeri.eu/pl/sdk/node)
- [English](https://wiki.okaeri.eu/en/sdk/node)

## Installation
```
npm install okaeri-sdk
```

## Example usage
### OK! AI.Censor
See full docs in: [Polish](https://wiki.okaeri.eu/pl/sdk/node#ok-aicensor), [English](https://wiki.okaeri.eu/en/sdk/node#ok-aicensor)
```javascript
const OkaeriSdk = require('okaeri-sdk');
const aicensor = new OkaeriSdk.AiCensor({token: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"});

aicensor.getPrediction("o cie k u r//w@!").then(response => {
    const swear = response.general.swear;
    console.log(swear ? "Tak, to jest wulgarne." : "Nie, to nie jest wulgarne");
}).catch(error => {
    console.log(error);
});
```

### OK! No.Proxy
See full docs in: [Polish](https://wiki.okaeri.eu/pl/sdk/node#ok-noproxy), [English](https://wiki.okaeri.eu/en/sdk/node#ok-noproxy)
```javascript
const OkaeriSdk = require('okaeri-sdk');
const noproxy = new OkaeriSdk.NoProxy({token: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"});

noproxy.getInfo("1.1.1.1").then(response => {
    const proxy = response.risks.proxy;
    const verify = response.suggestions.verify;
    const block = response.suggestions.block;
    console.log(`proxy: ${proxy}, verify: ${verify}, block: ${block}`);
}).catch(error => {
    console.log(error);
});
```

### OK! GameData
See full docs in: [Polish](https://wiki.okaeri.eu/pl/sdk/node#ok-gamedata), [English](https://wiki.okaeri.eu/en/sdk/node#ok-gamedata)
```javascript
const OkaeriSdk = require('okaeri-sdk');
const gamedata = new OkaeriSdk.GameData();
// const gamedata = new OkaeriSdk.GameData({token: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}); // for paid users

gamedata.getMinecraftJavaInfo("hypixel.net").then(response => {
    const online = response.players.online;
    const max = response.players.max;
    const normalizedMotd = response.motd.normalized;
    console.log(`${online}/${max}`);
    console.log(normalizedMotd);
}).catch(error => {
    console.log(error);
});
```

### OK! OpenVote
See full docs in: [Polish](https://wiki.okaeri.eu/pl/sdk/node#ok-openvote), [English](https://wiki.okaeri.eu/en/sdk/node#ok-openvote)
```javascript
const OkaeriSdk = require('okaeri-sdk');
const openvote = new OkaeriSdk.OpenVote();

openvote.getListVote("3fa85f64-5717-4562-b3fc-2c963f66afa6").then(response => {
    const server = response.server;
    const list = response.list;
    console.log(`server=${server}, list=${list}`)    
}).catch(error => {
    console.log(error);
});
```
