import Vue from 'Vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

const state={
    userInfo:{}
}

export default new Vuex.Store({
    state
})