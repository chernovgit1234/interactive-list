import { GetterTree } from 'vuex';
import { Filter } from './types';
import { RootState } from '../types';

export const getters: GetterTree<Filter, RootState> = {
    stateFilter(state): Array<any> {
      return state.stateFilter;
    },
    selectItemsByCountry(state): Array<string> {
      return state.selectItemsByCountry;
    },
    selectItemsByScore(state): Array<string> {
      return state.selectItemsByScore;
    }
};