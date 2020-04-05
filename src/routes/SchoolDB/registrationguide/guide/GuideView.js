import React, {Component} from 'react';
import {Tabs, Table, Modal, Popconfirm, Divider, message, Button} from 'antd';
import SchoolListView from './SchoolListView';
import * as Data from '../../../../data/data';


const {TabPane} = Tabs;

class GuideView extends Component {

	render() {
		return (
			<div>
				<Tabs type="card" onChange={(index) => this.onTabChange(index)}>
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

			</div>
		);
	}

	onTabChange(index) {

		switch (index) {
			case Data.LEVEL_A:
				break;

			case Data.LEVEL_B:
				break;

			case Data.LEVEL_ALL:
				break;
		}

	}

}

export default GuideView;
