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
	Upload,
	Select,
	Button,
	Card,
	InputNumber,
	Radio,
	Modal,
	Cascader,
} from 'antd';
import * as Data from '../../../../../data/data';
import ArticleImage from '../../../../../components/ArticleImgage/ArticleImage';
import Style from '../../../../../css/common.less';
import {isEmpty, isSuccess} from '../../../../../utils/utils';
import {addOrUpdateSchoolBaseInfo} from '../../../../../services/AppApi';
import ProvinceCity from '../../../../../data/ProvinceCity';
import MapView from '../../../../../components/AMap/MapView';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;

const SCHOOL_NAME = 0;
const BATCH_ENTRY = SCHOOL_NAME + 1;  //批次
const COURSE_TYPE = SCHOOL_NAME + 2;   //文理科
const WEIGHT = SCHOOL_NAME + 3;
const SCHOOL_LOGO = SCHOOL_NAME + 4;
const PROVINCE = SCHOOL_NAME + 5;
const CITY = SCHOOL_NAME + 6;
const NATURE = SCHOOL_NAME + 7; //办学性质
const SCHOOL_TYPE = SCHOOL_NAME + 8; //院校类型
const SCHOOL_LEVEL_985_211 = SCHOOL_NAME + 9; //学校登记 985 211
const SCHOOL_ATTR = SCHOOL_NAME + 10;
const SCHOOL_SUBJECTION = SCHOOL_NAME + 11;
const RANK = SCHOOL_NAME + 12;
const WEBSITE = SCHOOL_NAME + 13;
const APPLY_DIFFICULTY = SCHOOL_NAME + 14;

