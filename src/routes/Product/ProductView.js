import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import * as Data from '../../data/data';
import {isSuccess} from '../../utils/utils';
import Style from './Product.less';
import ProductCard from './ProductCard';
import ProductEditView from './ProductEditView';
import {getH5Product} from '../../services/AppApi';


class ProductView extends Component {


	state = {
		isShowDialog: false,
		cultureProduct: {},
		admissionProduct: {},
		guideProduct: {},
		itemType: Data.PRODUCT_TYPE_GUIDE
	};

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		let that = this;

		this.getH5Product(Data.PRODUCT_TYPE_CULTURE, function (product) {
			that.setState({
				cultureProduct: product
			})
		});


		this.getH5Product(Data.PRODUCT_TYPE_ADMISSION, function (product) {
			that.setState({
				admissionProduct: product
			})
		});

		this.getH5Product(Data.PRODUCT_TYPE_GUIDE, function (product) {
			that.setState({
				guideProduct: product
			})
		});
	}

	getH5Product(itemType, callback) {
		getH5Product(itemType).then(function (response) {
			if (isSuccess(response)) {
				console.log(' 获取H5商品成功');
				if (callback) {
					callback(response.response);
				}
			} else {
				message.error(' 获取H5商品失败 failed: ' + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error(' 获取H5商品失败 error: ' + JSON.stringify(error));
		});
	}

	render() {
		const {isShowDialog, cultureProduct, admissionProduct, guideProduct} = this.state;
		return (
			<PageHeaderLayout title="H5商品" content="">
				{isShowDialog &&
				<Modal
					style={{marginBottom: '30rem'}}
					destroyOnClose="true"
					title="商品编辑"
					width={820}
					onCancel={() => this.onDialogCancel()}
					visible={true}
					footer={[]}
				>
					<ProductEditView
						product={this.state.editProduct}
						productName={this.state.productName}
						itemType={this.state.itemType}
						onEditFinish={()=> this.onEditFinish()}
					/>

				</Modal>
				}
				<Card bordered={false}>

					<div className={Style.rootLayout}>
						<ProductCard
							onClick={() => this.onShowEditDialog(cultureProduct, "文化分测算", Data.PRODUCT_TYPE_CULTURE)}
							product={cultureProduct}
							productName="文化分测算"
						/>

						<ProductCard
							onClick={() => this.onShowEditDialog(admissionProduct, "录取测算", Data.PRODUCT_TYPE_ADMISSION)}
							product={admissionProduct}
							productName="录取测算"
						/>

						<ProductCard
							onClick={() => this.onShowEditDialog(guideProduct, "报考指南", Data.PRODUCT_TYPE_GUIDE)}
							product={guideProduct}
							productName="报考指南"
						/>
					</div>

				</Card>

			</PageHeaderLayout>
		);
	}

	onShowEditDialog(product, productName, itemType) {
		this.setState({
			isShowDialog: true,
			editProduct: product,
			productName: productName,
			itemType: itemType
		})
	}


	onDialogCancel() {
		this.setState({
			isShowDialog: false,
		});
	}

	onEditFinish() {
		let that = this;
		this.setState({
			isShowDialog: false,
		}, function () {
			that.refresh();
		});
	}

}

export default ProductView;
