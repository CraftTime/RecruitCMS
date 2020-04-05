import React, {Component} from 'react';
import {Tabs, Radio, Form, Input, message, Button, DatePicker} from 'antd';
import * as Data from '../../../../../data/data';
import * as DateUtils from '../../../../../utils/DateUtils';
import {isSuccess, isUnpay} from '../../../../../utils/utils';
import {setApplyGuiderOrder} from '../../../../../services/AppApi';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const FormItem = Form.Item;


const PRICE = 0;
const STATUS = PRICE + 1;
const NUMBER = PRICE + 2;
const CREATE_TIME = PRICE + 3;
const PAY_TIME = PRICE + 4;


@Form.create()
class EditView extends Component {

	constructor(props) {
		super();
		this.state = {
			order: props.order
		}
	}

	render() {
		const {order} = this.state;
		const {getFieldDecorator} = this.props.form;

		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="订单金额(元)"
					style={{}}
				>
					{
						isUnpay( this.props.order.status) ?
						(getFieldDecorator('payment', {
							initialValue: order.payment,
							rules: [{
								required: true, message: '请输入订单金额',
							}],
						})(
							<Input
								style={{width: Data.FORM_ITEM_WIDTH}}
								value={order.payment} placeholder=""
								onChange={(event) => this.onChange(PRICE, event.target.value)}/>
						))
							: (<text>{order.payment}</text>)

					}
				</FormItem>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="订单状态"
					hasFeedback
				>
					<Radio.Group
						onChange={(event) => this.onChange(STATUS, event.target.value)}
						defaultValue={order.status}
						value={order.status}>

						<Radio value={Data.STATUS_PAID}>已付款</Radio>
						{isUnpay( this.props.order.status) &&
						<Radio value={Data.STATUS_UNPAID}>待付款</Radio>
						}
					</Radio.Group>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="创建时间"
					style={{}}
				>
					<text>{DateUtils.getFormatCNDate(order.gmtCreated)}</text>
				</FormItem>
				{Data.STATUS_PAID === order.status &&
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="支付时间"
					style={{}}
				>
					<text>{DateUtils.getFormatCNDate(order.paymentTime)}</text>
				</FormItem>
				}
				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</FormItem>
			</Form>
		);
	}

	onPickerOkClick() {
		message.success(' onPickerOkClick ');
	}

	onChange(type, value) {
		let {order} = this.state;
		let newOrder = {...order};

		switch (type) {
			case PRICE:
				newOrder.payment = value;
				break;

			case STATUS:
				newOrder.status = value;
				break;
		}

		this.setState({
			order: newOrder
		});

	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.updatePriceInfo();
			} else {
				console.log(' user input data is invalied ... ');
			}
		});
	}

	updatePriceInfo() {
		let info = {
			admissionRateCourseCount: 0,
			admissionRateCultureCount: 0,
			admissionRateForeignCount: 0,
			admissionRateProfessionalCount: 0,
			cultureCalculateCount: 0,
			id: this.state.order.id,
			payment: parseFloat(this.state.order.payment),
			status: this.state.order.status,
		};
		let that = this;
		setApplyGuiderOrder(info).then(function (response) {
			if (isSuccess(response)) {
				message.success("报考指南订单操作成功");
				that.props.onDialogDismiss();
			} else {
				message.error("报考指南订单操作失败 error: " + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error("报考指南订单操作失败 error: " + JSON.stringify(error));
		})
	}
}

export default EditView;
