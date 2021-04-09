import API from '../../api'

const state = {
  categories: [],
  goods: [],
  good: null,
  orders: [],
  order: null,
  finances: [],
  employees: [],
  rating: []
}

const getters = {
  categories: (state: any) => state.categories,
  good: (state: any) => state.good,
  goods: (state: any) => state.goods,
  order: (state: any) => state.order,
  orders: (state: any) => state.orders,
  finances: (state: any) => state.finances,
  employees: (state: any) => state.employees,
  rating: (state: any) => state.rating
}

const mutations = {
  SET_CATEGORIES(state: any, payload: any) {
    state.categories = payload
  },
  SET_GOOD(state: any, payload: any) {
    state.good = payload.good
  },
  SET_GOODS(state: any, payload: any) {
    state.goods = payload
  },
  SET_ORDER(state: any, payload: any) {
    state.order = payload
  },
  SET_ORDERS(state: any, payload: any) {
    state.orders = payload
  },
  SET_FINANCES(state: any, payload: any) {
    state.finances = payload
  },
  SET_EMPLOYEES(state: any, payload: any) {
    state.employees = payload
  },
  SET_RATING(state: any, payload: any) {
    state.rating = payload
  }
}

const actions = {
  addCategory({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.post('api/v1/category', data, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
        params: data
      })
        .then(response => {
          commit('SET_CATEGORIES', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getCategories({ commit }: any) {
    return new Promise((resolve, reject) => {
      API.get('api/v1/category', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
      })
        .then(response => {
          commit('SET_CATEGORIES', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getAllEmployees({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.get(`api/v1/stuff`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
        params: data
      })
        .then(response => {
          commit('SET_EMPLOYEES', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateEmployee({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.put(
        `api/v1/stuff/${data.id}`,
        {
          confirmed: data.confirmed
        },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } }
      )
        .then(response => {
          commit('SET_GOOD', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getAllOrders({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.get(`api/v1/order`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
        params: data
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
  getAllGoods({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.get(`api/v1/goods`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
        params: data
      })
        .then(response => {
          commit('SET_GOODS', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getRating({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.get(`api/v1/stuff/owner/rating`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
        params: data
      })
        .then(response => {
          commit('SET_RATING', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getFinances({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.get(`api/v1/stuff/owner/finance`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
        params: data
      })
        .then(response => {
          commit('SET_FINANCES', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getAGood({ commit }: any, id: any) {
    return new Promise((resolve, reject) => {
      API.get(`api/v1/goods/${id}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
      })
        .then(response => {
          commit('SET_GOOD', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getAnOrder({ commit }: any, id: any) {
    return new Promise((resolve, reject) => {
      API.get(`api/v1/order/${id}`, {
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
  },
  addGood({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.post(
        'api/v1/goods',
        {
          name: data.name,
          brief_desc: data.brief_desc,
          full_desc: data.full_desc,
          category: data.category,
          attributes: data.attributes,
          purch_cost: data.purch_cost,
          sale_cost: data.sale_cost,
          deliv_date: data.deliv_date,
          amount: data.amount
        },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } }
      )
        .then(response => {
          commit('SET_GOOD', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateGood({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.put(
        `api/v1/goods/${data.id}`,
        {
          name: data.name,
          brief_desc: data.brief_desc,
          full_desc: data.full_desc,
          category: data.category,
          attributes: data.attributes,
          purch_cost: data.purch_cost,
          sale_cost: data.sale_cost,
          deliv_date: data.deliv_date,
          amount: data.amount
        },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } }
      )
        .then(response => {
          commit('SET_GOOD', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  changeOrderStatus({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.put(
        `api/v1/order/${data.id}`,
        {
          status: data.status
        },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } }
      )
        .then(response => {
          commit('SET_ORDER', response.data.data)
          resolve(response.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  addPhotos(_: any, data: any) {
    return new Promise((resolve, reject) => {
      API.post(`api/v1/goods/${data.id}/photos`, data.photos, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
      })
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
