<template>
  <div>
    <h1>Classement</h1>
    <table id="Table">
      <thead id="thead">
        <tr id="titleTable">
          <th class="contentTitle">Joueur</th>
          <th class="contentTitle">Score</th>
        </tr>
      </thead>
      <tbody id="lines">
        <tr v-for="ranking in rankingData" :key="ranking[0]">
          <td class="contentTable"> {{ ranking[0] }}</td>
          <td class="contentTable">{{ ranking[1] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Ranking from "../../http/RankingHttpServices";
export default {
  name: "Ranking.vue",
  methods:{
    log(message){
      console.log(message)
    }
  },
  data(){
    return {
      rankingData : []
    }
  },

  mounted(){
    const onResolve = (res) => {
      this.rankingData = res.data
    }
    const onError = (err) => {
      console.log(err)
    }
    Ranking.rankingData(onResolve, onError)
  },
}

</script>

<style scoped>
h1{
  font-weight: normal;
}
#Table{
  border-collapse: collapse;
  width: 30vw;
  text-align: center;
}

#titleTable{
  background: #008CFF;
  color: white;
  text-align: left;
  font-size: 1.5em;
}
#lines{
  font-family: 'Roboto', sans-serif;
}
.contentTable{
  padding: 1.5vh 0 1.5vh 0;
}
.contentTitle{
  width: 20vw;
  padding: 1vh 0 1vh 0;
  font-weight: normal;
  text-align: center;
}
</style>