import React, {PureComponent} from 'react';
import {Form, Tag, Input, Popconfirm, Icon, Modal, Button, message} from 'antd';
import * as Data from '../../data/data';
import {isEmpty} from '../../utils/utils';
import ArticleImage from "../../components/ArticleImgage/ArticleImage";
import Style from './Product.less';

const FormItem = Form.Item;
const {TextArea} = Input;

const TAG_TITLE = 1;
const TAG_VALUE = 2;
const TAG_LOGO = 3;

@Form.create()
class ProductTagEdit extends PureComponent {
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
				content: "",
				imageUrl: "",
			}
		} else {
			return {
				index: tag.index,
				title: tag.title,
				content: tag.content,
				imageUrl: tag.imageUrl,
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
							style={{width: 335}}
							value={tag.title} placeholder=""
							onChange={(event) => this.onChange(TAG_TITLE, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="标签值"
					style={{}}
				>
					{getFieldDecorator('content', {
						initialValue: tag.content,
						rules: [{
							required: true, message: '请输入标签值',
						}],
					})(
						<TextArea
							rows="8"
							cols="30"
							value={tag.content} placeholder=""
							onChange={(event) => this.onChange(TAG_VALUE, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="标签图片"
				>{getFieldDecorator('imageUrl', {
					initialValue: tag.imageUrl,
					rules: [{
						required: true, message: '请选择标签图片',
					}],
				})(
					<div className={Style.flexRowVCenter} style={{width: 600}}>
						<Input
							style={{width: 335}}
							value={tag.imageUrl} placeholder=""
							onChange={(event) => this.onChange(TAG_LOGO, event.target.value)}/>
					</div>
				)}
					<ArticleImage
						title="标签图片"
						onUrlChange={(url) => this.onChange(TAG_LOGO, url)}
						url={tag.imageUrl}
					/>
				</FormItem>


				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" onClick={() => this.addOrUpdate()}>
						保存
					</Button>

					{!isEmpty(this.props.tag) &&
					<Popconfirm title="是否要删除该标签？"
					            onConfirm={() => {
						            this.del()
					            }}
					            okText="确定" cancelText="取消">
						<Button
							style={{marginLeft: 40}}
							type="primary" >
							删除
						</Button>
					</Popconfirm>
					}
				</FormItem>

			</Form>
		);
	}

	del() {
		this.props.onTagDel(this.state.tag.index);
	}

	addOrUpdate() {
		if (isEmpty(this.state.tag.title)) {
			message.error('"标签名"不允许为空');
		} else if (isEmpty(this.state.tag.content)) {
			message.error('"标签值"不允许为空');
		} else if (isEmpty(this.state.tag.imageUrl)) {
			message.error('"标签图片"不允许为空');
		} else {
			this.props.onTagEditFinish(this.state.tag);
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
				newTag.content = value;
				break;

			case TAG_LOGO:
				newTag.imageUrl = value;
				break;
		}

		this.setState({
			tag: newTag
		})
	}
}

export default ProductTagEdit;
