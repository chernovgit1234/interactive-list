<template>
  <div>
    <select @change="changeSelect($event)" class="select">
      <option value="all" selected>Все</option>
      <option value="usa">Гражданство США</option>
      <option value="old30">Старше 30-ти лет</option>
      <option value="mans">Мужчины</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();

    function changeSelect(event: any) {
      store.dispatch("changeSelect", event.target.value);
    }

    return {
      changeSelect,
    };
  },
});
</script>

<style>
.select {
  height: 50px;
  width: 100%;
  border-radius: 5px;
  background-color: rgb(245, 227, 192);
  color: rgb(189, 136, 31);
  font-size: 24px;
  padding: 0px 20px;
  cursor: pointer;
  font-weight: 500;
}
select:focus {
  outline: none;
}

</style>
