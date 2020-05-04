import { fakeAccountLogin, login } from '../services/AppApi';
import { setAuthority } from '../utils/authority';
import {isSuccess} from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = {};
      // const response = yield call(login, payload.userName, payload.password);
      response.currentAuthority = 'user';
      response.type = payload.type;
      response.submitting = false;
      // response.statusCode = isSuccess(response) ? 200 : 0;
      // response.statusCode = isSuccess(response) ? 200 : 0;
      response.statusCode = 200;
      response.status = false;
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (isSuccess(response)) {
        // 非常粗暴的跳转,登陆成功之后权限会变成user或admin,会自动重定向到主页
        // Login success after permission changes to admin or user
        // The refresh will automatically redirect to the home page
        // yield put(routerRedux.push('/'));
        localStorage.setItem("access_token", response.response)
        window.location.reload();
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        // yield put(routerRedux.push('/user/login'));
        // Login out after permission changes to admin or user
        // The refresh will automatically redirect to the login page
        localStorage.setItem("access_token", '')
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        window.location.reload();
      }
    },
  },

  reducers: {
    changeLoginStatus(state, action) {
      let payload = action.payload;
      // alert(" changeLoginStatus action: " + JSON.stringify(action))
      console.log("changeLoginStatus payload: " + JSON.stringify(payload))
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        statusCode: payload.statusCode,
        submitting: payload.submitting,
        type: payload.type,
      };
    },
  },
};
