let EventEmitter;

try{
    EventEmitter = require("eventemitter3");
}catch(err){
    EventEmitter = require("events");
}

/**
 * Epic custom-coded logger designed for Beycord uses!
 * @extends EventEmitter
 */
class Logger extends EventEmitter {
    /**
     * Epic custom-coded logger designed for Beycord uses!
     */
    constructor(){
        super();
        this.logs = ["The battle started!"];
        this.createdAt = new Date();
        this.channel = {
            createMessage: function(value){this.add("Something happened.")},
            sendMessage: function(value){this.add("Something happened.")},
            send: function(value){this.add("Something happened.")}
        }
    }
    /**
     * Log something.
     * @param {String} content The content to be logged.
     */
    add(content){
        this.logs.push(content);
        if(this.logs.length > 5) this.logs.splice(0,1);
    }
}

module.exports = Logger;
module.exports.help = {
    name: "logger"
     }  