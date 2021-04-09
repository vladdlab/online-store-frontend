import API from '../../api'

const state = {
  orders: [],
  order: null
}

const getters = {
  order: (state: any) => state.order,
  orders: (state: any) => state.orders
}

const mutations = {
  SET_ORDER(state: any, payload: any) {
    state.order = payload
  },
  SET_ORDERS(state: any, payload: any) {
    state.orders = payload
  }
}

const actions = {
  getAllUserOrders({ commit }: any, id: any) {
    return new Promise((resolve, reject) => {
      API.get(`api/v1/customers/${id}/orders`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
      })
        .then(response => {
          commit('SET_ORDERS', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getAUserOrder({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.get(`api/v1/customers/${data.id}/orders/${data.orderId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
      })
        .then(response => {
          commit('SET_ORDER', response.data.data)
          resolve(response.data.data)
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
