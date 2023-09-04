const {winston} = require('./RequiredPackages'); 


// Info
exports.loggerInfo = async (message = null, service = "your_service") => {
    const logger = winston.createLogger({
        level: "info",
        format: winston.format.json(),
        defaultMeta: { service: service },
        transports: [
          //
          // - Write all logs with importance level of `error` or less to `error.log`
          // - Write all logs with importance level of `info` or less to `combined.log`
          //
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
          new winston.transports.File({ filename: 'logs/warning.log', level: 'warning' }),
          new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
          new winston.transports.File({ filename: 'logs/alert.log', level: 'alert' }),
          // All in One
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ],
      });
      
      //
      // If we're not in production then log to the `console` with the format:
      // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
      //
      
      if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
          format: winston.format.simple(),
        }));
      }


      /*
      //Code to Format Date in JavaScript
        const date = new Date(); //Creating a date object
        console.log("Date:", date) //Printing the date 
        console.log(date.toLocaleString()) //Converting date to string according to given locale and printing it.
      */


        d = Date();
        logger.log({
            data: {date_time: d},
            level: "info",
            message: message
        });
        
        // logger.error('ERROR: distributed');
}


// Error
exports.loggerError = async (message = null, service = "your_service") => {
    const logger = winston.createLogger({
        format: winston.format.json(),
        defaultMeta: { service: service },
        transports: [
          //
          // - Write all logs with importance level of `error` or less to `error.log`
          // - Write all logs with importance level of `info` or less to `combined.log`
          //
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
          new winston.transports.File({ filename: 'logs/warning.log', level: 'warning' }),
          new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
          new winston.transports.File({ filename: 'logs/alert.log', level: 'alert' }),
          // All in One
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ],
      });
    
    

      d = Date();
      logger.error({
          data: {date_time: d},
          level: "error",
          message: message
      });

}