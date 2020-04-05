import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal} from 'antd';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import SchoolListView from './SchoolListView';
import * as Data from '../../../../data/data';


const {TabPane} = Tabs;

@connect(({io}) => ({
	io,
}))
class SchoolView extends Component {

	render() {
		return (

			<Tabs onChange={(key) => this.callback(key)} type="card">
				<TabPane tab="全部" key="1">
					<SchoolListView
						level={Data.LEVEL_ALL}
					/>
				</TabPane>

				<TabPane tab="A批院校" key="2">
					<SchoolListView
						level={Data.LEVEL_A}
					/>
				</TabPane>

				<TabPane tab="B批院校" key="3">
					<SchoolListView
						level={Data.LEVEL_B}
					/>
				</TabPane>

			</Tabs>

		);
	}

	callback(key) {
		console.info(' callback key: ' + key);
	}


}

export default SchoolView;
