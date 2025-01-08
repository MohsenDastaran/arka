<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-lg shadow-xl p-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p class="text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="form-input"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="form-input"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div class="flex items-center justify-end">
            <div class="text-sm">
              <nuxt-link to="/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </nuxt-link>
            </div>
          </div>

          <div>
            <button type="submit" class="btn-primary" :disabled="loading">
              <span v-if="loading" class="mr-2">
                <svg class="animate-spin h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>

        <div v-if="error" class="mt-4 text-sm text-center text-red-600 bg-red-50 rounded-md p-3">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading
    }
  },
  methods: {
    async handleLogin() {
      this.error = null
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        this.$router.push('/')
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>