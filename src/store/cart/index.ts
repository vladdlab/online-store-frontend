import API from '../../api'

const state = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]')
}

const getters = {
  cart: (state: any) => state.cart
}

const mutations = {
  CLEAR_CART(state: any) {
    state.cart = []
    localStorage.setItem('cart', '[]')
  }
}

const actions = {
  createOrder(_: any, data: any) {
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

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
