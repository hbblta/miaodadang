import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var token = ''
// var category = ''
uni.getStorage({
	key:'token',
	success(e){
		token = e.data
	},
	fail() {
		token = ''
	}
})

// uni.getStorage({
// 	key:'category',
// 	success(e){
// 		category = JSON.parse(e.data)
// 	},
// 	fail() {
// 		category = ''
// 	}
// })


const store = new Vuex.Store({
	state: {
		token:token,
		categories:''
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
			uni.setStorageSync('state', JSON.stringify(state));
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
			state.sessionKey = null
			uni.removeStorageSync('state');
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setSessionKey(state, sessionKey) {
			state.sessionKey = sessionKey
		}
	},
	actions: {
		// lazy loading openid
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					//console.log(1);
					/* uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					}) */
				}
			})
		},
		apiLogin: async function ({
			commit,
			state
		},n) {　　　　　　
			return await new Promise((resolve, reject) => {　
				commit('setOpenid', n.openid);
				commit('setSessionKey', n.sessionKey);
				commit('login','api');
　　　		})
		}　　
	}
})

export default store