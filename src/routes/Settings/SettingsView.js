import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {getCustomerInfo, setCustomerInfo, getExamYear, getRemainingDays, setExamYear} from '../../services/AppApi';
import * as Data from '../../data/data';
import moment from 'moment';

const FormItem = Form.Item;

const {TabPane} = Tabs;

class StudioView extends Component {

	componentDidMount() {
	}

	render() {
		return (
			<PageHeaderLayout title="基础配置" content="">
				<Card bordered={false}>

					<Tabs onChange={(key) => this.callback(key)} type="card">
						<TabPane tab="高考时间" key="1">
							<GaoKaoTime/>
						</TabPane>

						{/*<TabPane tab="客服" key="2">*/}
							{/*<Customer/>*/}
						{/*</TabPane>*/}
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

	addOrUpdate() {
		let that = this;
		setExamYear(this.state.year, this.state.month, this.state.day).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				message.success("高考时间设置成功");
				that.refreshRemainingDays();
			} else {
				console.error("高考时间设置失败  error: " + JSON.stringify(response));
				that.refreshRemainingDays();
			}
		}).catch(function (error) {
			console.error("高考时间设置失败  error: " + JSON.stringify(error));
			that.refreshRemainingDays();
		});
	}
}


export default StudioView;
