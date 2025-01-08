<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-lg shadow-xl p-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
            Reset Password
          </h2>
          <p class="text-sm text-gray-600" v-if="!showVerification">
            Enter your email address and we'll send you a verification code
          </p>
          <p class="text-sm text-gray-600" v-else>
            Enter the verification code sent to {{ email }}
          </p>
        </div>

        <form v-if="!showVerification" class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
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
            <button type="submit" class="btn-primary" :disabled="loading">
              <span v-if="loading" class="mr-2">
                <svg class="animate-spin h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Send reset instructions
            </button>
          </div>
        </form>

        <form v-else class="mt-8 space-y-6" @submit.prevent="handleVerifyCode">
          <div>
            <label for="code" class="block text-sm font-medium text-gray-700">Verification Code</label>
            <input
              id="code"
              v-model="verificationCode"
              type="text"
              required
              class="form-input"
              placeholder="Enter 6-digit code"
              maxlength="6"
              pattern="[0-9]{6}"
            />
          </div>

          <div>
            <button type="submit" class="btn-primary" :disabled="loading">
              <span v-if="loading" class="mr-2">
                <svg class="animate-spin h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Verify Code
            </button>
          </div>
        </form>

        <div class="text-sm text-center mt-6">
          <nuxt-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            Back to login
          </nuxt-link>
        </div>

        <div v-if="success" class="mt-4 text-sm text-center text-green-600 bg-green-50 rounded-md p-3">
          {{ success }}
        </div>

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
      verificationCode: '',
      showVerification: false,
      success: null,
      error: null
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading
    }
  },
  methods: {
    async handleResetPassword() {
      this.error = null
      this.success = null
      try {
        const response = await this.$store.dispatch('resetPassword', this.email)
        this.success = response.message
        this.showVerification = true
        
        // In development, show the code (in production this would be sent via email)
        console.log('Verification code:', response.code)
        alert(response.code)
      } catch (err) {
        this.error = err.message
      }
    },
    async handleVerifyCode() {
      this.error = null
      this.success = null
      try {
        await this.$store.dispatch('verifyCode', this.verificationCode)
        this.$router.push('/')
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>