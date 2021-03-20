import {AiCensor, GameData, NoProxy} from "../index";

const aiCensor = new AiCensor();
aiCensor.getPrediction("elo ku//rwa").then(response => {
    console.log("\n\nAI.CENSOR ===============");
    console.log(response.general.swear);
}).catch(error => console.log(error));

const noProxy = new NoProxy();
noProxy.getInfo("1.1.1.1").then(response => {
    console.log("\n\nNO.PROXY ===============");
    console.log(response.risks.proxy)
}).catch(error => console.log(error));

const gameData = new GameData();
gameData.getMinecraftJavaInfo("hypixel.net").then(response => {
    console.log("\n\nGAMEDATA ===============");
    console.log(`${response.players.online}/${response.players.max}`);
    console.log(response.motd.normalized);
}).catch(error => console.log(error));
