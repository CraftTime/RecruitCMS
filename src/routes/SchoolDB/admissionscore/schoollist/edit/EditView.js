import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import RateEditView from './rate/RateEditView';
import FormulaView from '../../formula/EditView';

import {
	Row,
	Col,
	Checkbox,
	Form,
	Input,
	DatePicker,
	message,
	Upload,
	Select,
	Button,
	Card,
	Tooltip,
	Radio,
	Modal,
	Collapse,
	Spin
} from 'antd';
import * as Data from '../../../../../data/data';
import {
	getProfessionalInfo,
	getProfessionalFormulaInfo,
	getProfessionalFormulaDetailInfo,
	updateProfessionalFormula
} from '../../../../../services/AppApi';
import {isSuccess} from '../../../../../utils/utils';
import Style from './EditView.less';
import FormulaListView from "../../formula/FormulaListView";

const {Panel} = Collapse;
const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;

const SCHOOL_NAME = 0;
const PROFESSION_NAME = SCHOOL_NAME + 1;
const FILING_RULES = PROFESSION_NAME + 2;  //投档规则
const LIBERAL_CULTURE_LINE = PROFESSION_NAME + 3;
const SCIENCE_CULTURE_LINE = PROFESSION_NAME + 4;
const PROFESSION_SCORE_LINE = PROFESSION_NAME + 5;

const RANK = SCHOOL_NAME + 3;
const WEBSITE = SCHOOL_NAME + 4;

const FORMULA_DETAIL = 1;
const FORMULA_LIST = 2;

