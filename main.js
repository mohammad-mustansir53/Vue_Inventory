//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: [],
      required: true
    }
  },
  template: `
  <div class="product">
          
    <div class="product-image">
      <img v-bind:src="image" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
      <!-- <span v-show="onSale">On Sale!</span> -->
      <!-- <br /> -->
      <p>{{ sale }}</p>
      <a :href="link" target="_blank">More products like this</a>
      <p>Shipping: {{ shipping }}</p>

      <product-details :details="details"></product-details>

      <div v-for="(variant,index) in variants" 
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)" >
      </div>

      <div>
        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>
      </div>

      <button v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }">
              Add to Cart
      </button>
      <button @click="removeFromCart" 
              :disabled="cart.length <= 0"
              :class="{ disabledButton: cart.length <= 0 }">
              Remove from cart
      </button>

      

    </div>
  </div>
  `,
  data(){
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariant: 0,
      //image: './assets/vmSocks-green.jpg',
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      //inStock: false,
      onSale: true,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: './assets/vmSocks-green.jpg',
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: './assets/vmSocks-blue.jpg',
          variantQuantity: 0
        }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    }
  },
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
      this.selectedVariant = index
    },
    removeFromCart() {
      this.$emit('remove-from-cart',this.variants[this.selectedVariant].variantId)
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    sale() {
      if(this.onSale)
      {
        return this.brand + ' ' + this.product + ' are on sale!'
      }
      else {
        return this.brand + ' ' + this.product + ' are not on sale'
      }
    },
    shipping() {
      if(this.premium) {
        return 'Free'
      }
      else {
        return 2.99
      }
    }
  }
})


var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeItem(id) {
      for(var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1);
        }
      }
    }
  }
})
  
  