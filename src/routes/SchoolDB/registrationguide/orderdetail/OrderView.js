import React, {Component} from 'react';
import {Tabs, Table, Modal, Popconfirm, Divider, message, Button} from 'antd';
import PriceView from './price/PriceView';
import OrderListView from './orderlist/OrderListView';
import * as Data from '../../../../data/data';

const {TabPane} = Tabs;

class GuideView extends Component {

	render() {
		return (
			<div>

				<Tabs type="card">
					<TabPane tab="报考指南价格" key="1">
						<PriceView/>
					</TabPane>

					<TabPane tab="报考指南订单" key="2">
						<OrderListView
							data={Data.CULTURE_SCORE_TEST_RECORDS}
						/>
					</TabPane>
				</Tabs>

			</div>
		);

	}
}

export default GuideView;
