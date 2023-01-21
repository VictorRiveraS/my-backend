"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestHandlers {
    static Handler(res, code, message) {
        res.setHeader('X-Powered-By', 'JV-Confort');
        res.status(code).json(RequestHandlers.evolve(message));
    }
    static evolve(inData) {
        switch (typeof inData) {
            case 'string':
                if (inData === 'emptyArray') {
                    inData = {
                        data: []
                    };
                }
                else {
                    inData = {
                        data: inData
                    };
                }
                break;
            case 'object':
                if (inData[0]) {
                    inData = {
                        data: [...inData]
                    };
                }
                else {
                    inData = {
                        data: { ...inData }
                    };
                }
                break;
        }
        return inData;
    }
}
exports.default = RequestHandlers.Handler;
