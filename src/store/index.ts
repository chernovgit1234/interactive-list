import { createStore, StoreOptions } from "vuex";
import { RootState } from '@/store/types';
import axios from "axios";

const store: StoreOptions<RootState> = {
  state:  {
    users: [],
    selectedValue: "",
    activePreloader: false,
  },
  mutations: {
    SET_USERS(state, users: Array<Object>) {
      state.users = users;
    },
    FILTER_USERS(state, value: string) {
      state.selectedValue = value;
    },
    CHANGE_PRELOADER(state) {
      state.activePreloader = !state.activePreloader;
    },
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const responce = await axios("http://localhost:3000/users");
        const users: Array<Object> = responce.data;
        if (users.length) {
          commit("SET_USERS", users);
        }
      } catch (error) {
        console.log("Есть ошибка:", error);
      }
    },
    changeSelect({ commit }, value: string) {
      if (value) {
        setTimeout(() => {
          commit("CHANGE_PRELOADER");
        }, 1000);
        commit("FILTER_USERS", value);
        commit("CHANGE_PRELOADER");
      }
    },
  },
  getters: {
    users: (u) => u.users,
    selectedValue: (u) => u.selectedValue,
    activePreloader: (u) => u.activePreloader,
  },
}

export default createStore<RootState>(store);