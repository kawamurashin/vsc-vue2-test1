import axios from "axios";
export class LoadManager
{
    async load(){
        try{
            const res = await axios.get("/data.json");
            return  {
                "status" : "error",
                "data":res.data
            };
        }catch (e) {
            return {"status" : "error"}
        }
    }
}