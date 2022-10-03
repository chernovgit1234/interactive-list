import { createStore, StoreOptions } from "vuex";
import { RootState } from '@/store/types';
import axios from "axios";
import { filter } from '../store/filter/index';

const store: StoreOptions<RootState> = {
  state:  {
    users: [],
    activePreloader: false,
  },
  mutations: {
    SET_USERS(state, users: Array<Object>) {
      state.users = users;
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
  },
  getters: {
    users: (u) => u.users,
    activePreloader: (u) => u.activePreloader,
  },

  modules: {
    filter
  }
}

export default createStore<RootState>(store);