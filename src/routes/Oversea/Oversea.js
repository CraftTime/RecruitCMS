import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal, Form ,Input, Button} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SignListView from './list/SignListView';
import {getSignPrice, updateSignPrice} from '../../services/AppApi';
import * as Data from '../../data/data';


const {TabPane} = Tabs;
const FormItem = Form.Item;

class Oversea extends Component {

	render() {
		return (
			<PageHeaderLayout title="海外留学" content="">
				<Card bordered={false}>


					<Tabs onChange={(key) => this.callback(key)} type="card">
						<TabPane tab="订单列表" key="1">
							<SignListView/>
						</TabPane>

						<TabPane tab="费用设置" key="2">
							<GaoKaoTime/>
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
class GaoKaoTime extends Component {
	constructor(props) {
		super();

		this.state = {
			price: 0.0
		}
	}

	componentDidMount() {
		this.refreshPrice();
	}

	refreshPrice() {
		let that = this;
		getSignPrice().then(function (response) {
			if (Data.API_STATUS_SUCCESS_2 === response.statusCode) {
				that.setState({
					price: response.data
				});
				console.log("外海留学价格获取成功 info: " + JSON.stringify(response));
			} else {
				console.error("外海留学价格获取失败  error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			console.error("高考时间获取失败  error: " + JSON.stringify(error));
		});
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="报名费用(元)"
					style={{}}
				>
					{getFieldDecorator('price', {
						initialValue: this.state.price,
						rules: [{
							required: true, message: '请输入报名费用',
						}],
					})(
						<Input value={this.state.price} placeholder="费用"/>
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
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.addOrUpdate(getFieldValue('price'));
			} else {
				console.log(' user input data is invalid ... ');
			}
		});
	}

	addOrUpdate(price) {
		let that = this;
		let param = {
			price: price
		};
		updateSignPrice(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS_2 === response.statusCode) {
				message.success("报名费用设置成功");
				that.refreshPrice();
			} else {
				console.error("报名费用设置失败  error: " + JSON.stringify(response));
				that.refreshPrice();
			}
		}).catch(function (error) {
			console.error("报名费用设置失败  error: " + JSON.stringify(error));
			that.refreshPrice();
		});
	}
}

export default Oversea;
