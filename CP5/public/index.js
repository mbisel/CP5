function buildUrl(url) {
  return "https://api.nytimes.com/svc/topstories/v2/" + url + ".json?api-key=" + "EEqDAfMv0QNUPAIgGxh4hSFS8NtdU3SW";
}

let app = new Vue({
  el: '#app',
  data: {
    results: []
  },
  mounted() {
    axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=EEqDAfMv0QNUPAIgGxh4hSFS8NtdU3SW")
      .then(response => { this.results = response.data.results })
    this.getPosts('home');
  },
  methods: {
    getPosts(section) {
      let url = buildUrl(section);
      axios.get(url).then((response) => {
        this.results = response.data.results;
      }).catch(error => { console.log(error); });
    }
  },
  computed: {
    processedPosts() {
      let posts = this.results;

      // Add image_url attribute
      posts.map(post => {
        let imgObj = post.multimedia.find(media => media.format === "superJumbo");
        post.image_url = imgObj ? imgObj.url : "http://placehold.it/300x200?text=N/A";
      });

      // Put Array into Chunks
      let i, j, chunkedArray = [],
        chunk = 4;
      for (i = 0, j = 0; i < posts.length; i += chunk, j++) {
        chunkedArray[j] = posts.slice(i, i + chunk);
      }
      return chunkedArray;
    }
  }
});
