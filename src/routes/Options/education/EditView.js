import React, {Component} from 'react';
import {Tabs, message, Form, DatePicker, Button, Input, Spin, Modal, Collapse} from 'antd';
import * as Data from '../../../data/data';
import {isEmpty} from '../../../utils/utils';
import * as RecruitApi from '../../../services/RecruitApi';

const FormItem = Form.Item;

@Form.create()
class EditView extends Component {

  componentDidMount() {

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
          label="学历信息"
          hasFeedback
        >
          {getFieldDecorator('educationName', {
            initialValue: isEmpty(info) ? '' : info.educationName,
            rules: [{
              required: true, message: '请输入学历',
            }],
          })(
            <Input
              style={{width: Data.FORM_ITEM_WIDTH}}
              placeholder=""
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
    e.preventDefault();
    const {getFieldProps, getFieldValue} = this.props.form;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let info = {
         pid:0,
         educationName: getFieldValue('educationName'),
         state:1,
        };
      if(!this.isAdd()){
        info.id = this.props.info.id;
      }

        RecruitApi.updateOrAddEducation(info, (resp) => {
          message.info(`${this.isAdd() ? '新增' : '编辑'}年龄选项成功`);
          this.props.onDialogDismiss();
        }, (error) => {
          message.info(`${this.isAdd() ? '新增' : '编辑'}年龄选项失败: ${JSON.stringify(error)}`);
        });

      }
    });
  }

  isAdd() {
    return isEmpty(this.props.info);
  }

}

export default EditView;
