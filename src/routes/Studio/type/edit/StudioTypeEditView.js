import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message} from 'antd';
import * as Data from '../../../../data/data';
import { addOrUpdateStudioType}  from '../../../../services/AppApi';

const FormItem = Form.Item;

@Form.create()
@connect(({studio}) => ({
	studio,
}))
class StudioTypeEditView extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			type: this.getInitType(props.studioType)
		};
	}

	render() {
		const {type} = this.state;
		const {getFieldDecorator} = this.props.form;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="名称"
					style={{}}
				>
					{getFieldDecorator('name', {
						initialValue: type.name,
						rules: [{
							required: true, message: '请输入名称',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={type.name} placeholder=""
							onChange={(event) => this.onChange(event.target.value)}/>
					)}
				</FormItem>

				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</FormItem>
			</Form>
		);
	}

	getInitType(type) {
		return {
			id: type !== null ? type.id : -1,
			name: type !== null ? type.name : "",
		}
	}

	onChange(value) {
		let {type} = this.state;
		let newType = {...type};
		newType.name = value;

		this.setState({
			type: newType
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.addOrUpdate();
			} else {
				console.log(' user input data is invalid ... ');
			}
		});
	}

	addOrUpdate() {
		let that = this;
		addOrUpdateStudioType(this.state.type).then(function (response) {
			if(Data.API_STATUS_SUCCESS === response.meta.code) {
				that.props.onDialogCancel();
				message.success(that.props.title + "操作成功");
			} else {
				message.error(that.props.title + "操作失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(that.props.title + "操作失败: " + JSON.stringify(error));
		});
	}

}

export default StudioTypeEditView;
