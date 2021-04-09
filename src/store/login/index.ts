import API from '../../api'

const state = {
  user: JSON.parse(localStorage.getItem('user') || '{}')
}

const getters = {
  user: (state: any) => state.user
}

const mutations = {
  SET_USER(state: any, payload: any) {
    state.user = payload.user
  }
}

const actions = {
  loginUser({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.post(
        'api/v1/customers/login',
        { tel: data.tel, pass: data.password },
        {}
      )
        .then(response => {
          commit('SET_USER', response.data.data)
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  regUser({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.post(
        'api/v1/customers',
        {
          tel: data.tel,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          pass: data.password
        },
        {}
      )
        .then(response => {
          commit('SET_USER', response.data.data)
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  loginStuff({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.post('api/v1/stuff/login', data, {})
        .then(response => {
          commit('SET_USER', response.data.data)
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  regStuff({ commit }: any, data: any) {
    return new Promise((resolve, reject) => {
      API.post('api/v1/stuff', data, {})
        .then(response => {
          commit('SET_USER', response.data.data)
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
