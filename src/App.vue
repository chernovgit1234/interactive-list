<template>
<div class="wrapper">
  <header class="header">ТЕСТОВАЯ  ЗАДАЧА</header>
  <main class="main">
    <div class="filter-group">
      <this-select class="filter" :selectItems="selectItemsByScore" :name="'score'"></this-select>
      <this-select class="filter" :selectItems="selectItemsByCountry" :name="'country'"></this-select>
    </div>
    <this-list></this-list>
  </main>
</div>
</template>

<script lang="ts">

import { defineComponent, computed , onMounted} from "vue";
import ThisSelect from './components/ThisSelect.vue';
import ThisList from './components/ThisList.vue';
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    ThisSelect,
    ThisList
  },
  setup() {
    const store = useStore();

    const selectItemsByCountry = computed(() => {
      return store.getters.selectItemsByCountry;
    });

    const selectItemsByScore = computed(() => {
      return store.getters.selectItemsByScore;
    });

    onMounted(() => {
      store.dispatch('initFilter')
    });

    return {
      selectItemsByScore, selectItemsByCountry
    };
  },
});
</script>
