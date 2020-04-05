import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import SchoolListView from './SchoolListView';
import * as Data from '../../../data/data';


const {TabPane} = Tabs;

@connect(({io}) => ({
	io,
}))
class SchoolView extends Component {

	render() {
		return (
			<PageHeaderLayout title="院校管理" content="">
				<Card bordered={false}>

					<Tabs onChange={(key) => this.callback(key)} type="card">
						<TabPane tab="全部" key={Data.LEVEL_ALL}>
							<SchoolListView
								type={Data.LEVEL_ALL}
							/>
						</TabPane>
						<TabPane tab="A批院校" key={Data.LEVEL_A}>
							<SchoolListView
								type={Data.LEVEL_A}
							/>
						</TabPane>

						<TabPane tab="B批院校" key={Data.LEVEL_B}>
							<SchoolListView
								type={Data.LEVEL_B}
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

export default SchoolView;
