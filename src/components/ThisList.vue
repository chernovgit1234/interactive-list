<template>
  <div class="wrapper-list list">
    <h1 class="list__title">Пользователи</h1>
    <div class="list__options">
      <div class="checkbox">
        <this-input :turnOn="turnOnLoader" :id="'preload'" @check="check" :textLabel="'Включить preloader'"></this-input>
      </div>
      <div class="checkbox">
        <this-input :turnOn="activeAnimation" :id="'animation'" @check="check" :textLabel="'Включить анимацию'"></this-input>
      </div>
    </div>
    <ul class="list__content content-list">
      <div>
        <transition-group
          :name="nameTransitionGroup"
          tag="ul"
          v-if="filteredArray.length || users.length"
        >
          <li
            v-for="(i, item) in filteredArray.length ? filteredArray : users"
            :key="item"
            class="content-list__line line"
          >
            <img
              :src="`${i.avatar}`"
              alt=""
              class="line__avatar"
              @click="showAdress(i.id)"
            />
            <div class="line__content">
              <h3>{{ i.title }}</h3>
              <sub class="line__subtitle">{{ i.subtitle }}</sub>
            </div>
            <this-popup
              class="line__wrapper-popup"
              v-if="activeLine && idActive === i.id"
              @change-popup="changePopup"
            >
              <template #adress>
                <h2 class="popup__title">Адрес:</h2>
                <sub class="popup__text">{{ i.adress }}</sub>
              </template>
            </this-popup>
          </li>
        </transition-group>
        <div class="content-list__info info" v-else>
          <h2 class="info__title">Нет пользователей</h2>
          <small class="info__text"
            >Введите в терминале команду:
            <span class="info__span"
              >'json-server --watch db.json'</span
            ></small
          >
        </div>
      </div>
      <div class="wrapper-preloader" v-if="activePreloader && turnOnLoader">
        <this-loader class="preloader"></this-loader>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { onMounted, computed, ref, watch,  defineComponent} from "vue";
import { useStore } from "vuex";
import ThisLoader from "./ThisLoader.vue";
import ThisPopup from "./ThisPopup.vue";
import ThisInput from "./ThisInput.vue";

export default defineComponent ({
  components: {
    ThisPopup,
    ThisLoader,
    ThisInput
  },
  setup() {
    const turnOnLoader = ref<boolean>(false);
    const store = useStore();
    const activeLine = ref<boolean | null>(null);
    const idActive = ref<string | null>(null);
    const filteredArray = ref<Array<Object>>([]);
    const activeAnimation = ref<boolean | null>(null);

    const users = computed(() => {
      return store.getters.users;
    });

    const stateFilter = computed(() => {
      return store.getters.stateFilter;
    });


    const nameTransitionGroup = computed(() => {
      if (activeAnimation.value) {
        return "fade";
      } else {
        return "noactive-fade";
      }
    });

    const activePreloader = computed(() => {
      return store.getters.activePreloader;
    });

    function filter() {
      filteredArray.value = users.value.filter((i:any) => {
        
       if (stateFilter.value[0].value === '>10' && stateFilter.value[1].value === 'usa') {
         return i.score > 10 && i.country === 'usa'
       } else if (stateFilter.value[0].value === '>20' && stateFilter.value[1].value === 'usa') {
         return i.score > 20 && i.country === 'usa'
       } else if (stateFilter.value[0].value === '>20' && stateFilter.value[1].value === 'russia') {
         return i.score > 20 && i.country === 'russia'
       }  else if (stateFilter.value[0].value === '>10' && stateFilter.value[1].value === 'russia') {
         return i.score > 10 && i.country === 'russia'
       }
      })
    }

    onMounted(() => {
      store.dispatch("getUsers");
    });

    function showAdress(id: string) {
      activeLine.value = true;
      idActive.value = id;
    }

    function changePopup() {
      activeLine.value = false;
    }

    function check(event: any) {
      let checked = event.target.checked;
      
      if (event.target.id === 'preload') {
        if (checked) {
          turnOnLoader.value = true;
        } else {
          turnOnLoader.value = false;
        }
      } else if(event.target.id === 'animation') {
        if (checked) {
          activeAnimation.value = true;
        } else {
          activeAnimation.value = false;
        }
      }

      
    }

    function beforeEnter() {
      activeLine.value = false;
    }

     watch(users, (value) => {
      filter()
      console.log('watch-users', value)
    })

    watch(stateFilter, (value) => {
      console.log('watch-stateFilter', value)
      filter()
    });

    return {
      users,
      showAdress,
      activeLine,
      changePopup,
      idActive,
      stateFilter,
      filteredArray,
      activePreloader,
      check,
      turnOnLoader,
      beforeEnter,
      activeAnimation,
      nameTransitionGroup,
      filter
    };
  },
});
</script>
