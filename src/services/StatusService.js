import { enviroment } from "../../enviroment";

export default class StatusService {
    static async get(){
        let result = await fetch(`${enviroment.ip}/gp/gpControl/status`);
        let data = result.json();
        return data;
    }
}
