import React, {Component, Fragment} from 'react';
import {connect} from 'dva';

import {
	Row,
	Col,
	Checkbox,
	Form,
	Input,
	DatePicker,
	message,
	Switch,
	Select,
	Button,
	Card,
	Tooltip,
	Radio,
	Modal,
	Spin
} from 'antd';
import * as Data from '../../data/data';
import * as DateUtils from '../../utils/DateUtils';
import {isSuccess, isEmpty} from '../../utils/utils';
import Style from './../../css/common.less';
import {addOrUpdatePromotion} from '../../services/AppApi';
import moment from 'moment';

const FormItem = Form.Item;

const BEGIN_TIME = "begin_time";
const END_TIME = "end_time";


@Form.create()
class EditView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isShowDialog: false,
			promotion: this.getInfo(props.promotion)
		}

	}


	getInfo(promotion) {
		let param = {};
		if (!isEmpty(promotion)) {
			param = {...promotion};
		} else {
			param.beginTime = Date.parse(new Date());
			param.endTime = Date.parse(new Date());
		}
		param.itemId = this.props.itemId;
		return param;
	}

	isAdd() {
		return isEmpty(this.props.promotion);
	}

	render() {
		const {getFieldDecorator, getFieldValue} = this.props.form;
		const {school} = this.props;
		const {promotion} = this.state;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="商品名"
					style={{}}
				>
					{!this.isAdd() &&
						<text>{Data.PRODUCT_TTILE_MAP.get(promotion.itemId)}</text>
					}

					{this.isAdd() &&
					<Select defaultValue={promotion.itemId} onChange={(val) => this.onProductChange(val)}>
						<Option
							value={Data.PRODUCT_TYPE_CULTURE}>{Data.PRODUCT_TTILE_MAP.get(Data.PRODUCT_TYPE_CULTURE)}</Option>
						<Option
							value={Data.PRODUCT_TYPE_ADMISSION}>{Data.PRODUCT_TTILE_MAP.get(Data.PRODUCT_TYPE_ADMISSION)}</Option>
						<Option
							value={Data.PRODUCT_TYPE_GUIDE}>{Data.PRODUCT_TTILE_MAP.get(Data.PRODUCT_TYPE_GUIDE)}</Option>
					</Select>

					}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="抢购价"
					hasFeedback
				>
					{getFieldDecorator('salePrice', {
						initialValue: promotion.salePrice,
						rules: [{
							required: true, message: '请输入抢购价',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}} placeholder="请输入抢购价"/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="总数量"
					hasFeedback
				>
					{getFieldDecorator('saleNumber', {
						initialValue: promotion.saleNumber,
						rules: [{
							required: true, message: '请输入总数量',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}} placeholder="请输入总数量"/>
					)}
				</FormItem>

				{!this.isAdd() &&
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="剩余数量"
					hasFeedback
				>

					<text>{promotion.remainNumber}</text>

				</FormItem>
				}

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="开始时间"
					hasFeedback
				>
					<DatePicker
						format="YYYY-MM-DD HH:mm:ss"
						defaultValue={ moment(DateUtils.getFormatDate(promotion.beginTime), "YYYY-MM-DD HH:mm:ss")}
						showTime
						placeholder="Select Time"
						onChange={(date, str) => this.onDateChange(date, str)}
						onOk={(value) => this.onDateSelect(BEGIN_TIME, value)}/>

				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="结束时间"
					hasFeedback
				>
					<DatePicker
						format="YYYY-MM-DD HH:mm:ss"
						defaultValue={ moment(DateUtils.getFormatDate(promotion.endTime), "YYYY-MM-DD HH:mm:ss")}
						showTime
						placeholder="Select Time"
						onChange={(date, str) => this.onDateChange(date, str)}
						onOk={(value) => this.onDateSelect(END_TIME, value)}/>

				</FormItem>


				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</FormItem>
			</Form>
		);
	}

	onProductChange(value) {
		let promotion = {...this.state.promotion};
		promotion.itemId = value;
		this.setState({promotion});
	}


	/**
	 *
	 * @param date 是moment类型
	 * @param str
	 */
	onDateSelect(type, millisecond) {
		console.log(' bingo onDateSelect millisecond: ' + moment(millisecond).valueOf())
		let that = this;
		let promotion = {...this.state.promotion};
		let second = moment(millisecond).valueOf();
		switch (type) {
			case END_TIME:
				promotion.endTime = second;
				break;
			case BEGIN_TIME:
				promotion.beginTime = second;
				break;
		}
		this.setState({
			promotion: promotion
		});
	}

	onDateChange(date, str) {
		console.info(' bingo  onDateChange: ' + str)
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.addOrUpdate();
			} else {
				console.log(' user input data is invalid ... ');
			}
		});
	}

	addOrUpdate() {
		const {getFieldProps, getFieldValue} = this.props.form;
		let param = {
			id: isEmpty(this.props.promotion) ? -1 : this.props.promotion.id,
			itemId: this.state.promotion.itemId,
			saleNumber: getFieldValue('saleNumber'),
			salePrice: getFieldValue('salePrice'),

			beginTime: this.state.promotion.beginTime,
			endTime: this.state.promotion.endTime
		};
		const actionTitle = isEmpty(this.props.promotion) ? "新增" : "编辑";
		let {onDialogDismiss} = this.props;
		addOrUpdatePromotion(param).then(function (response) {
			if (isSuccess(response)) {
				if (onDialogDismiss) {
					onDialogDismiss();
				}
				message.success(actionTitle + "抢购促销操作成功");
			} else {
				message.error(actionTitle + "抢购促销操作失败 failed:  " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(actionTitle + "抢购促销失败 error: " + JSON.stringify(error));
		});
	}

	showProfessionalSelectDialog() {
		this.setState({
			isShowDialog: true,
		})
	}

	onDialogDismiss() {
		this.setState({
			isShowDialog: false,
		})
	}

	onProfessionalSelect(profession) {

		let newProfessional = {...this.state.professional};
		newProfessional.professionalId = profession.id;
		newProfessional.professionalName = profession.name;

		this.setState({
			isShowDialog: false,
			professional: newProfessional
		})
	}

}

export default EditView;
