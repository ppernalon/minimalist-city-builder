<template>
  <div>
    <h1>Classement</h1>
    <table id="Table">
      <thead id="thead">
        <tr id="titleTable">
          <th class="contentTable">Rang</th>
          <th class="contentTitle">Joueur</th>
          <th class="contentTitle">Score</th>
        </tr>
      </thead>
      <tbody id="lines">
        <tr v-for="(ranking, index) in paginate(posts)" :key="ranking[0]">
          <td class="contentTable"> {{ index + 1 + (this.perPage * (this.page - 1))}}</td>
          <td class="contentTable"> {{ ranking[0] }}</td>
          <td class="contentTable">{{ ranking[1] }}</td>
        </tr>
      </tbody>
    </table>
    <div id="pagination-container">
      <button id= "previousButton" class="pagination-button" @click="page--" > Previous </button>
      <button id= "nextButton" class="pagination-button" @click="page++"> Next </button>
    </div>
  </div>
</template>

<script> 
import Ranking from "../../http/RankingHttpServices";
export default {
  name: "Ranking.vue",
  methods:{
    setPages () {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate (posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  posts.slice(from, to);
    }, 
    setDisabledState(){
      if (this.page == 1) {
        document.getElementById("previousButton").disabled = true
      } else {
        document.getElementById("previousButton").disabled = false
      }
      if (this.page == this.pages.length) {
        document.getElementById("nextButton").disabled = true
      } else {
        document.getElementById("nextButton").disabled = false
      }
    }
  },
  computed: {
    displayedPosts () {
      return this.paginate(this.posts);
    }, 
  },
  data(){
    return {
      posts : [''],
      page: 1,
      perPage: 10,
      pages: [], 
    }
  },
  watch:{
    page: function() { 
      this.setDisabledState()
    },
  },
  mounted(){
    const onResolve = (res) => {
      this.posts = res.data
      this.setPages()
      this.setDisabledState()
    }
    const onError = (err) => {
      console.log(err)
    }
    Ranking.getRankingData(onResolve, onError)
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

.pagination-button {
  background-color: #008CFF;
  color: white;
  font-family: inherit;
  border: none;
  font-size: 1.5em;

}

#pagination-container{
  width: 30vw;
  display: inline-flex;
  justify-content: space-around;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
}

.pagination-button:disabled {
   background: grey;
}
</style>