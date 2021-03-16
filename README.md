# Okaeri SDK for Node.js
Currently supported services:
- AI.Censor

## Example usages
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
