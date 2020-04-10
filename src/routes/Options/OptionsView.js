import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {getCustomerInfo, setCustomerInfo, getExamYear, getRemainingDays, setExamYear} from '../../services/AppApi';
import * as Data from '../../data/data';
import moment from 'moment';
import CityListView from './CityListView';
import AgeListView from './Age/AgeListView';
import PositionListView from './position/PositionListView';
import IndustryListView from './industry/IndustryListView';
import TreatmentListView from './treatment/TreatmentListView';
import WorkDateListView from './workdate/WorkDateListView';
import ScaleListView from './scale/ScaleListView';
import SalaryListView from './salary/SalaryListView';

const FormItem = Form.Item;

const {TabPane} = Tabs;

class OptionsView extends Component {

	componentDidMount() {
	}

	render() {
		return (
			<PageHeaderLayout title="选项目管理" content="">
				<Card bordered={false}>

					<Tabs onChange={(key) => this.callback(key)} type="card">
						<TabPane tab="城市" key="1">
							<CityListView />
						</TabPane>

						<TabPane tab="年龄" key="2">
							<AgeListView />
						</TabPane>

						<TabPane tab="行业" key="3">
							<IndustryListView />
						</TabPane>

						<TabPane tab="职业" key="4">
							<PositionListView/>
						</TabPane>

						<TabPane tab="学历" key="5">
							<TreatmentListView/>
						</TabPane>

						<TabPane tab="待遇" key="6">
							<TreatmentListView/>
						</TabPane>

						<TabPane tab="工作经验" key="7">
						</TabPane>

						<TabPane tab="工作时间" key="8">
							<WorkDateListView/>
						</TabPane>

						<TabPane tab="公司规模" key="9">
							<ScaleListView/>
						</TabPane>

						<TabPane tab="薪资待遇" key="10">
							<SalaryListView />
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

@Form.create()
class Customer extends Component {
	constructor(props) {
		super();

		this.state = {
			telephone: '',
		}
	}

	componentDidMount() {
		let that = this;
		getCustomerInfo().then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					telephone: response.response
				});
				console.log("客服电话获取成功 info: " + JSON.stringify(response));
			} else {
				console.error("客服电话获取失败  error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			console.error("客服电话获取失败  error: " + JSON.stringify(error));
		});
	}

	render() {
		let that = this;
		const {getFieldDecorator} = this.props.form;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="客户电话"
				>
					{getFieldDecorator('telephone', {
						initialValue: that.state.telephone,
						rules: [{
							required: true, message: '请输入客服电话',
						}],
					})(
						<Input value={that.state.telephone} placeholder="客服电话"/>
					)}
				</FormItem>


				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						设置
					</Button>
				</FormItem>

			</Form>
		);
	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		let telephone = getFieldValue('telephone');
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.addOrUpdate(telephone);
			} else {
				console.log(' user input data is invalid ... ');
			}
		});
	}

	addOrUpdate(telephone) {
		setCustomerInfo(telephone).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				message.success("客服手机设置成功");
			} else {
				console.error("客服手机设置失败  error: " + JSON.stringify(response));
			}
		}).catch(function (error) {
			console.error("客服手机设置失败  error: " + JSON.stringify(error));
		});
	}
}

@Form.create()
class GaoKaoTime extends Component {
	constructor(props) {
		super();

		this.state = {
			year: "1970",
			month: '1',
			day: "1",
			remainder: ""
		}
	}

	componentDidMount() {
		let that = this;
		getExamYear().then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					year: response.response.year,
					month: response.response.month,
					day: response.response.day,
				});
				console.log("高考时间获取成功 info: " + JSON.stringify(response));
			} else {
				console.error("高考时间获取失败  error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			console.error("高考时间获取失败  error: " + JSON.stringify(error));
		});
		this.refreshRemainingDays();
	}

	refreshRemainingDays() {
		let that = this;
		getRemainingDays().then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					remainder: response.response
				});
				console.log("高考倒计时间取成功 info: " + JSON.stringify(response));
			} else {
				console.error("高考倒计时间获取失败  error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			console.error("高考倒计时间获取失败  error: " + JSON.stringify(error));
		});

	}

	render() {
		let date = this.state.year + "-" + this.state.month + "-" + this.state.day;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="高考倒计时"
					style={{}}
				>
					<text>{this.state.remainder}天</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="高考时间"
					style={{}}
				>
					<DatePicker
						value={moment(date, 'YYYY-MM-DD')}
						onChange={(data, dataString) => this.onChange(data, dataString)}
					/>
				</FormItem>

				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						设置
					</Button>
				</FormItem>

			</Form>
		);
	}

	onChange(data, dataString) {
		this.setState({
			year: data.format('YYYY'),
			month: data.format('MM'),
			day: data.format('DD'),
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.addOrUpdate();
			} else {
				console.log(' user input data is invalid ... ');
			}
		});
	}
}


export default OptionsView;
