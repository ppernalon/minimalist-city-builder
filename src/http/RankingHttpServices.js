import AbstractHttpServices from "./AbstractHttpServices"

const API_PATH = {
    ranking: '/',
    postRanking: '/insertClassement'
}

export default class RankingHttpServices extends AbstractHttpServices {
    static getRankingData(onResolve, onError){
        this.getHttp(API_PATH.ranking)
            .then(onResolve)
            .catch(onError)
    }

    static postRankingData(username, score, onResolve, onError){
        this.postHttp(API_PATH.postRanking, {username, score} )
        .then(onResolve)
        .catch(onError)
    }
}