<script setup lang="ts">
const modelVale = defineModel<string>({
  required: true,
});

const {
  placeholder = '',
  errorMessage = '',
  required = false,
} = defineProps<{
  label: string;
  errorMessage: string;
  placeholder: string;
  type: 'password' | 'email' | 'text';
  required: boolean;
}>();
</script>
<template>
  <div :class="classes.root">
    <label :for="`input${Math.random()}`" :class="classes.label">
      <span> {{ label }} <span v-if="required" style="color: red">*</span></span>
      <input
        :type="type"
        :required="required"
        v-model="modelVale"
        :id="`input${Math.random()}`"
        :class="classes.input"
        :placeholder="placeholder" />
    </label>
    <p v-if="required && errorMessage.length" :class="classes.errorMessage">{{ errorMessage }}</p>
  </div>
</template>
<style module="classes" lang="scss">
.root {
  position: relative;
}

.input {
  height: 24px;
  margin-bottom: 5px;
}

.label {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.errorMessage {
  color: red;
  font-weight: 700;
  font-size: 10px;
  position: absolute;
  bottom: -11px;
}
</style>
