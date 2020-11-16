import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        token: '',
        status: ''
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
    },
    mutations:{
        ["AUTH-REQUEST"]: (state) => {
            state.status = 'loading'
        },
        ["AUTH-SUCCESS"]: (state, token) => {
            state.status = 'success'
            state.token = token
        },
        ["AUTH-ERROR"]: (state) => {
            state.status = 'error'
            state.token = ''
        },
    },
    actions: {
        ["AUTH_REQUEST"]: ({commit, dispatch}, user) =>{
            return new Promise((resolve, reject) =>{
                commit("AUTH-REQUEST")
                axios({url: 'auth/login', data: user, method: 'POST'})
                    .then(resp =>{
                        const token = resp.data.token
                        axios.defaults.headers.common['Authorization'] = token
                        commit("AUTH-SUCCESS", token)
                        resolve(resp)
                    })
                .catch(err => {
                    commit('AUTH-ERROR', err)
                    reject(err)
                })
            })
        },
        ["AUTH_LOGOUT"]: ({commit, dispatch}) =>{
            return new Promise((resolve, reject) =>{
              commit("AUTH_ERROR")
              delete axios.defaults.headers.common['Authorization']
              resolve()
            })
        },
    },
});