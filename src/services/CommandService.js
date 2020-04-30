import { enviroment } from "../../enviroment";

export default class CommandService {
    static async shutter(cmd){
        let result = await fetch(`${enviroment.ip}/gp/gpControl/command/shutter?p=${cmd}`);
        let data = result.json();
        return data;
    }
    static async shutdown(){
        let result = await fetch(`${enviroment.ip}/gp/gpControl/command/system/sleep`);
        let data = result.json();
        return data;
    }

    static async mode(cmd){
        let result = await fetch(`${enviroment.ip}/gp/gpControl/command/mode?p=${cmd}`);
        let data = result.json();
        return data;
    }

    static async defaultMode(cmd){
        let result = await fetch(`${enviroment.ip}/gp/gpControl/setting/53/${cmd}`);
        let data = result.json();
        return data;
    }
}
