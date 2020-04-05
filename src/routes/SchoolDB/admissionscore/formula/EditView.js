import React, {Component} from 'react';
import {Select, Radio, Form, Input, message, Button, DatePicker} from 'antd';
import * as Data from '../../../../data/data';
import Style from './RateEditView.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {isSuccess} from '../../../../utils/utils';
import {updateOrAddAdmissionFormula} from '../../../../services/AppApi';

moment.locale('zh-cn');
const FormItem = Form.Item;

const FORMULA = 0;
const BASE_CARDINALITY = FORMULA + 1;
const PLUS_CARDINALITY = FORMULA + 2;
const MINUS_CARDINALITY = FORMULA + 5;
const POSITIVE_MIN = FORMULA + 6;
const POSITIVE_MAX = FORMULA + 7;
const POSITIVE_PLUS_CARDINALITY = FORMULA + 8;
const NEGATIVE_MIN = FORMULA + 9;
const NEGATIVE_MAX = FORMULA + 10;
const NEGATIVE_PLUS_CARDINALITY = FORMULA + 11;

@Form.create()
class EditView extends Component {

	constructor(props) {
		super();
		this.state = {
			formula: this.getInfo(props.formula)
		}
	}

	getInfo(info) {
		if (null === info) {
			return {
				id: -1
			}
		} else {
			return info;
		}

	}

	render() {
		const {formula} = this.state;
		const {getFieldDecorator} = this.props.form;

		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="公式"
					style={{}}
				>
					{getFieldDecorator('formula', {
						initialValue: formula.formula,
						rules: [{
							required: true, message: '请填写公式',
						}],
					})(
						<Input
							disabled={this.isReadMode()}
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={formula.formula} placeholder=""
							onChange={(event) => this.onChange(FORMULA, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="标准基数"
					style={{}}
				>
					<Input
						disabled={this.isReadMode()}
						className={Style.rowLayout} value={formula.baseCardinality}
						onChange={(event) => this.onChange(BASE_CARDINALITY, event.target.value)}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="加分基数"
					style={{}}
				>
					<Input
						disabled={this.isReadMode()}
						className={Style.rowLayout} value={formula.plusCardinality}
						onChange={(event) => this.onChange(PLUS_CARDINALITY, event.target.value)}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="减分基数:"
					style={{}}
				>
					<Input
						disabled={this.isReadMode()}
						className={Style.rowLayout} value={formula.minusCardinality}
						onChange={(event) => this.onChange(MINUS_CARDINALITY, event.target.value)}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="正分区间"
					style={{}}
				>
					<div className={Style.rowLayout}>
						<Input
							disabled={this.isReadMode()}
							value={formula.positiveMin}
							onChange={(event) => this.onChange(POSITIVE_MIN, event.target.value)}
						/>
						~
						<Input
							disabled={this.isReadMode()}
							value={formula.positiveMax}
							onChange={(event) => this.onChange(POSITIVE_MAX, event.target.value)}
						/>
					</div>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="正分区间内加分"
					style={{}}
				>
					<Input
						disabled={this.isReadMode()}
						className={Style.rowLayout} value={formula.positivePlusCardinality}
						onChange={(event) => this.onChange(POSITIVE_PLUS_CARDINALITY, event.target.value)}
					/>

				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="负分区间"
					style={{}}
				>
					<div className={Style.flexRow}>
						<Input
							disabled={this.isReadMode()}
							value={formula.negativeMin}
							onChange={(event) => this.onChange(NEGATIVE_MIN, event.target.value)}
						/>
						~
						<Input
							disabled={this.isReadMode()}
							value={formula.negativeMax}
							onChange={(event) => this.onChange(NEGATIVE_MAX, event.target.value)}
						/>

					</div>

				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="负分区间减分"
					style={{}}
				>
					<Input
						disabled={this.isReadMode()}
						className={Style.rowLayout} value={formula.negativePlusCardinality}
						onChange={(event) => this.onChange(NEGATIVE_PLUS_CARDINALITY, event.target.value)}
					/>

				</FormItem>

				{!this.isReadMode() &&
				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</FormItem>
				}
			</Form>
		);
	}

	onChange(type, value) {
		let {formula} = this.state;
		let newInfo = {...formula};

		switch (type) {
			case FORMULA:
				newInfo.formula = value;
				break;

			case BASE_CARDINALITY:
				newInfo.baseCardinality = value;
				break;

			case PLUS_CARDINALITY:
				newInfo.plusCardinality = value;
				break;

			case MINUS_CARDINALITY:
				newInfo.minusCardinality = value;
				break;

			case POSITIVE_MIN:
				newInfo.positiveMin = value;
				break;

			case POSITIVE_MAX:
				newInfo.positiveMax = value;
				break;

			case POSITIVE_PLUS_CARDINALITY:
				newInfo.positivePlusCardinality = value;
				break;

			case NEGATIVE_MIN:
				newInfo.negativeMin = value;
				break;

			case NEGATIVE_MAX:
				newInfo.negativeMax = value;
				break;

			case NEGATIVE_PLUS_CARDINALITY:
				newInfo.negativePlusCardinality = value;
				break;
		}

		this.setState({
			formula: newInfo
		});

	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		let roledi = getFieldValue('roleid');
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.updateInfo();
			} else {
				console.log(' user input data is invalied ... ');
			}
		});
	}

	updateInfo() {
		let that = this;
		updateOrAddAdmissionFormula(this.state.formula).then(function (response) {
			if (isSuccess(response)) {
				message.success("录取测算公式操作成功");
				that.props.onDialogDismiss();
			} else {
				message.error("录取测算公式操作失败 error: " + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error("录取测算公式操作失败 error: " + JSON.stringify(error));
		})
	}

	isReadMode() {
		return Data.FORMULA_VIEW_MODE_RO === this.props.mode;
	}
}

EditView.defaultProps = {
	mode: Data.FORMULA_VIEW_MODE_RW
};

export default EditView;
