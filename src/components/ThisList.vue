<template>
  <div class="wrapper-list">
    <h1 class="title">Пользователи</h1>
    <div class="options">
      <div class="checkbox">
        <input
          id="preload"
          type="checkbox"
          class="checkbox__input"
          name="checkbox_1"
          @change="check($event)"
          v-model="turnOnLoader"
        />
        <label for="preload" class="checkbox__label">Включить preloader</label>
      </div>
      <div class="checkbox">
        <input
          id="animation"
          type="checkbox"
          class="checkbox__input"
          name="checkbox_2"
          v-model="activeAnimation"
        />
        <label for="animation" class="checkbox__label">Включить анимацию</label>
      </div>
    </div>
    <div>
      <ul class="ul">
        <div>
          <transition-group
            :name="nameTransitionGroup"
            tag="ul"
            v-if="filteredArray.length || users.length"
          >
            <li
              v-for="(i, item) in filteredArray.length ? filteredArray : users"
              :key="item"
              class="line"
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
          <div class="info" v-else>
            <h2 class="info__title">Нет пльзователей</h2>
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
  </div>
</template>

<script lang="ts">
import { onMounted, computed, ref, watch,  defineComponent} from "vue";
import { useStore } from "vuex";
import ThisLoader from "./ThisLoader.vue";
import ThisPopup from "./ThisPopup.vue";

export default defineComponent ({
  components: {
    ThisPopup,
    ThisLoader,
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

    const selectedValue = computed(() => {
      return store.getters.selectedValue;
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

    watch(selectedValue, (value) => {
      filteredArray.value = users.value.filter((i:any) => {
        if (value === "old30") {
          return i.age > 30;
        } else if (value === "mans") {
          return i.gender === "man";
        } else if (value === "usa") {
          return i.citizenship === "usa";
        } else if (value === "all") {
          return i;
        }
      });
    });

    onMounted(() => {
      store.dispatch("getUsers");
      store.getters.users;
    });

    function showAdress(id: string) {
      console.log("текст", id);
      activeLine.value = true;
      idActive.value = id;
    }

    function changePopup() {
      console.log("changePopup");
      activeLine.value = false;
    }

    function check(event: any) {
      let checked = event.target.checked;

      if (checked) {
        turnOnLoader.value = true;
      } else {
        turnOnLoader.value = false;
      }
    }

    function beforeEnter() {
      console.log("changePopup");
      activeLine.value = false;
    }

    return {
      users,
      showAdress,
      activeLine,
      changePopup,
      idActive,
      selectedValue,
      filteredArray,
      activePreloader,
      check,
      turnOnLoader,
      beforeEnter,
      activeAnimation,
      nameTransitionGroup,
    };
  },
});
</script>

<style>
.line {
  position: relative;
  padding: 5px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-radius: 5px;
  transition: all 1s ease 0s;
  color: rgb(31, 31, 31);
}
.line:hover {
  background-color: rgb(255, 255, 255);
}

.line__avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
.line__avatar:hover {
  transform: scale(1.4);
  transition: all 0.3s ease 0s;
}

.line__content {
  align-items: start;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  padding-bottom: 40px;
  color: rgba(100, 96, 96, 0.971);
}

.line__subtitle {
  color: rgb(105, 101, 101);
}

.ul {
  padding: 10px;
  overflow: auto;
  min-height: 500px;
  overflow-x: hidden;
  position: relative;
}
.wrapper-preloader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(243, 243, 243, 0.497);
}

.wrapper-list {
  background-color: rgb(192, 233, 245);
  padding: 10px;
  border-radius: 15px;
  width: 500px;
}

.line__wrapper-popup {
  position: absolute;
  left: 40px;
  top: 40px;
  -webkit-box-shadow: 0px 3px 32px 14px rgba(34, 60, 80, 0.35);
  -moz-box-shadow: 0px 3px 32px 14px rgba(34, 60, 80, 0.35);
  box-shadow: 0px 3px 32px 14px rgba(34, 60, 80, 0.35);
}

.options {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid rgba(153, 197, 219, 0.622);
  padding: 20px 0px;
  border-top: 1px solid rgba(153, 197, 219, 0.622);
  justify-content: space-between;
  align-items: center;
}

.checkbox {
}
.checkbox__input {
  display: none;
}
.checkbox__label {
  font-size: 16px;
  line-height: 140%;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  color: rgba(100, 96, 96, 0.971);
}

.checkbox__label::before {
  content: "";
  flex: 0 0 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 4px;
}
.checkbox__label::after {
  content: "";
  width: 16px;
  height: 16px;
  position: absolute;
  top: 14px;
  left: 4px;
  background-color: rgba(119, 193, 238, 0.955);
  border-radius: 4px;
  transform: scale(0);
  transition: transform 0.3s ease 0s;
}
.checkbox__input:checked + .checkbox__label::after {
  transform: scale(1);
}

.fade-enter-active {
  transition: all 0.8s ease-out;
}

.fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-150px);
  opacity: 0;
}
.info {
  color: rgba(100, 96, 96, 0.971);
}
.info__span {
  color: rgb(215, 147, 59);
  font-size: 20px;
}
</style>
