var app = new Vue({
  el: '#admin',
  data: {

    title: "",
    description: "",
    webURL: "",
    name: "",
    email: "",
    ordered: 0,
    file: null,
    addItem: null,
    items: [],
    findTitle: "",
    findDescription: "",
    findItem: null,
    submitted: false,
    cartItems: [],
    purchasedItems: [],
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  },
  methods: {
    async upload() {
      try {
        let r2 = await axios.post('/api/items', {
          title: this.title,
          description: this.description,
          name: this.name,
          email:this.email,
          path: this.webURL,
          ordered: 0,
          submitted: false,
        });
        this.addItem = r2.data;
        this.getItems();
      }
      catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    isEmpty() {
      this.title = "";
    },
    selectItem(item) {
      this.findTitle = "";
      this.findDescription = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
  
    cartItem(item) {
      var index = this.cartItems.indexOf(item);
      if (index > -1) {
        this.cartItems.splice(index, 1);
      }
      else {
        this.cartItems.push(item);
      }
    },

    async submitPurchase() {
      try {
        for (var i = 0; i < this.cartItems.length; i++) {
          console.log(this.cartItems[i]);
          //let response = await axios.put("/api/items/" + this.cartItems[i]._id);
        }
        this.purchasedItems.length = 0;
        for (var i = 0; i < this.cartItems.length; i++) {
          this.purchasedItems.push(this.cartItems[i])
        }
        if (this.purchasedItems.length == 0) {
          this.submitted = false;
        }
        else {
          this.submitted = true;
        }
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },

  }
});
