import React, {PureComponent} from 'react';
import {Form, Tag, Input, Tooltip, Icon, Modal, Button, message} from 'antd';
import * as Data from '../../../../data/data';
import {isEmpty, isSuccess} from '../../../../utils/utils';
import {addOrUpdateProfessional} from '../../../../services/AppApi';

const FormItem = Form.Item;

@Form.create()
class EditView extends PureComponent {

	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="专业名称"
					style={{}}
				>
					{getFieldDecorator('name', {
						initialValue: isEmpty(this.props.professional) ? '' : this.props.professional.name,
						rules: [{
							required: true, message: '请输入专业名称',
						}],
					})(
						<Input
							placeholder='请输入专业名称'/>
					)}
				</FormItem>

				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						保存
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
				this.addOrUpdate(getFieldValue('name'));
			} else {
				console.log(' user input data is invalied ... ');
			}
		});
	}

	addOrUpdate(name) {
		let isAdd = isEmpty(this.props.professional);
		let param = {
			id: isAdd ? -1 : this.props.professional.id,
			name: name
		};
		let that = this;
		let title = `${name}-专业${isAdd ? '新增' : '编辑'}`;
		addOrUpdateProfessional(param).then(function (response) {
			if (isSuccess(response)) {
				message.success(title + '成功');
				that.props.onDialogDismiss();
			} else {
				message.error(title + '失败 failed: ' + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error(title + '失败 error: ' + JSON.stringify(error));
		})

	}
}

export default EditView;
