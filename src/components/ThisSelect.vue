<template>
  <div>
    <select @change="changeSelect($event)" class="select" :name="name">
      <option :value="i" v-for="(i, item) in selectItems" :key="item">{{i}}</option>
    </select>
  </div>
</template>

<script lang="ts">

import { defineComponent, reactive} from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: ['selectItems', 'name'],
  setup(props) {
    const store = useStore();

    const objSelected = reactive({
      name: '',
      value: ''
    })

    function changeSelect(event: any) {
      objSelected.name = props.name
      objSelected.value = event.target.value
      store.dispatch("changeSelect", objSelected);
    }

    return {
      changeSelect
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
