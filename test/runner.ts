import {AiCensor} from "../index";

const aiCensor = new AiCensor();
aiCensor.getPrediction("elo ku//rwa").then(response => {
   console.log(response.general.swear);
});
