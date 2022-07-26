import EventEmitter = require("events");
import {ModelManager} from "../modelManager";
import {promises as fs} from 'fs'

const mongoose = require('mongoose');

export class MongoManager extends EventEmitter {

    private readonly _cardModel: any


    constructor() {
        super();
        const config = {
            connectTimeoutMS: 5000,
            socketTimeoutMS: 5000,
            useUnifiedTopology: true
        }
        let Schema = mongoose.Schema;
        const cardDataSchema = new Schema({

            order: String,
            name: String,
            date: Date,
        }, {
            versionKey: false
        });
        this._cardModel = mongoose.model("test3-cards", cardDataSchema);

        mongoose.connect("mongodb://localhost/vue2-loader", config);
    }


    /**
     * 全部の部屋のデータの取得
     * @param collection
     */
    public get = async () => {

        const result = await this._cardModel.find().sort({order: 1});
        return result;
    }
    public post = async (obj) => {
        try{
            const count = await this._cardModel.find().count()
            const card = new this._cardModel({
                name: obj.name,
                order: count
            });

            const result = await card.save();
            return  {
                "status":"ok",
                "result":result

            };
        }catch (e) {
            return {
                "status":"error"
            }
        }

    }
    public add = async (obj) => {
        try{
            const count = await this._cardModel.find().count()
            const card = new this._cardModel({
                name: obj.name,
                order: count,
                date : new Date()
            });

            const result = await card.save();
            return  {
                "status":"ok",

            };
        }catch (e) {
            return {
                "status":"error"
            }
        }

    }


    public orderChange = async (obj) => {
        try{

            let items = obj.items;


            const cards = await this._cardModel.find();
            const n = items.length;
            for(let i = 0;i<n;i++)
            {
                let item = items[i];
                let card = cards.find(element => element._id == item._id)
                if(card){
                    card.order =  item.order;
                    card.save();
                }
            }

            return  {
                "status":"ok",

            };
        }catch (e) {
            return {
                "status":"error"
            }
        }

    }


}