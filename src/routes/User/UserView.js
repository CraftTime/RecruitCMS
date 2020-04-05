import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import UserListView from './list/UserListView';


const {TabPane} = Tabs;

@connect(({io}) => ({
	io,
}))
class SchoolView extends Component {

	render() {
		return (
			<PageHeaderLayout title="用户管理" content="">
				<Card bordered={false}>
					<UserListView/>
				</Card>
			</PageHeaderLayout>
		);
	}

	callback(key) {
		console.info(' callback key: ' + key);
	}


}

export default SchoolView;
