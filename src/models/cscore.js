import { getCScoreFormula } from '../services/AppApi';
import { message } from 'antd';

export default {
  namespace: 'cscore',

  state: {
    loading: true,
    cScoreList: []
  },

  effects: {
    *queryCScoreFormula({ payload }, { call, put }) {
      const response = yield call(getCScoreFormula);
      yield put({
        type: 'saveCScoreFormula',
        payload: response.response,
      });
    },
  },

  reducers: {
    saveCScoreFormula(state, action) {
      return {
        ...state,
        loading: false,
        cScoreList: action.payload
      }
    }
  }
}
