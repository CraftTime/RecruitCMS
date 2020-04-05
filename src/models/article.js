import {addOrUpdateArticleType, getArticleTypeList, addArticle, showArticle, getArticleList, addOrUpdateArticle} from '../services/AppApi';
import {message} from 'antd';
import BraftEditor from 'braft-editor';

export default {
	namespace: 'article',

	state: {
		loading: true,
		editorState: BraftEditor.createEditorState('<p>初始化内容</p>'),
		articleList: [],
		typeList: []
	},

	effects: {
		* addArticle({payload}, {call, put}) {
			const response = yield call(addArticle, payload.param);
			yield put({
				type: 'saveCScoreFormula',
				payload: response.response,
			});
		},

		* getArticle({payload}, {call, put}) {
			const response = yield call(showArticle, payload.param);
			yield put({
				type: 'showArticle',
				payload: response.response,
			});
		},

		* getArticleList({payload}, {call, put}) {
			const response = yield call(getArticleList, payload.param);
			yield put({
				type: 'saveArticleList',
				articleList: response.response,
			});
		},

		* getArticleTypeList({payload}, {call, put}) {
			const response = yield call(getArticleTypeList);
			yield put({
				type: 'saveArticleTypeList',
				typeList: response.response,
			});
		},

		* addOrUpdate({payload}, {call, put}) {
			const response = yield call(addOrUpdateArticle, payload);
			yield put({
				type: 'onAddOrUpdateFinish',
			});
		},

		* addOrUpdateType({payload}, {call, put}) {
			const response = yield call(addOrUpdateArticleType, payload);
			yield put({
				type: 'getArticleTypeList',
			});
		}

	},

	reducers: {
		showArticle(state, action) {
			return {
				...state,
				loading: false,
				editorState: BraftEditor.createEditorState(action.payload.content),
			}
		},

		saveCurrEditorState(state, action) {
			return {
				...state,
				editorState: action.payload.param,
			}
		},

		saveArticleList(state, action) {
			return {
				...state,
				loading: false,
				articleList: action.articleList,
			}
		},

		saveArticleTypeList(state, action) {
			return {
				...state,
				loading: false,
				typeList: action.typeList,
			}
		},

		onAddOrUpdateFinish(state, action) {
			return {
				...state,
				loading: false,
			}
		}

	}
}
