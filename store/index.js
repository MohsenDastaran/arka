export const state = () => ({
  user: null,
  loading: false,
  resetEmail: null,
  resetCode: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_RESET_EMAIL(state, email) {
    state.resetEmail = email
  },
  SET_RESET_CODE(state, code) {
    state.resetCode = code
  }
}

export const actions = {
  login({ commit }, { email, password }) {
    commit('SET_LOADING', true)
    
    // Mock users data
    const users = [
      { id: 1, email: 'mohsen@example.com', password: 'password1' },
      { id: 2, email: 'arka@example.com', password: 'password2' },
      { id: 3, email: 'novin@example.com', password: 'password3' }
    ]

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email && u.password === password)
        
        if (user) {
          const userData = { ...user }
          delete userData.password
          commit('SET_USER', userData)
          resolve(userData)
        } else {
          reject(new Error('Invalid credentials'))
        }
        commit('SET_LOADING', false)
      }, 1000)
    })
  },

  logout({ commit }) {
    commit('SET_USER', null)
    commit('SET_RESET_EMAIL', null)
    commit('SET_RESET_CODE', null)
  },

  resetPassword({ commit }, email) {
    commit('SET_LOADING', true)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a random 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        commit('SET_RESET_EMAIL', email)
        commit('SET_RESET_CODE', code)
        commit('SET_LOADING', false)
        
        resolve({ 
          message: 'Password reset code sent to your email',
          code 
        })
      }, 1000)
    })
  },

  verifyCode({ commit, state }, code) {
    commit('SET_LOADING', true)
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code === state.resetCode) {
          const mockUser = { id: 999, email: state.resetEmail }
          commit('SET_USER', mockUser)
          resolve(mockUser)
        } else {
          reject(new Error('Invalid verification code'))
        }
        commit('SET_LOADING', false)
      }, 1000)
    })
  }
}