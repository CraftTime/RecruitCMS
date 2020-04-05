import React, {Component} from 'react';
import {connect} from 'dva';
import {Form, Input, Modal, message, Button} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ArticleImage from "../../components/ArticleImgage/ArticleImage";
import * as Data from '../../data/data';
import Style from './Product.less';
import ProductTag from './ProductTag';
import ProductTagEdit from './ProductTagEdit';
import {isEmpty, isSuccess} from '../../utils/utils';
import {setH5Product} from '../../services/AppApi';

const FormItem = Form.Item;
const {TextArea} = Input;


const NAME = 0;
const DESC = NAME + 1;
const VISIBLE = NAME + 2;
const LOGO = NAME + 10;
const STUDY_FEE = NAME + 11;
const STUDENT_COUNT = NAME + 12;
const READ_COUNT = NAME + 13;
const NEED_PAY = NAME + 14;
const PRICE = NAME + 15;
const VIDEO_URL = NAME + 16;

@Form.create()
class ProductEditView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			product: props.product,
			isShowEditDialog: false,
			tag: null,
		}
	}

	showTagEditDialog(tag) {
		this.setState({
			isShowEditDialog: true,
			tag: tag,
		})
	}

	render() {
		const {product} = this.state;
		let empty = (
			<ProductTag
				onClick={() => this.showTagEditDialog(null)}
				tag={null}
			/>);

		let views = [];
		if (!isEmpty(product.tagList)) {

			for (let index in product.tagList) {
				if (views.length === 3) {
					console.warn(' tag is full ... ');
					break;
				}

				let tag = product.tagList[index];
				let tmpTag = {
					...tag
				};
				tmpTag.index = index;
				let view =
					(<ProductTag
						onClick={() => this.showTagEditDialog(tmpTag)}
						tag={tmpTag}
					/>);
				views.push(view);
			}
		}

		if (views.length < 3) {
			views.push(empty);
		}

		let that = this;
		const {getFieldDecorator} = this.props.form;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>
				{this.state.isShowEditDialog &&
				<Modal
					style={{marginBottom: '30rem'}}
					destroyOnClose="true"
					title={`${this.props.productName}-标签`}
					onCancel={() => this.onDialogCancel()}
					visible={true}
					footer={[]}
				>
					<ProductTagEdit
						onTagEditFinish={(tag) => this.onTagEditFinish(tag)}
						onTagDel={(index) => this.onTagDel(index)}
						tag={this.state.tag}
					/>

				</Modal>
				}

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="商品"
				>
					<text>{that.props.productName}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="商品封面图片"
				>{getFieldDecorator('imageUrl', {
					initialValue: product.imageUrl,
					rules: [{
						required: true, message: '请选择商品封面图片',
					}],
				})(
					<div className={Style.flexRowVCenter} style={{width: 600}}>
						<Input
							style={{width: 335}}
							value={product.imageUrl} placeholder=""
							onChange={(event) => this.onChange(LOGO, event.target.value)}/>
					</div>
				)}
					<ArticleImage
						title="艺考教学视频封面图片"
						onUrlChange={(url) => this.onChange(LOGO, url)}
						url={product.imageUrl}
					/>
				</FormItem>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="商品简介"
				>
					<div className={Style.peTagLayout}>
						{views}
					</div>
				</FormItem>


				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</FormItem>
			</Form>
		);
	}

	onTagDel(index) {
		let newTagList = this.state.product.tagList.filter((tag, i) => parseInt(i) !== parseInt(index));

		let tmpProduct = {
			...this.state.product
		};
		tmpProduct.tagList = newTagList;
		let that = this;
		this.setState({
			product: tmpProduct,
			isShowEditDialog: false,
		});
	}

	onDialogCancel() {
		this.setState({
			isShowEditDialog: false,
		});
	}

	onChange(type, value) {
		let {product} = this.state;
		let newInfo = {...product};
		switch (type) {

			case LOGO:
				newInfo.imageUrl = value;
				break;
		}

		this.setState({
			product: newInfo
		});
	}

	onTagEditFinish(newTag) {
		let {tagList} = this.state.product;
		let tmpTag = {
			...newTag
		};
		delete tmpTag.index;
		let newTags = [];
		if(tagList !== null) {
			newTags = [...tagList];
		}
		if (newTag.index === -1) {
			newTags.push(tmpTag);
		} else {
			newTags[newTag.index] = tmpTag;
		}
		let tmpProduct = {
			...this.state.product
		};
		tmpProduct.tagList = newTags;
		let that = this;
		this.setState({
			product: tmpProduct,
			isShowEditDialog: false,
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.saveProduct();
			}
		});
	}

	saveProduct() {
		const {onEditFinish} = this.props;
		setH5Product(this.props.itemType, this.state.product).then(function (response) {
			if(isSuccess(response)) {
				message.success('商品修改成功');
				if(onEditFinish) {
					onEditFinish();
				}
			} else {
				message.error('商品修改失败 failed: ' + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error('商品修改失败 error: ' + JSON.stringify(error));
		});
	}
}

export default ProductEditView;
