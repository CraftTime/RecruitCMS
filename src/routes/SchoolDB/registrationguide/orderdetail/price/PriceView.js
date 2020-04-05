import React, {Component} from 'react';
import {Tabs, Card, Form, Input, message, Button} from 'antd';
import * as Data from '../../../../../data/data';
import {isSuccess} from '../../../../../utils/utils';
import {getApplyGuiderPrice, setApplyGuiderPrice} from '../../../../../services/AppApi';

const FormItem = Form.Item;


const PRICE = 0;
const NUMBER = PRICE + 1;

@Form.create()
class PriceView extends Component {

	constructor(props) {
		super();
		this.state = {
			info: {
				price: 10,
			}
		}
	}

	componentDidMount() {
		let that = this;
		getApplyGuiderPrice().then(function (response) {
			if(isSuccess(response)) {
				that.setState({
					info: {
						price: response.response.price
					}
				});
				console.log("获取报考指南价格成功");
			} else {
				message.error("获取报考指南价格失败 error: " + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error("获取报考指南价格失败 error: " + JSON.stringify(error));
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

				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						提交
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
		let that = this;
		setApplyGuiderPrice(this.state.info.price).then(function (response) {
			if(isSuccess(response)) {
				message.success("设置报考指南价格成功");
			} else {
				message.error("设置报考指南价格失败 error: " + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error("设置报考指南价格失败 error: " + JSON.stringify(error));
		})


	}
}

export default PriceView;
