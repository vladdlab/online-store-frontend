import { ref } from 'vue'
import API from '../api'

export default {
  cart: ref(JSON.parse(localStorage.getItem('cart') || '[]')),

  clearCart() {
    this.cart = []
    localStorage.setItem('cart', '[]')
  },

  createOrder(data: any) {
    return new Promise((resolve, reject) => {
      API.post('api/v1/order', data, {})
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
