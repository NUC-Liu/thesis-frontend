export default {
  namespaced: true,
  state: {
    id: 0,
    no: '',
    name: ''
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateNo (state, no) {
      state.no = no
    },
    updateName (state, name) {
      state.name = name
    }
  }
}
