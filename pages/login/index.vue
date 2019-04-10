<template>
  <div class="page">
    <section class="hero is-dark is-fullheight">
      <div class="hero-body">
        <div class="container pull-top-100">
          <div class="columns">
            <div class="column is-4 is-offset-4">
              <div class="card shadow no-hover z-10">
                <div class="card-content">
                  <h4 class="subtitle has-text-black">
                    Login <span>(beta)</span>
                  </h4>
                  <form @submit.prevent="handleForm">
                    <EmailInput @changedValue="setEmail" />
                    <PasswordInput @changedValue="setPassword" />
                    <div class="level">
                      <div class="level-right">
                        <a href="#" class="is-link">Forgot Password?</a>
                      </div>
                      <div class="level-left">
                        <div class="level-item">
                          <button
                            :disabled="!isComplete"
                            :class="{ 'is-loading': isSubmitting }"
                            type="submit"
                            class="button is-primary shadow"
                            @click.prevent="handleForm"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <!--footer class="card-footer">
                  <router-link to="/signup" class="card-footer-item">Don't have an account?</router-link>
                </footer-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Waves />
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import EmailInput from '@/components/inputs/EmailInput'
import PasswordInput from '@/components/inputs/PasswordInput'

export default {
  name: 'Login',
  components: {
    EmailInput,
    PasswordInput
  },
  data() {
    return {
      emailValue: false,
      passwordValue: false,
      passwordConfirmValue: false,
      isSubmitting: false
    }
  },
  computed: {
    isComplete() {
      return this.emailValue && this.passwordValue
    }
  },
  created() {
    if (this.$store.getters.auth) {
      if (this.$store.getters.isAdmin) {
        this.$router.push('/admin')
      }
      if (this.$store.getters.isUser) {
        if ('redirect' in this.$router.currentRoute.query) {
          this.$router.push(this.$router.currentRoute.query.redirect)
        } else {
          this.$router.push('/wall/world')
        }
      }
    }
  },
  methods: {
    setEmail(value) {
      this.emailValue = value
    },
    setPassword(value) {
      this.passwordValue = value
    },
    handleForm() {
      console.log('handleForm')
      this.$store
        .dispatch('loginUser', {
          email: this.emailValue,
          password: this.passwordValue
        })
        .then(res => {
          if (!('error' in res.data)) {
            const authData = res.data.user

            this.$store.dispatch('updateAuth', authData)

            Cookie.remove('auth')

            Cookie.set('auth', { token: authData.token, type: authData.type })

            this.$axios.defaults.headers.Authorization = `${authData.type} ${
              authData.token
            }`

            if (authData.role === 'admin') {
              this.$router.push('admin')
            }
            if (authData.role === 'user') {
              this.$router.push('/wall/world')
            }

            this.$toast.success(
              `<i class="mdi mdi-verified"></i>&nbsp;Welcome ${
                this.$store.getters.username
              }!`
            )
          } else {
            this.$toast.error(
              `<i class="mdi mdi-alert-circle"></i>&nbsp;${res.data.error}`
            )
          }
        })
        .catch(error => {
          console.log(error)
          this.$toast.error(
            '<i class="mdi mdi-alert-circle"></i>&nbsp;An error occurred!'
          )
        })
    }
  }
}
</script>
