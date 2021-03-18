/*
 * Okaeri SDK (Node)
 * Copyright (C) 2021 Okaeri, Dawid Sawicki
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
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
