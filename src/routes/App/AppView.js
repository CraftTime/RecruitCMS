import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import * as Data from '../../data/data';
import moment from 'moment';
import AboutListView from './AboutListView';
import Style from './style.less';

const FormItem = Form.Item;

const {TabPane} = Tabs;

class OptionsView extends Component {

	componentDidMount() {
	}

	render() {
		return (
			<PageHeaderLayout title="软件信息" content="">
				<Card bordered={false}>
					<Tabs onChange={(key) => this.callback(key)} type="card">
						<TabPane tab="关于" key="1">
							<AboutListView/>
						</TabPane>
					</Tabs>
				</Card>
			</PageHeaderLayout>
		);
	}
}

export default OptionsView;
