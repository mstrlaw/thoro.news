<template>
  <div class="page">
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container pull-top-50">
          <div class="columns">
            <div class="column is-4 is-offset-4">
              <div class="card shadow no-hover z-10 pull-top-100">
                <div class="card-content">
                  <h4 class="subtitle has-text-black">Create Account</h4>
                  <form
                    @submit.prevent.native="handleForm"
                    @keyup.enter.native="handleForm"
                  >
                    <EmailInput @changedValue="setEmail" />
                    <PasswordInput @changedValue="setPassword" />
                    <PasswordInput
                      :id="'passwordConfirm'"
                      :name="'passwordConfirm'"
                      :placeholder="'Password Confirmation'"
                      @changedValue="setPasswordConfirm"
                    />
                    <div class="level">
                      <div class="level-right">
                        <a href="#" class="is-link">Forgot Password</a>
                      </div>
                      <div class="level-left">
                        <div class="level-item">
                          <a
                            :disabled="!isComplete"
                            :class="{ 'is-loading': isSubmitting }"
                            href="#"
                            class="button is-primary shadow"
                            @click="handleForm"
                            v-text="'Signup'"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <footer class="card-footer">
                  <nuxt-link
                    to="/login"
                    class="card-footer-item"
                    v-text="'I have an account'"
                  />
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Waves :variation="'gray'" />
  </div>
</template>

<script>
import Waves from '@/components/svg/Waves'
import EmailInput from '@/components/inputs/EmailInput'
import PasswordInput from '@/components/inputs/PasswordInput'

export default {
  name: 'Signup',
  components: {
    Waves,
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
      return this.emailValue && this.passwordValue && this.passwordConfirmValue
    }
  },
  methods: {
    setEmail(value) {
      this.emailValue = value
    },
    setPassword(value) {
      this.passwordValue = value
    },
    setPasswordConfirm(value) {
      this.passwordConfirmValue = value
    },
    handleForm() {
      this.isSubmitting = true
      console.log('before signup')
      this.$axios
        .post(`${process.env.API_ENDPOINT}/auth/create-user`, {
          email: this.emailValue,
          password: this.passwordValue,
          passwordConfirm: this.passwordConfirmValue
        })
        .then(() => {
          this.isSubmitting = false
        })
        .catch(error => {
          console.log(error)
          this.isSubmitting = false
        })
    }
  }
}
</script>
