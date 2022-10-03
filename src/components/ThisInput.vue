<template>
  <div class="checkbox">
    <input
        type="checkbox"
        class="checkbox__input"
        @change="$emit('check', $event)"
        :v-model="turnOn"
        :id="id"
    />
    <label :for="id" class="checkbox__label">{{textLabel}}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";
export default defineComponent ({
  props: ['turnOn', 'id', 'textLabel'],
  emits: ['check'],
  setup() {
    return {
    }
  }
})
</script>