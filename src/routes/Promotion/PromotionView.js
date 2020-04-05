import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import * as Data from '../../data/data';
import PromotionListView from './PromotionListView';


const {TabPane} = Tabs;

class PromotionView extends Component {

	render() {
		return (
			<PageHeaderLayout title='促销抢购' content="">
				<Card bordered={false}>

					<Tabs onChange={(key) => this.callback(key)} type="card">
						<TabPane tab="文化分测算" key={Data.PRODUCT_TYPE_CULTURE}>
							<PromotionListView
								itemId={Data.PRODUCT_TYPE_CULTURE}
							/>
						</TabPane>
						<TabPane tab="录取测算" key={Data.PRODUCT_TYPE_ADMISSION}>
							<PromotionListView
								itemId={Data.PRODUCT_TYPE_ADMISSION}
							/>
						</TabPane>

						<TabPane tab="报考指南" key={Data.PRODUCT_TYPE_GUIDE}>
							<PromotionListView
								itemId={Data.PRODUCT_TYPE_GUIDE}
							/>
						</TabPane>

					</Tabs>

				</Card>
			</PageHeaderLayout>
		);
	}

	callback(key) {
		console.info(' callback key: ' + key);
	}


}

export default PromotionView;
