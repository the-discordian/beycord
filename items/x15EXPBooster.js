const Booster = require("./Booster.js");

class x15EXPBooster extends Booster {
  constructor(){
    super({exp: 1.5, time: 3600000}, "x15EXPBooster", 3999)
  }
}
module.exports = x15EXPBooster;