@Form.create()
class BaseInfoEditView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			school: this.getSchool(),
			isShowMapDialog: false
		}

	}

	getSchool() {
		if (isEmpty(this.props.school)) {
			return {};
		} else {
			let school = {...this.props.school};
			school.position = [];
			school.position.push(school.province, school.city);
			return school;
		}
	}


	render() {
		const {getFieldDecorator, getFieldValue} = this.props.form;

		const formItemLayout = {
			labelCol: {
				xs: {span: 24},
				sm: {span: 7},
			},
			wrapperCol: {
				xs: {span: 24},
				sm: {span: 12},
				md: {span: 10},
			},
		};
		const submitFormLayout = {
			wrapperCol: {
				xs: {span: 24, offset: 0},
				sm: {span: 10, offset: 7},
			},
		};
		let {school} = this.state;
		let level_985_211 = [];

		if (school.school211) {
			level_985_211.push(1);
		}

		if (school.school985) {
			level_985_211.push(2);
		}

		const filter = (inputValue, path) => {
			return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
		};

		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>
				{this.state.isShowMapDialog &&
				<Modal
					destroyOnClose="true"
					title={school.name + ' 地图设置'}
					onCancel={() => this.onMapDialogDismiss()}
					visible={true}
					width={Data.MODEL_WIDTH}
					footer={[]}
				>
					<MapView
						positionInfo={school.positionInfo}
						onSelect={(city, longitude, latitude) => this.onMapSelect(city, longitude, latitude)}
					/>

				</Modal>
				}

				<FormItem
					{...formItemLayout}
					label="院校名称"
					style={{}}
				>
					{getFieldDecorator('schoolName', {
						initialValue: school.name,
						rules: [{
							required: true, message: '院校名称',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={school.name} placeholder=""
							onChange={(event) => this.onChange(SCHOOL_NAME, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="批次"
					hasFeedback
				>
					<Radio.Group
						onChange={(event) => this.onChange(BATCH_ENTRY, event.target.value)}
						value={school.levelBatch}>
						<Radio value="A">A</Radio>
						<Radio value="B">B</Radio>
					</Radio.Group>
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="文理科"
					hasFeedback
				>
					<Radio.Group onChange={(event) => this.onChange(COURSE_TYPE, event.target.value)}
					             value={school.course}>
						<Radio value={Data.COURSE_TYPE_LIBERAL}>文科</Radio>
						<Radio value={Data.COURSE_TYPE_SCIENCE}>理科</Radio>
						<Radio value={Data.COURSE_TYPE_ALL}>文理科</Radio>
					</Radio.Group>
				</FormItem>


				<FormItem
					{...formItemLayout}
					label="权重"
				>
					{getFieldDecorator('weight', {
						initialValue: school.weight,
						rules: [{
							required: true, message: '请输入权重',
						}],
					})(
						<InputNumber
							style={{width: Data.FORM_ITEM_WIDTH}}
							min={0} onChange={(event) => this.onChange(WEIGHT, event)}
							value={school.weight}
							placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="省份、城市"
					hasFeedback
				>{getFieldDecorator('position', {
					initialValue: school.position,
					rules: [{
						required: true, message: '请选择省份、城市',
					}],
				})(
					<Cascader
						options={ProvinceCity} onChange={(value) => this.onChange(PROVINCE, value)}
						showSearch={{filter}}
						placeholder="请选择省份、城市"/>,
				)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="地图设置"
					hasFeedback
				>
					<Button onClick={() => this.setState({isShowMapDialog:true})}>设置</Button>
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="学校图标"
					hasFeedback
				>{getFieldDecorator('schoolLogo', {
					initialValue: school.icon,
					rules: [{
						required: true, message: '请选择学校Logo',
					}],
				})(
					<Input value={school.icon} placeholder="请选择学校Log"
					       onChange={(event) => this.onChange(SCHOOL_LOGO, event.target.value)}/>
				)}
					<ArticleImage
						title="学校Logo"
						onUrlChange={(url) => this.onChange(SCHOOL_LOGO, url)}
						url={school.icon}
					/>
				</FormItem>


				<FormItem
					{...formItemLayout}
					label="办学性质"
					hasFeedback
				>{getFieldDecorator('eduAttr', {
					initialValue: school.eduAttr,
					rules: [{
						required: true, message: '请选择办学性质',
					}],
				})(
					<Select
						showSearch
						style={{width: Data.FORM_ITEM_WIDTH}}
						placeholder="请选择办学性质"
						optionFilterProp="children"
						onChange={(value) => this.onChange(NATURE, value)}
						filterOption={(input, option) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{this.getOptions(Data.NATURE)}
					</Select>,
				)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="院校类型"
					hasFeedback
				>{getFieldDecorator('schoolType', {
					initialValue: school.schoolType,
					rules: [{
						required: true, message: '请选择院校类型',
					}],
				})(
					<Select
						showSearch
						style={{width: Data.FORM_ITEM_WIDTH}}
						placeholder="请选择院校类型"
						optionFilterProp="children"
						onChange={(value) => this.onChange(SCHOOL_TYPE, value)}
						filterOption={(input, option) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{this.getOptions(Data.SCHOOL_TYPE)}
					</Select>,
				)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="院校等级"
				>{getFieldDecorator('schoolLevel', {
					initialValue: level_985_211,
				})(
					<CheckboxGroup
						defaultValue={level_985_211}
						value={level_985_211}
						options={Data.SCHOOL_LEVEL}
						style={{width: Data.FORM_ITEM_WIDTH}}
						onChange={checkList => this.onChange(SCHOOL_LEVEL_985_211, checkList)}
					/>
				)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="属性"
					hasFeedback
				>
					{getFieldDecorator('attr', {
						initialValue: school.attr,
						rules: [{
							required: true, message: '请选择属性',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={school.attr} placeholder=""
							onChange={(event) => this.onChange(SCHOOL_ATTR, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="隶属"
					hasFeedback
				>
					{getFieldDecorator('subordinate', {
						initialValue: school.subordinate,
						rules: [{
							required: true, message: '请选择隶属',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={school.subordinate} placeholder=""
							onChange={(event) => this.onChange(SCHOOL_SUBJECTION, event.target.value)}/>
					)}

				</FormItem>

				<FormItem
					{...formItemLayout}
					label="报考难度"
					hasFeedback
				>{getFieldDecorator('applyDifficulty', {
					initialValue: school.applyDifficulty,
					rules: [{
						required: true, message: '请填写报考难度',
					}],
				})(
					<InputNumber
						style={{width: Data.FORM_ITEM_WIDTH}}
						value={school.rank} placeholder="请填写报考难度"
						min={1}
						max={10}
						onChange={(value) => this.onChange(APPLY_DIFFICULTY, value)}/>
				)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="排名"
					hasFeedback
				>{getFieldDecorator('rank', {
					initialValue: school.rank,
					rules: [{
						required: true, message: '请填写学校排名',
					}],
				})(
					<InputNumber
						style={{width: Data.FORM_ITEM_WIDTH}}
						value={school.rank} placeholder="请填写学校排名"
						onChange={(value) => this.onChange(RANK, value)}/>
				)}
				</FormItem>

				<FormItem
					{...formItemLayout}
					label="院校招生网	"
					hasFeedback
				>{getFieldDecorator('webSite', {
					initialValue: school.schoolUrl,
					rules: [{
						required: true, message: '请填写院校招生网',
					}],
				})(
					<Input
						style={{width: Data.FORM_ITEM_WIDTH}}
						value={school.schoolUrl} placeholder="请填写院校招生网"
						onChange={(event) => this.onChange(WEBSITE, event.target.value)}/>
				)}
				</FormItem>

				<FormItem {...submitFormLayout} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</FormItem>

			</Form>
		);
	}

	onChange(type, value) {
		let {school} = this.state;
		let newInfo = {...school};

		switch (type) {
			case SCHOOL_NAME:
				newInfo.name = value;
				break;

			case BATCH_ENTRY:
				newInfo.levelBatch = value;
				break;

			case COURSE_TYPE:
				newInfo.course = value;
				break;

			case WEIGHT:
				newInfo.weight = value;
				break;

			case SCHOOL_LOGO:
				newInfo.icon = value;
				break;

			case PROVINCE:
				newInfo.position = value;
				newInfo.province = value[0];
				newInfo.city = value[1];
				break;

			case NATURE:
				//办学性质
				newInfo.eduAttr = value;
				break;

			case SCHOOL_TYPE:
				//院校类型
				newInfo.schoolType = value;
				break;

			case SCHOOL_LEVEL_985_211:
				newInfo.school211 = (value.indexOf(Data.SCHOOL_LEVEL_211) > -1);
				newInfo.school985 = (value.indexOf(Data.SCHOOL_LEVEL_985) > -1);
				break;

			case SCHOOL_ATTR:
				//属性
				newInfo.attr = value;
				break;

			case SCHOOL_SUBJECTION:
				//隶属
				newInfo.subordinate = value;
				break;

			case APPLY_DIFFICULTY:
				newInfo.applyDifficulty = value;
				break;

			case RANK:
				newInfo.rank = value;
				break;

			case WEBSITE:
				newInfo.schoolUrl = value;
				break;
		}

		this.setState({
			school: newInfo
		});
	}

	getOptions(data) {
		let options = [];

		for (let i in data) {
			let val = data[i];
			let view = (
				<Option value={val}>{val}</Option>
			);
			options.push(view);
		}
		return options;
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
		const baseDialogTitle = (isEmpty(this.props.school) ? "新增" : "编辑") + "学校信息";
		let {onDialogDismiss} = this.props;
		delete this.state.position;
		let that = this;
		addOrUpdateSchoolBaseInfo(this.state.school).then(function (response) {
			if (isSuccess(response)) {
				if (onDialogDismiss) {
					onDialogDismiss();
				}
				message.success(baseDialogTitle + "操作成功");
			} else {
				message.error(baseDialogTitle + "操作失败 failed:  " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(baseDialogTitle + "操作失败 error: " + JSON.stringify(error));
		});
	}

	onMapDialogDismiss() {
		this.setState({
			isShowMapDialog:false
		})
	}


	onMapSelect(city, longitude, latitude) {
		let newSchool = {...this.state.school};

		if(isEmpty(newSchool.positionInfo)) {
			newSchool.positionInfo = {};
		}

		newSchool.positionInfo.city = city;
		newSchool.positionInfo.longitude = longitude;
		newSchool.positionInfo.latitude = latitude;

		this.setState({
			school: newSchool,
			isShowMapDialog: false
		})

	}


}

export default BaseInfoEditView;
