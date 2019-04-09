<template>
  <div class="control has-icons-left has-icons-right">
    <input
      :id="id"
      :name="name"
      v-model="value"
      class="input"
      type="email"
      placeholder="example@domain.com"
      @input="changedValue"
    />
    <span class="icon is-left">
      <Icon :icon="'email'" />
    </span>
    <span :class="{ 'd-none': !isValid }" class="icon is-right">
      <Icon :icon="'check'" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'EmailInput',
  props: {
    name: {
      type: String,
      default: 'email'
    },
    id: {
      type: String,
      default: 'emailField'
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
