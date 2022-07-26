import axios from "axios";
export class LoadManager
{
    async load(){
        try{
            const res = await axios.get("/data.json");
            return  {
                "status" : "ok",
                "data":res.data
            };
        }catch (e) {
            return {"status" : "error"}
        }
    }
    async add(obj){
        try{
            const res = await axios.post("/add", obj);
            return  res.data;
        }catch (e) {
            return {"status" : "error"}
        }
    }

    async orderChange(obj){
        try{
            const res = await axios.post("/orderChange", obj);
            return  res.data;
        }catch (e) {
            return {"status" : "error"}
        }
    }


}