import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal, Button} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import ImportDataView from './ImportDataView';
import OuputDataView from './ExportDataView';

const {TabPane} = Tabs;

class IODataView extends Component {

	render() {
		return (
			<PageHeaderLayout title="导入导出" content="">
				<Card bordered={false}>

					<Tabs  type="card">
						<TabPane tab="导入" key="1">
							<ImportDataView/>
						</TabPane>
						<TabPane tab="导出" key="2">
							<OuputDataView/>
						</TabPane>
					</Tabs>
				</Card>
			</PageHeaderLayout>
		);
	}
}

export default IODataView;
