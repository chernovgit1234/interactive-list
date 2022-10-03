import { ActionTree } from 'vuex';
import {  Filter } from './types';
import { RootState } from '../types';

export const actions: ActionTree<Filter, RootState> = {
    changeSelect({ commit }, objFilter: Object) {
        if (objFilter) {
          setTimeout(() => {
            commit("CHANGE_PRELOADER");
          }, 1000);
          commit("CHANGE_FILTER_STATE", objFilter);
          commit("CHANGE_PRELOADER");
        }
    },

    initFilter({ commit }) {
      commit("INIT_FILTER")
    }
}