@Form.create()
class EditView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			baseInfo: {},
			srcFormulaInfo: {},
			formulaInfo: new Map([]),
			panelList: [],
			isShowModel: false,
			modeType: FORMULA_DETAIL,
			isLoadingFormulaDetail: false,
			detailFormula: null,
			clickFormulaId: -1,
			isLoading: false
		};

	}

	refresh() {
		let that = this;
		getProfessionalInfo(this.props.school.id, this.props.professional.professionalId).then(function (response) {
			if (isSuccess(response)) {
				that.setState({
					baseInfo: response.response
				});
			} else {
				message.error(' 录取测算专业基础信息获取失败 error: ' + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error(' 录取测算专业基础信息获取失败 error: ' + JSON.stringify(error));
		});

		getProfessionalFormulaInfo(this.props.school.id, this.props.professional.professionalId).then(function (response) {
			if (isSuccess(response)) {
				let param = that.collectionFormulaInfo(response.response);
				that.setState({
					srcFormulaInfo: response.response,
					formulaInfo: param.formulaInfo,
					panelList: param.panelList
				});
			} else {
				message.error(' 录取测算专业详情信息获取失败 error: ' + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error(' 录取测算专业详情信息获取失败1 error: ' + JSON.stringify(error));
		});
	}

	componentDidMount() {
		this.refresh()
	}

	collectionFormulaInfo(info) {

		const map = new Map([]);
		const panelMap = new Map([]);

		for (let index in info.data) {
			let item = info.data[index];
			let key = item.year;

			let itemView = (
				<div style={{marginBottom: '10px'}}>
					<text>{item.type}</text>
					<Tooltip title="点击查看基数" placement="left">
						<Button loading={this.state.isLoadingFormulaDetail} className={Style.input}
						        onClick={() => this.showFormulaDetail(item.info.id)}>{item.info.formula}</Button>
					</Tooltip>

					<Tooltip title="点击修改公式" placement="right">
					<Button onClick={()=> this.onSelectFormula(item.info.id)} className={Style.editBtn}>编辑</Button>
					</Tooltip>
				</div>
			);

			if (!map.has(key)) {
				let list = [];
				let panelList = [];
				map.set(key, list);
				panelMap.set(key, panelList);
			}
			map.get(key).push(item);
			panelMap.get(key).push(itemView);
		}

		let len = map.size;
		let keys = map.keys();
		let panelList = [];

		for (let i = 0; i < len; i++) {
			let key = keys.next().value;
			let panel = (
				<Panel header={key+ '年'} key={key}>
					{panelMap.get(key)}
				</Panel>
			);
			panelList.push(panel);
		}

		let param = {
			formulaInfo: map,
			panelList: panelList
		};

		return param;
	}

	onSelectFormula(id) {
		this.setState({
			modeType: FORMULA_LIST,
			isShowModel: true,
			clickFormulaId: id
		});
	}

	showFormulaDetail(formulaId) {
		let that = this;
		this.setState({
			isLoadingFormulaDetail: true
		}, function () {
			getProfessionalFormulaDetailInfo(formulaId).then(function (response) {
				if (isSuccess(response)) {
					console.log(' 获取公式详情成功');
					that.setState({
						modeType: FORMULA_DETAIL,
						isLoadingFormulaDetail: false,
						isShowModel: true,
						detailFormula: response.response
					});
				} else {
					message.error(' 获取公式详情失败 error: ' + JSON.stringify(response));
					that.setState({
						isLoadingFormulaDetail: false,
					});
				}
			}).catch(function (error) {
				message.error(' 获取公式详情失败 error: ' + JSON.stringify(error));
				that.setState({
					isLoadingFormulaDetail: false,
				});
			});
		});

	}

	render() {
		const {schoolInfo, baseInfo, formulaInfo, panelList, srcFormulaInfo} = this.state;
		const {getFieldDecorator} = this.props.form;

		const text = '1';

		const actionTitle = FORMULA_DETAIL === this.state.modeType ? '公式|基数详情' : '公式列表';
		return (
			<Form
				hideRequiredMark
				style={{marginTop: 8}}
			>
				{
					this.state.isLoading &&
					<center><Spin size="large" /></center>

				}
				{this.state.isShowModel &&
				<Modal
					destroyOnClose="true"
					title={actionTitle}
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					footer={[]}
				>
					{this.getOpView()}

				</Modal>
				}

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="学校名称"
					style={{}}
				>
					<text>{baseInfo.schoolName}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="专业名称"
					hasFeedback
				>
					<text>{baseInfo.professionalName}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="录取规则:"
					hasFeedback
				>
					<Collapse
						style={{width: '400px'}}
						bordered={true} defaultActiveKey={['2019', '2018', '2017']}

					          onChange={(key) => this.callback(key)}>
						{panelList}
					</Collapse>
				</FormItem>


				{/*<FormItem*/}
					{/*{...Data.FORM_ITEM_LAYOUT}*/}
					{/*label="投档规则"*/}
					{/*hasFeedback*/}
				{/*>*/}
					{/*<text>{'暂未提供'}</text>*/}
				{/*</FormItem>*/}

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="文科文化分批次线"
					hasFeedback
				>
					<text>{baseInfo.liberalCultureScoreBase}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="理科文化分批次线"
					hasFeedback
				>
					<text>{baseInfo.scienceCultureScoreBase}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="专业分批次线"
					hasFeedback
				>
					<text>{baseInfo.professionalScoreBase}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="外语批次线"
					hasFeedback
				>
					<text>{baseInfo.foreignLanguageScoreBase}</text>
				</FormItem>


				{/*<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>*/}
				{/*<Button type="primary" htmlType="submit">*/}
				{/*提交*/}
				{/*</Button>*/}
				{/*</FormItem>*/}
			</Form>
		);
	}

	callback(key) {

	}

	onChange(type, value) {
		message.info(" onChange value: " + JSON.stringify(value));
		let {schoolInfo} = this.state;
		let newInfo = {...schoolInfo};

		this.setState({
			schoolInfo: newInfo
		});
	}

	getOpView() {
		switch (this.state.modeType) {
			case FORMULA_DETAIL:
				return (
					<FormulaView
						mode={Data.FORMULA_VIEW_MODE_RO}
						formula={this.state.detailFormula}
					/>

				);
				break;
			case FORMULA_LIST:
				return (
					<FormulaListView
						mode={Data.FORMULA_LIST_MODE_SELECT}
						onSelect={(newFormulaId)=> this.onSelectNewFormula(newFormulaId, this.state.clickFormulaId)}
					/>

				);
				break;
		}
	}

	onSelectNewFormula(newFormulaId, srcFormulaId) {
		console.log(' onSelectNewFormula newFormulaId: ' + newFormulaId + ", srcFormulaId: " + srcFormulaId);
		let that = this;
		this.setState({
			isLoading: true
		}, function () {
			updateProfessionalFormula(newFormulaId, srcFormulaId).then(function (response) {
				that.setState({
					isLoading: false,
					isShowModel: false
				}, function () {
					if(isSuccess(response)) {
						message.success('公式更新成功');
						that.refresh();
					} else {
						message.error('公式更新失败 error: ' + JSON.stringify(response));
					}
				})
			}).catch(function (error) {

				that.setState({
					isLoading: false,
					isShowModel: false
				},function () {
					message.error('公式更新失败 error: ' + JSON.stringify(error));
				})
			})
		});
	}

	onDialogDismiss() {
		this.setState({
			isShowModel: false
		})
	}

}

export default EditView;
