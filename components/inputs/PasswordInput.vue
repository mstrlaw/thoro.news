<template>
  <div class="control has-icons-left has-icons-right">
    <input
      :id="id"
      :name="name"
      v-model="value"
      :placeholder="placeholder"
      class="input"
      type="password"
      @input="changedValue"
    />
    <span class="icon is-left">
      <Icon :icon="'lock'" />
    </span>
    <span :class="{ 'd-none': !isValid }" class="icon is-right">
      <Icon :icon="'check'" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: {
    name: {
      type: String,
      default: 'password'
    },
    placeholder: {
      type: String,
      default: 'Password'
    },
    id: {
      type: String,
      default: 'passwordField'
    }
  },
  data() {
    return {
      value: '',
      isValid: false
    }
  },
  methods: {
    changedValue() {
      if (this.value.trim().length > 0) {
        this.$emit('changedValue', this.value)
      } else {
        this.$emit('changedValue', false)
      }
    }
  }
}
</script>
