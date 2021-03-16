import {AiCensor} from "../index";
import {NoProxy} from "../src/noproxy";

const aiCensor = new AiCensor();
aiCensor.getPrediction("elo ku//rwa").then(response => {
   console.log(response.general.swear);
}).catch(error => console.log(error));

const noProxy = new NoProxy();
noProxy.getInfo("1.1.1.1").then(response => {
   console.log(response.risks.proxy)
}).catch(error => console.log(error));
