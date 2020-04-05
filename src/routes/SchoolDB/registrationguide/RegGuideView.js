import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import GuideView from './guide/GuideView';
import OrderView from './orderdetail/OrderView';

const {TabPane} = Tabs;

@connect(({io}) => ({
	io,
}))
class CultureView extends Component {

	render() {
		return (
			<PageHeaderLayout title="报考指南" content="">
				<Card bordered={false}>

					<Tabs type="card">
						<TabPane tab="学校指南" key="1">
							<GuideView/>
						</TabPane>

						<TabPane tab="订单详情" key="2">
							<OrderView/>
						</TabPane>

					</Tabs>

				</Card>
			</PageHeaderLayout>
		);
	}
}

export default CultureView;
