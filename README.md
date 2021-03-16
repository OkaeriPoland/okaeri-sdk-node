# Okaeri SDK for Node.js
Currently supported services:
- OK! AI.Censor
- OK! No.Proxy

## Installation
```
npm install okaeri-sdk
```

## Example usage
### AI.Censor
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

### No.Proxy
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
