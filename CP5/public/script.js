var app = new Vue({
  el: '#app',
  data: {
    items: [],
    submitted: false,
    cartItems:[],
    purchasedItems:[],
    ordered:0,
  },
  created() {
    this.getItems();
  },
  methods: {
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
    
    
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    cartItem(item) {
      console.log( "in cartItem");
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
          let response = await axios.put("/api/items/" + this.cartItems[i]._id);
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
          this.ordered++;
        }
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
  },
  
});
