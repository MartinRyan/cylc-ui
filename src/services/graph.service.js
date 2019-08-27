/* jshint esversion: 6, asi: true */
import Vue from 'vue'
import Vuex from 'vuex'
import VueNativeSock from 'vue-native-websocket'

Vue.use(Vuex)

const SOCKET_SERVER = 'wss://echo.websocket.org'

export const graphservice = new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false
    },
    message: {
      gData: ''
    }
  },
  mutations: {
    SOCKET_ONOPEN (state, event) {
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state, event) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event) {
      console.error(state, event)
    },
    // default handler called for all methodss
    SOCKET_ONMESSAGE (state, message) {
      console.log('message in graph service', message)
      state.message = message
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT (state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR (state) {
      state.socket.reconnectError = true
    }
  },
  actions: {
    sendMessage: function (context, message) {
      Vue.prototype.$socket.send(message)
    }
  }
})

Vue.use(VueNativeSock, SOCKET_SERVER, { // for testing
  store: graphservice,
  format: 'json',
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000 // (Number) how long to initially wait before attempting a new (1000)
})
