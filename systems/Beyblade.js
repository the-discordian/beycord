require("dotenv").config({path: "path/to/.env"});
const uri = process.env.DBPASS;
const MongoClient = require("mongodb").MongoClient;
const mongo = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let bname = "Beyblade"

mongo.connect(err => {
  console.log("MongoDB connected for Beyblade.js");
});

const ids = mongo.db("main").collection("ids")
const id = ids.find({});
const datas = {};
Promise.all([id]).then(data => {
  let beys = data[0];
  beys.forEach(bey => {
    datas[bey._id] = {
      latest: bey.latest,
      name: bey._id
    }
  });
  console.log("Updated data!");
});

setInterval(() => {
  mongo.db("main").collection("ids").updateOne({_id: bname}, {$set: {latest: datas[bname].latest}});
}, 600000);

class Beyblade {
  constructor(name, type, image, firstOwner, id){
    this.name = name;
    this.type = type;
    this.image = image;
    this.firstOwner = firstOwner;
    this.level = 1;
    this.xp = 0;
    this.specials = [];
    this.passives = [];
    this.aliases = [];
    this.gen = 1;
    bname = name || this.name;
    if(id) this.id = id;
    else {
    if(this.name !== "Buddy Bey"){
      if(datas[this.name]){
        this.id = datas[this.name].latest || 1;
        datas[this.name].latest = (datas[this.name].latest || 1) + 1;
      }else{
        mongo.db("main").collection("ids").insertOne({_id: this.name, latest: 2});
        datas[this.name] = {latest: 2};
        this.id = 1;
      }
    ids.updateOne({_id: this.name}, {$set: {latest: datas[this.name].latest}});
    }
  }
  }
  async init(){
    return true;
  }
}

module.exports = Beyblade;