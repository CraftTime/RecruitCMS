import React, {Component} from 'react';
import {Tabs, Card, Form, Input, message, Button} from 'antd';
import * as Data from '../../../../data/data';
import {getCultureScorePrice, setCultureScorePrice} from '../../../../services/AppApi';

const FormItem = Form.Item;


const PRICE = 0;
const NUMBER = PRICE + 1;

@Form.create()
class PriceView extends Component {

	constructor(props) {
		super();
		this.state = {
			info: {
			}
		}
	}

	componentDidMount() {
		let that = this;
		getCultureScorePrice().then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					info: response.response
				});
				console.log("文化分测算价格获取成功 info: " + JSON.stringify(response));
			} else {
				console.error("文化分测算价格获取失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			console.error("文化分测算价格获取失败  error: " + JSON.stringify(error));
		});
	}


	render() {
		const {info} = this.state;
		const {getFieldDecorator} = this.props.form;

		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="测算价格"
					style={{}}
				>
					{getFieldDecorator('price', {
						initialValue: info.price,
						rules: [{
							required: true, message: '请输入测算价格',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={info.price} placeholder=""
							onChange={(event) => this.onChange(PRICE, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="每人上限次数"
					style={{}}
				>
					{getFieldDecorator('number', {
						initialValue: info.number,
						rules: [{
							required: true, message: '请输入每人上限次数',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={info.number} placeholder=""
							onChange={(event) => this.onChange(NUMBER, event.target.value)}/>
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

	onChange(type, value) {
		let {info} = this.state;
		let newInfo = {...info};

		switch (type) {
			case PRICE:
				newInfo.price = value;
				break;

			case NUMBER:
				newInfo.number = value;
				break;
		}

		this.setState({
			info: newInfo
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
		let that =this;
		setCultureScorePrice(this.state.info.price, this.state.info.number).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				message.success("文化分测算功能套餐价格设置成功");
			} else {
				message.error("文化分测算功能套餐价格设置失败  error: " + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error("文化分测算功能套餐价格设置失败  error: " + JSON.stringify(error));
		});
	}
}

export default PriceView;
