import React, {Component} from 'react';
import {Tabs, message, Form, Button, Input, Modal, Collapse, Switch,Icon,Upload} from 'antd';
import * as Data from '../../data/data';
import {isEmpty} from '../../utils/utils';
import * as RecruitApi from '../../services/RecruitApi';
import ArticleImage from '../../components/ArticleImgage/ArticleImage';

const FormItem = Form.Item;
const {TextArea} = Input;

@Form.create()
class EditView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {info} = this.props;

    const {getFieldDecorator, getFieldValue} = this.props.form;

    return (
      <Form
        onSubmit={e => this.handleSubmit(e)}
        hideRequiredMark
        style={{marginTop: 8}}
      >
        <FormItem
          {...Data.FORM_ITEM_LAYOUT}
          label="反馈内容"
          hasFeedback
        >
          {getFieldDecorator('content', {
            initialValue: isEmpty(info) ? '' : info.content,
            rules: [{
              required: true, message: '请输入内容',
            }],
          })(
            <TextArea
              style={{minHeight: 32, width: 600}}
              placeholder="" rows={7}/>
          )}
        </FormItem>

        <FormItem
          {...Data.FORM_ITEM_LAYOUT}
          label="反馈图片"
          hasFeedback
        >
          {getFieldDecorator('image', {
            initialValue: isEmpty(info) ? '' : info.content,
            rules: [{
              required: true, message: '请输入内容',
            }],
          })(
            <ArticleImage/>
          )}

          <img
            onClick={() => {

            }}
            style={{width: '250px', height: '350px'}}
            src={isEmpty(info) ? '' : info.image} alt='反馈图片'/>
        </FormItem>

        <FormItem
          {...Data.FORM_ITEM_LAYOUT}
          label="是否已处理"
        >
          {getFieldDecorator('state', {
            initialValue: isEmpty(info) ? false : parseInt(info.state) === 1,
            rules: [{
              required: true, message: '',
            }],
          })(
            <Switch
              defaultChecked={isEmpty(info) ? false : parseInt(info.state) === 1}
            />
          )}
        </FormItem>


        <FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
          <Button type="primary" htmlType="submit">
            {isEmpty(info) ? '新增' : '修改'}
          </Button>
        </FormItem>

      </Form>
    );
  }

  handleSubmit(e) {
    const {info} = this.props;
    e.preventDefault();
    const {getFieldProps, getFieldValue} = this.props.form;
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        let images = [];
        if (!this.isAdd()) {
          images.push(info.image);
        }

        let newInfo = {
          content: getFieldValue('content'),
          image: images,
          state: getFieldValue('state') ? 1 : 0,
        };
        if (!this.isAdd()) {
          newInfo.id = this.props.info.id;
        }
        RecruitApi.updateOrAddFeedback(newInfo, (resp) => {
          message.info(`${this.isAdd() ? '新增' : '编辑'}反馈成功`);
          this.props.onDialogDismiss();
        }, (error) => {
          message.info(`${this.isAdd() ? '新增' : '编辑'}反馈失败: ${JSON.stringify(error)}`);
        });

      }
    });
  }

  isAdd() {
    return isEmpty(this.props.info);
  }

}


export default EditView;
