/* import logger from './logger.js';

export default (error, req, res, next) => {
    logger.error(error.message || error)
    res.status(error.status || 500).json({
        message: error.message || 'Unexpected Server Error',
    })
}; */
import { Response } from 'express';

class RequestHandlers {
    public static Handler(res: Response, code: number, message: string | object) {
        res.setHeader('X-Powered-By', 'JV-Confort');
        res.status(code).json(RequestHandlers.evolve(message));
    }
    private static evolve(inData: any) {
        switch (typeof inData) {
            case 'string':
                if (inData === 'emptyArray') {
                    inData = {
                        data: []
                    }
                } else {
                    inData = {
                        data: inData
                    }
                }
                break;
            case 'object':
                if (inData[0]) {
                    inData = {
                        data: [...inData]
                    }
                } else {
                    inData = {
                        data: { ...inData }
                    }
                }
                break;
        }
        return inData;
    }
}
export default RequestHandlers.Handler;