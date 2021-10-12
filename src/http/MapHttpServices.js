import AbstractHttpServices from "./AbstractHttpServices"

const API_PATH = {
    generate: '/generate'
}

export default class MapHttpServices extends AbstractHttpServices {
    static generateMap(onResolve, onError){
        this.getHttp(API_PATH.generate)
            .then(onResolve)
            .catch(onError)
    }
}