import {CommonEvent} from "@/scripts/events/commonEvent.js";
import {LoadManager} from "@/scripts/model/loaders/loadManager.js";
export class ModelManager extends EventTarget{

    static getInstance = () => {
        if (ModelManager.instance == null) {
            ModelManager._isInstance = true;
            ModelManager.instance = new ModelManager();
            ModelManager._isInstance = false;
        }
        return ModelManager.instance;
    }

    constructor() {
        super();
        if (! ModelManager._isInstance) {
            throw new Error("Singleton　Constructor Error!");
        }
        this.loadManager = new LoadManager();
    }

    async load()
    {
        let data = await this.loadManager.load()
        return data;
    }

    intervalLoad = () =>
    {
        setTimeout(this.eventLoad,3000)
    }

    eventLoad = () =>
    {
        this.load().then(result =>
        {
            this.loadComplete(result)
        });
    }

    loadComplete = (data) =>
    {
        const event = new CommonEvent(CommonEvent.LOAD_COMPLETE);
        event.data = data.data;
        this.dispatchEvent(event)
    }
}
