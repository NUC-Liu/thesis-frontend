export default {
  namespaced: true,
  state: {
    thesisId: 0,
    thesisNo: '',
    title: '',
    teacherName: ''
  },
  mutations: {
    updateThesisId (state, thesisId) {
      state.thesisId = thesisId
    },
    updateThesisNo (state, thesisNo) {
      state.thesisNo = thesisNo
    },
    updateTitle (state, title) {
      state.title = title
    },
    updateTeacherName (state, teacherName) {
      state.teacherName = teacherName
    }
  }
}
