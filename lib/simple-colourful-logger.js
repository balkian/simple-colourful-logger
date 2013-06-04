var clc = require('cli-color'),
    util = require('util');

var Logger = function(name, levels, colours){
    this.name = name;
    this.colours = colours;
    this.logsactivated = { log: true };
    for(var level in levels){
        this.logsactivated[levels[level]] = true;
    }
    this.log('Initializing logger for levels:', levels);
}

Logger.prototype.applyColours = function(c,colours){
    for(var colour in colours){
        if(c[colours[colour]]){
            c=c[colours[colour]];
        }
    }
    return c;
}

Logger.prototype.logmessage = function(level, colours){
    var c;
    if(typeof colours === 'string'){
        c = clc[colours];
    }else{
        var c = this.applyColours(clc,colours);
    }
    return function(){
        if(this.logsactivated[level] || this.logsactivated['all']){
            var args = Array.prototype.slice.call(arguments);
            var time = new Date();
            var msg = time.toLocaleTimeString()+' ';
            msg += '['+c(level)+']';
            var padding = 5 - level.length;
            while(padding>0){
                msg+=' ';
                padding-=1;
            }
            padding = 9+7+1;
            if(this.name){
                var c1 = clc;
                msg += '['+c1(this.name)+'] ';
                padding += 3+this.name.length;
            }
            var paddingstr = '\n';
            while(padding>0){
                paddingstr+=' ';
                padding-=1;
            }
            for(var i in args){
                if(typeof args[i] !== 'string'){
                    msg+=paddingstr;
                    args[i] = util.inspect(args[i]);
                }
                msg+=args[i].replace(/(\r\n|\n|\r)/gm, paddingstr);
            }
            console.log(msg);
        }
    }
}

Logger.prototype.removeLevel = function(level){
    this.logsactivated[level] = false;
}

Logger.prototype.setLevel = function(level){
    this.logsactivated[level] = true;
}

Logger.prototype.log = Logger.prototype.logmessage('LOG');
Logger.prototype.warn = Logger.prototype.logmessage('WARN','yellow');
Logger.prototype.info = Logger.prototype.logmessage('INFO', ['green']);
Logger.prototype.error = Logger.prototype.logmessage('ERROR', ['red','bgWhite']);
Logger.prototype.debug = Logger.prototype.logmessage('DEBUG',['bgWhite','blue']);

exports.Logger = Logger;
