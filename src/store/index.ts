import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

import login from './login'
import stuff from './stuff'
import user from './user'
import cart from './cart'

export default createStore<State>({
  modules: {
    login,
    stuff,
    user,
    cart
  }
})
