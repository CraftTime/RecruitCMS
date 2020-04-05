import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import SchoolListView from './schoollist/SchoolListView';
import OrderListView from './order/OrderListView';
import FormulaListView from './formula/FormulaListView';
import TeacherListView from './teacher/TeacherListView';
import * as Data from '../../../data/data';
import RateView from './rate/RateView';
import SchoolView from './schoollist/SchoolView';

const {TabPane} = Tabs;

@connect(({io}) => ({
	io,
}))
class CultureView extends Component {

	render() {
		return (
			<PageHeaderLayout title="录取分测算" content="">
				<Card bordered={false}>

					<Tabs type="card">
						<TabPane tab="录取设置" key="1">
							<SchoolView
							/>
						</TabPane>

						<TabPane tab="公式|基数" key="2">
							<FormulaListView
							/>
						</TabPane>

						<TabPane tab="基础配置" key="3">
							<RateView/>
						</TabPane>

						<TabPane tab="订单详情" key="4">
							<OrderListView
								data={Data.ADMISSION_CALC_TEST_ORDER}
							/>
						</TabPane>

						{/*<TabPane tab="老师邀请" key="3" >*/}
							{/*<TeacherListView*/}
								{/*data={Data.TEACHER_INVITATION_RECORDS}*/}
							{/*/>*/}
						{/*</TabPane>*/}
					</Tabs>
				</Card>

			</PageHeaderLayout>
		);
	}
}

export default CultureView;
