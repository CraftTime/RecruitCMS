import React, {Component} from 'react';
import {Tabs, Radio, Form, Input, message, Button, DatePicker} from 'antd';
import * as Data from '../../../../data/data';
import * as DateUtils from '../../../../utils/DateUtils';
import {isSuccess, isUnpay} from '../../../../utils/utils';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {updateAdmissionOrder} from '../../../../services/AppApi';

moment.locale('zh-cn');
const FormItem = Form.Item;


const WEN_LI_TYPE_COUNT = 1;
const CULTURE_COUNT = WEN_LI_TYPE_COUNT + 2;
const PROFESSION_COUNT = WEN_LI_TYPE_COUNT + 3;
const FOREIGN_COUNT = WEN_LI_TYPE_COUNT + 4;
const STATUS = WEN_LI_TYPE_COUNT + 5;
const PAYMENT = WEN_LI_TYPE_COUNT + 6;

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
					label="用户名"
					style={{}}
				>
					<text>{order.username}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="订单金额(元)"
					style={{}}
				>
					{
						isUnpay(this.props.order.status) ?
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
						{isUnpay(this.props.order.status) &&
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
			case CULTURE_COUNT:
				newOrder.admissionRateCultureCount = value;
				break;

			case FOREIGN_COUNT:
				newOrder.admissionRateForeignCount = value;
				break;

			case PROFESSION_COUNT:
				newOrder.admissionRateProfessionalCount = value;
				break;

			case WEN_LI_TYPE_COUNT:
				newOrder.admissionRateCourseCount = value;
				break;

			case STATUS:
				newOrder.status = value;
				break;

			case PAYMENT:
				newOrder.payment = value;
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
		let that = this;
		updateAdmissionOrder(this.state.order).then(function (response) {
			if (isSuccess(response)) {
				message.success("录取测算订单操作成功");
				that.props.onDialogDismiss();
			} else {
				message.error("录取测算订单操作失败 error: " + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error("录取测算订单操作失败 error: " + JSON.stringify(error));
		})
	}
}

export default EditView;
