import AbstractHttpServices from "./AbstractHttpServices"

const API_PATH = {
    ranking: '/'
}

export default class RankingHttpServices extends AbstractHttpServices {
    static rankingData(onResolve, onError){
        this.getHttp(API_PATH.ranking)
            .then(onResolve)
            .catch(onError)
    }
}