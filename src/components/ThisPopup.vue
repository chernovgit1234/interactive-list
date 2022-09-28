<template>
  <div id="popup" class="popup">
    <div class="popup__body">
      <div class="popup__content">
        <a href="" class="popup__close" @click.prevent="$emit('change-popup')"
          >x</a
        >
        <slot name="adress">Адрес неизвестен </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["change-popup"],
  setup() {
    return {};
  },
});
</script>

<style>
.popup {
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  z-index: 5;
}

.popup__body {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 5px;
}

.popup__body {
  background-color: rgb(44, 44, 44);
  border-radius: 10px;
  color: rgb(213, 163, 75);
  min-width: 100%;
  min-height: 100px;
}

.popup__content {
  display: flex;
  flex-direction: column;
  position: relative;
}

.popup__close {
  position: absolute;
  right: 3px;
  top: -30px;
  color: rgb(221, 124, 124);
  -webkit-box-shadow: 0px 3px 32px 14px rgba(34, 60, 80, 0.35);
  -moz-box-shadow: 0px 3px 32px 14px rgba(34, 60, 80, 0.35);
  box-shadow: 0px 3px 32px 14px rgba(34, 60, 80, 0.35);
  transform: scale(1.5);
}
.popup__close:hover {
  color: rgb(251, 19, 19);
  transform: scale(2);
  transition: all 0.3s ease 0s;
}

.popup__title {
  display: flex;
  padding-bottom: 5px;
}
</style>
