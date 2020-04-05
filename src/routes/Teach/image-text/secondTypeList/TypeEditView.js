import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message} from 'antd';
import * as Data from '../../../../data/data';
import { addOrUpdateTeachImageTextSecondType}  from '../../../../services/AppApi';
import {isSuccess} from '../../../../utils/utils';

const FormItem = Form.Item;

@Form.create()
@connect(({teach}) => ({
	teach
}))
class TypeEditView extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			type: this.getInitType(props.type)
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
						设置
					</Button>
				</FormItem>
			</Form>
		);
	}

	getInitType(type) {
		return {
			id: type !== null ? type.id : -1,
			name: type !== null ? type.name : "",
			typeOneId: this.props.parentTypeId,
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
		let {onSecondTypeChange} = this.props;
		let action = this.props.currType === null ? '添加' : '更新';
		addOrUpdateTeachImageTextSecondType(this.state.type).then(function (response) {
			if(isSuccess(response)) {
				message.success(`艺考教学图文教学二级菜单${action}成功`);
				that.props.onDialogCancel();
				if(onSecondTypeChange !== undefined) {
					onSecondTypeChange();
				}

			} else {
				message.error(`艺考教学图文教学二级菜单${action}失败 error:` + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(`艺考教学图文教学二级菜单${action}失败 error:` + JSON.stringify(error));
		});

	}

}

export default TypeEditView;
