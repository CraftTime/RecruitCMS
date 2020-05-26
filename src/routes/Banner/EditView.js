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
    this.feedbackImg = isEmpty(this.props.info) ? '' : props.info.image;
  }
  onChange(url) {
    this.feedbackImg = url;
    alert(JSON.stringify(this.feedbackImg))
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
          label="广告标题"
          hasBanner
        >
          {getFieldDecorator('desc', {
            initialValue: isEmpty(info) ? '' : info.desc,
            rules: [{
              required: false, message: '请输入内容',
            }],
          })(
            <TextArea
              style={{minHeight: 32, width: 600}}
              placeholder="" rows={7}/>
          )}
        </FormItem>

        <FormItem
          {...Data.FORM_ITEM_LAYOUT}
          label="广告图片"
          hasBanner
        >
          {getFieldDecorator('image', {
            initialValue: isEmpty(info) ? '' : info.image,
            rules: [{
              required: false, message: '请输入内容',
            }],
          })(
            <ArticleImage url={isEmpty(info) ? '':info.image} onUrlChange={(url) => this.onChange(url)}/>
          )}

        </FormItem>

        <FormItem
          {...Data.FORM_ITEM_LAYOUT}
          label="广告链接"
          hasBanner
        >
          {getFieldDecorator('url', {
            initialValue: isEmpty(info) ? '' : info.url,
            rules: [{
              required: false, message: '请输入内容',
            }],
          })(
            <Input
              style={{width: Data.FORM_ITEM_WIDTH}}
              placeholder="" rows={7}/>
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
        let newInfo = {
          desc: getFieldValue('desc'),
          image: this.feedbackImg,
          url: getFieldValue('url'),
        };
        if (!this.isAdd()) {
          newInfo.id = this.props.info.id;
        }
        // alert(newInfo.image)
        RecruitApi.updateOrAddBanner(newInfo, (resp) => {
          message.info(`${this.isAdd() ? '新增' : '编辑'}  广告成功`);
          this.props.onDialogDismiss();
        }, (error) => {
          message.info(`${this.isAdd() ? '新增' : '编辑'}广告失败: ${JSON.stringify(error)}`);
        });

      }
    });
  }

  isAdd() {
    return isEmpty(this.props.info);
  }

}


export default EditView;
