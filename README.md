![GSI Logo](http://gsi.dit.upm.es/templates/jgsi/images/logo.png)
[Simple Colourful Logger](http://gsi.dit.upm.es) 
==================================
A simple logger originally designed for the Maia platform. It accepts arbitrary arguments and formats the input if it's not a string. As a plus, it keeps the padding, so the extra information printed doesn't break the indentation of the default console.log.

You can specify the name of the logger and the levels that should be displayed. By default, only the "log" level is enabled. Use 'all' to add all the logging levels.

    var Logger = require('simple-colourful-logger').Logger;
    logger = new Logger('my-name', ['debug','warn']);
    logger.info('This is an error');
    logger.debug('This is a debug', {foo: "bar", bar: "foo"});
    logger.warn('This is a warning');

The result is the following:

    01:52:41 [DEBUG][my-name] { foo: "bar",
                                bar: "foo }
    01:52:42 [WARN] [my-name] This is a warning


