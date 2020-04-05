import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import {Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from './ArticleView.less';
import {connect} from 'dva';


@connect(({article}) => ({
  article,
}))
class EditorDemo extends React.Component {
  state = {
    defaultEditorState: BraftEditor.createEditorState('<p>初始化内容</p>')
  };

  componentDidMount() {
    this.showCurrArticle();
  }

  componentWillMount() {

  }

  showCurrArticle() {
    const {dispatch} = this.props;
    dispatch({
      type: 'article/getArticle',
      payload: {
        param: 1
      }
    });
  }



  handleEditorChange = (editorState) => {
    this.saveCurrEditorState(editorState);
  };

  saveCurrEditorState(editorState) {
    const {dispatch} = this.props;
    dispatch({
      type: 'article/saveCurrEditorState',
      payload: {
        param: editorState
      }
    });
  }

  getCurrEditState() {
    const {article: {editorState}} = this.props;
    const {defaultEditorState} = this.state;
    return editorState === undefined ? defaultEditorState : editorState;
  }

  submitContent(){
    // message.info(' 正在保存到服务器');
    let state = this.getCurrEditState().toHTML();
    const param ={
      "articleDesc": "这是高考指南",
      "content": state,
      "focusCount": 0,
      "gmtCreated": 0,
      "gmtModified": "2019-08-22T15:42:17.706Z",
      "headlineArticle": true,
      "id": 1,
      "imageUrl": "dsds",
      "readCount": 0,
      "title": "string",
      "topArticle": true,
      "typeId": 0
    };
    const {dispatch} = this.props;
    dispatch({
      type: 'article/addArticle',
      payload: {
        param: JSON.stringify(param)
      }
    });
  };


  render() {
    const that = this;
    return (
      <div className={Style.rootLayout}>

        <div className={Style.editLayout}>
          <BraftEditor
            value={that.getCurrEditState()}
            onChange={that.handleEditorChange}
            onSave={()=> {this.submitContent()}}
          />

        </div>
      </div>

    )

  }

}

export default EditorDemo;
