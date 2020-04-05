import React, {PureComponent} from 'react';
import {Form, Tag, Input, Tooltip, Icon, Modal, Button, message} from 'antd';
import * as Data from '../../data/data';
import {isEmpty} from '../../utils/utils';

const FormItem = Form.Item;
const {TextArea} = Input;

const TAG_TITLE = 1;
const TAG_VALUE = 2;
const WIDTH = 400;

class TagEditView extends PureComponent {
	constructor(props) {
		super();

		this.state = {
			tag: this.getTag(props.tag)
		}
	}

	getTag(tag) {
		if (null === tag) {
			return {
				index: -1,
				title: "",
				desc: "",
			}
		} else {
			return {
				index: tag.index,
				title: tag.title,
				desc: tag.desc,
			}
		}

	}

	render() {
		const {tag} = this.state;
		const {getFieldDecorator} = this.props.form;
		return (
			<Form
				hideRequiredMark
				style={{marginTop: 8}}
			>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="标签名"
					style={{}}
				>
					{getFieldDecorator('title', {
						initialValue: tag.title,
						rules: [{
							required: true, message: '请输入标签名',
						}],
					})(
						<Input
							style={{width: WIDTH}}
							value={tag.title} placeholder=""
							onChange={(event) => this.onChange(TAG_TITLE, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="标签值"
					style={{}}
				>
					{getFieldDecorator('desc', {
						initialValue: tag.desc,
						rules: [{
							required: true, message: '请输入标签值',
						}],
					})(
						<TextArea
							rows="15"
							cols="15"
							value={tag.desc} placeholder=""
							onChange={(event) => this.onChange(TAG_VALUE, event.target.value)}/>
					)}
				</FormItem>

				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" onClick={() => this.addOrUpdate()}>
						保存
					</Button>
				</FormItem>

			</Form>
		);
	}


	addOrUpdate() {
		if (isEmpty(this.state.tag.title)) {
			message.error('"标签名"不允许为空');
		} else if (isEmpty(this.state.tag.desc)) {
			message.error('"标签值"不允许为空');
		} else {
			this.props.onDialogDismiss(this.state.tag);
		}

	}


	onChange(type, value) {
		let {tag} = this.state;
		let newTag = {...tag};

		switch (type) {
			case TAG_TITLE:
				newTag.title = value;
				break;

			case TAG_VALUE:
				newTag.desc = value;
				break;
		}

		this.setState({
			tag: newTag
		})
	}
}

export default Form.create({})(TagEditView);
