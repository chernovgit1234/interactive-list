import { MutationTree } from 'vuex';
import { Filter } from './types';

export const mutations: MutationTree<Filter> = {
    CHANGE_FILTER_STATE(state, objFilter) {
        state.stateFilter = state.stateFilter.map((i: any)=>{
          if (objFilter.name === 'score' && i.name === 'score') {
            i.value = objFilter.value
            return  i
          } else if (objFilter.name === 'country' && i.name === 'country') {
            i.value = objFilter.value
            return  i 
          } else {
            return i
          }
        })
    },

    INIT_FILTER(state) {
        const filterByScore = {name: 'score', value:  state.selectItemsByScore[0]}
        const filterByCountry = {name: 'country' , value: state.selectItemsByCountry[0]}
        state.stateFilter.push(filterByScore)
        state.stateFilter.push(filterByCountry)
    }
};

