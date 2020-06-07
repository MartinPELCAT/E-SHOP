import * as winston from 'winston';

const myFormat = winston.format.printf(info => {    
    return `${(new Date()).toLocaleString()}: ${info.message}: ${info.stack}`;
});

export default class LOGGER {

    static createLogger(object: object) {
        let controllerName = Object.getPrototypeOf(object).constructor.name;
        return winston.createLogger({
            defaultMeta: { service: controllerName },
            format: myFormat,
            transports: [
                new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
            ]
        })
    }

}