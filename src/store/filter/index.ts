import { Module } from 'vuex';
import { Filter } from './types';
import { RootState } from '../types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const state: Filter = {
    selectItemsByCountry:  ['russia', 'usa'],
    selectItemsByScore: ['>20', '>10'],
    stateFilter: []
};

export const filter: Module<Filter, RootState> = {
  state, 
  getters,
  mutations,
  actions
};