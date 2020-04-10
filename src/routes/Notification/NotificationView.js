import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import * as Data from '../../data/data';
import moment from 'moment';
import NotificationListView from './NotificationListView';
import AboutListView from "../App/AboutListView";

const FormItem = Form.Item;

const {TabPane} = Tabs;

class NotificationView extends Component {

	componentDidMount() {
	}

	render() {
		return (
			<PageHeaderLayout title="通知管理" content="">
				<Card bordered={false}>
					<Tabs onChange={(key) => this.callback(key)} type="card">
						<TabPane tab="通知" key="1">
							<NotificationListView />
						</TabPane>

						<TabPane tab="推送" key="2">
							<div>开发中</div>
						</TabPane>
					</Tabs>
				</Card>
			</PageHeaderLayout>
		);
	}

	callback(index) {

	}
}

export default NotificationView;
