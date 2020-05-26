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
					label="公司规模"
					hasFeedback
				>
					{getFieldDecorator('scaleName', {
						initialValue: isEmpty(info) ? '' : info.scaleName,
						rules: [{
							required: true, message: '请输入公司规模',
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
				state:1,
					scaleName: getFieldValue('scaleName'),
				};
if(!this.isAdd()){
  info.id = this.props.info.id;
}
				RecruitApi.updateOrAddScale(info, (resp)=> {
					message.info(`${this.isAdd() ? '新增' : '编辑'}公司规模选项成功`);
					this.props.onDialogDismiss();
				}, (error)=> {
					message.info(`${this.isAdd() ? '新增' : '编辑'}公司规模选项失败: ${JSON.stringify(error)}`);
				});

			}
		});
	}

	isAdd() {
		return isEmpty(this.props.info);
	}

}

export default EditView;
