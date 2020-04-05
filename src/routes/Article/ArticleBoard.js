import React, {Component} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import Style from './ArticleBoard.less';
import BraftEditor from 'braft-editor';
import * as AppApi from '../../services/AppApi';


@connect(({article}) => ({
	article,
}))
class ArticleBoard extends Component {
	state = {
		defaultEditorState: BraftEditor.createEditorState('<p>初始化内容</p>'),
		htmlValue: '<p>初始化内容</p>'

	};

	componentDidMount() {

		const {dispatch} = this.props;
		dispatch({
			type: 'article/getArticle',
			payload: {
				param: 1
			}
		});

		let that = this;
		let param = {
			weixinUrl: 'https://mp.weixin.qq.com/s/pAO8H4_bhTdXfhOMDw_fTA'
		};
		AppApi.parseWeiXinArticle(param).then(function (response) {
		// AppApi.parseWeiXinArticle('https://mp.weixin.qq.com/s/tjdMPZmOjcooBuChbXZ-Xw').then(function (response) {
			message.error(' parseWeiXinArticle success');
			let result = response.response;
			console.log(' parseWeiXinArticle success result: ' + result);
			that.setState({
				defaultEditorState: BraftEditor.createEditorState(response.response),
				htmlValue: result
			})

		}).catch(function (error) {
			message.error(' parseWeiXinArticle error1: ' + JSON.stringify(error));
		});


	}

	render() {
		const {defaultEditorState, htmlValue} = this.state;
		// const {article: {editorState}} = this.props;

      return (
      	<div>
	        <center>
		        <div className={Style.rootLayout} dangerouslySetInnerHTML={{
			        __html: htmlValue
			        // __html: defaultEditorState.toHTML()
		        }}/>
	        </center>
        </div>

      );
  }

}

export default ArticleBoard;
