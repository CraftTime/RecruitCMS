import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card} from 'antd';
import PriceView from './price/PriceView';
import OrderListView from './order/OrderListView';
import RecordListView from './record/RecordListView';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import * as Data from '../../../data/data';


const {TabPane} = Tabs;

@connect(({io}) => ({
	io,
}))
class CultureView extends Component {

	render() {
		const {dispatch} = this.props;
		console.log(' CultureView: ' + JSON.stringify(dispatch));
		return (
			<PageHeaderLayout title="文化分测算" content="">
				<Card bordered={false}>

					<Tabs type="card">
						<TabPane tab="设置测算价钱" key="1">
							<PriceView/>
						</TabPane>

						<TabPane tab="测算订单" key="2">
							<OrderListView
								data={Data.CULTURE_SCORE_ORDERS}
							/>
						</TabPane>

						<TabPane tab="测算记录" key="3">
							<RecordListView
								data={Data.CULTURE_SCORE_TEST_RECORDS}
							/>
						</TabPane>
					</Tabs>

				</Card>
			</PageHeaderLayout>
		);
	}
}

export default CultureView;
