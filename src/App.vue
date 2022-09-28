<template>
<div class="wrapper">
  <header class="header">ТЕСТОВАЯ  ЗАДАЧА</header>
  <main class="main">
    <this-select class="filter"></this-select>
    <this-list class="list"></this-list>
  </main>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThisSelect from './components/ThisSelect.vue';
import ThisList from './components/ThisList.vue';

export default defineComponent({
  name: "App",
  components: {
    ThisSelect,
    ThisList
  },
});
</script>
<style>
@import './assets/styles/null.css';
.header {
  min-height: 50px; 
  background-color: rgba(187, 187, 187, 0.386);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif ;

  text-align: center;
  color: #000000ec;

}

.wrapper {
 min-height: 100%;
 display: flex;
 flex-direction: column;
}

.main {
  width: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: space-evenly;
  gap: 50px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;  
  font-size: 23px;
  color: rgb(255, 252, 249);
  background-color: rgb(53, 64, 65);
  font-weight: normal;
  letter-spacing: 22px;
}

</style>