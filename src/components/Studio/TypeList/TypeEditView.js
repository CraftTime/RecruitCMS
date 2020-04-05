import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message} from 'antd';
import * as Data from '../../../data/data';
import { addOrUpdateStudioTypeList}  from '../../../services/AppApi';

const FormItem = Form.Item;

@Form.create()
@connect(({studio, teach}) => ({
	studio, teach
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
		let {addOrUpdateMethod} = this.props;
		let param = {
			...this.state.type
		};
		param.institutionId = this.props.institutionId;

		const {dispatch} = this.props;
		dispatch({
			type: this.props.modelName + '/' + addOrUpdateMethod,
			payload: {
				param: param
			}
		});
		this.props.onDialogCancel();

	}

}

export default TypeEditView;
