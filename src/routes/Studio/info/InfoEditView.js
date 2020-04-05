import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message, Select, Switch, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import * as DateUtils from '../../../utils/DateUtils';
import ArticleImage from "../../../components/ArticleImgage/ArticleImage";
import {addOrUpdateStudio} from '../../../services/AppApi';
import {isEmpty} from '../../../utils/utils';
import StudioTypeSelect from '../../../components/StudioTypeSelect/StudioTypeSelect';
import TagsLayout from '../../../components/tag/TagsLayout';
import CommonStyle from '../../../css/common.less';

const FormItem = Form.Item;
const {TextArea} = Input;

const NAME = 0;
const DESC = NAME + 1;
const VISIBLE = NAME + 2;
const AUTHENTICATION = NAME + 3;
const VIP = NAME + 4;
const CITY = NAME + 5;
const RANK = NAME + 6;
const POSITION = NAME + 7;
const TELEPHONE = NAME + 8;
const PROVINCE = NAME + 9;
const LOGO = NAME + 10;
const TAGS = NAME + 11;
const TYPE = NAME + 12;
const LOGO2 = NAME + 13;

@Form.create()
@connect(({studio}) => ({
	studio,
}))
class InfoEditView extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			studioInfo: this.getInfo(props.studioInfo)
		};
	}

	render() {
		const {studioInfo} = this.state;
		const {getFieldDecorator} = this.props.form;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="画室类型"
					style={{}}
				>
					{getFieldDecorator('type', {
						initialValue: studioInfo.typeId,
						rules: [{
							required: true, message: '请选择画室类型',
						}],
					})(
						<StudioTypeSelect
							onChange={(value) => this.onChange(TYPE, value)}
							currValue={studioInfo.typeId}
						/>
					)}
				</FormItem>
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="画室名称"
					style={{}}
				>
					{getFieldDecorator('name', {
						initialValue: studioInfo.name,
						rules: [{
							required: true, message: '请输入画室名称',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={studioInfo.name} placeholder=""
							onChange={(event) => this.onChange(NAME, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="画室简介"
					style={{}}
				>
					{getFieldDecorator('desc', {
						initialValue: studioInfo.desc,
						rules: [{
							required: true, message: '请输入画室简介',
						}],
					})(
						<TextArea
							rows={4}
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={studioInfo.desc} placeholder=""
							onChange={(event) => this.onChange(DESC, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="省份"
					style={{}}
				>
					{getFieldDecorator('province', {
						initialValue: studioInfo.province,
						rules: [{
							required: true, message: '请输入省份',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={studioInfo.province} placeholder=""
							onChange={(event) => this.onChange(PROVINCE, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="城市"
					style={{}}
				>
					{getFieldDecorator('city', {
						initialValue: studioInfo.city,
						rules: [{
							required: true, message: '请输入城市',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={studioInfo.city} placeholder=""
							onChange={(event) => this.onChange(CITY, event.target.value)}/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="手机号码"
					style={{}}
				>
					{getFieldDecorator('telephone', {
						initialValue: studioInfo.telephone,
						rules: [{
							required: true, message: '请输入手机号码',
						}],
					})(
						<Input
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={studioInfo.telephone} placeholder=""
							onChange={(event) => this.onChange(TELEPHONE, event.target.value)}/>
					)}
				</FormItem>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="排序"
				>
					{getFieldDecorator('rank', {
						initialValue: studioInfo.rank,
						rules: [{
							required: true, message: '请输入排序',
						}],
					})(
						<InputNumber min={0} onChange={(value) => this.onChange(RANK, value)}
						             value={studioInfo.rank}
						             placeholder=""/>
					)}
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="小程序图片"
					hasFeedback
				>{getFieldDecorator('titleImageUrl', {
					initialValue: studioInfo.titleImageUrl,
					rules: [{
						required: true, message: '请选择机构小程序图片',
					}],
				})(
					<div className={CommonStyle.flexRowVCenter} style={{width: 300}}>
						<Input
							style={{width: 200}}
							value={studioInfo.titleImageUrl} placeholder=""
							onChange={(event) => this.onChange(LOGO, event.target.value)}/>
						<text className={CommonStyle.imageSizeTip}>{Data.LOGO_SIZE_TIP_TRAIN_LOGO}</text>
					</div>
				)}
					<ArticleImage
						title="机构小程序图片"
						onUrlChange={(url) => this.onChange(LOGO, url)}
						url={studioInfo.titleImageUrl}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="门户网站图片"
					hasFeedback
				>{getFieldDecorator('titleImageUrl2', {
					initialValue: studioInfo.titleImageUrl2,
					rules: [{
						required: true, message: '请选择机构门户网站图片',
					}],
				})(
					<div className={CommonStyle.flexRowVCenter} style={{width: 300}}>
						<Input
							style={{width: 200}}
							value={studioInfo.titleImageUrl2} placeholder=""
							onChange={(event) => this.onChange(LOGO2, event.target.value)}/>
						<text className={CommonStyle.imageSizeTip}>{Data.LOGO_SIZE_TIP_TRAIN_COMMON}</text>
					</div>
				)}
					<ArticleImage
						title="机构门户网站图片"
						onUrlChange={(url) => this.onChange(LOGO2, url)}
						url={studioInfo.titleImageUrl2}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="显示开关"
					style={{}}
				>
					<Switch checked={studioInfo.visible}
					        onChange={(value) => this.onChange(VISIBLE, value)}/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="认证(V)"
					style={{}}
				>
					<Switch checked={studioInfo.authentication}
					        onChange={(value) => this.onChange(AUTHENTICATION, value)}/>
				</FormItem>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="诚信"
					style={{}}
				>
					<Switch checked={studioInfo.vip}
					        onChange={(value) => this.onChange(VIP, value)}/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="画室特色"
					style={{}}
				>
					<TagsLayout
						title="画室特色"
						onTagsChange={(tags) => this.onChange(TAGS, tags)}
						tags={studioInfo.tagList}
					/>
				</FormItem>


				{
					studioInfo.gmtCreated !== undefined &&
					<FormItem
						{...Data.FORM_ITEM_LAYOUT}
						label="创建时间"
						style={{}}
					>
						<text>{DateUtils.getFormatDate(studioInfo.gmtCreated)}</text>
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

	getInfo(studioInfo) {

		if (studioInfo !== null) {
			return studioInfo;
		} else {
			return {
				typeId: this.props.typeId,
				rank: 0
			};
		}
	}

	onChange(type, value) {
		let {studioInfo} = this.state;
		let newInfo = {...studioInfo};

		switch (type) {

			case TAGS:
				newInfo.tagList = value;
				break;

			case NAME:
				newInfo.name = value;
				break;

			case DESC:
				newInfo.desc = value;
				break;

			case VISIBLE:
				newInfo.visible = value;
				break;

			case AUTHENTICATION:
				newInfo.authentication = value;
				break;

			case VIP:
				newInfo.vip = value;
				break;

			case CITY:
				newInfo.city = value;
				break;

			case RANK:
				newInfo.rank = value;
				break;

			case POSITION:
				newInfo.position = value;
				break;

			case TELEPHONE:
				newInfo.telephone = value;
				break;

			case PROVINCE:
				newInfo.province = value;
				break;

			case LOGO:
				newInfo.titleImageUrl = value;
				break;

			case LOGO2:
				newInfo.titleImageUrl2 = value;
				break;

			case TYPE:
				newInfo.typeId = value;
				break;
		}

		this.setState({
			studioInfo: newInfo
		});

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
		const baseDialogTitle = isEmpty(this.props.studioInfo) ? "新增画室" : "编辑画室";
		let that = this;
		addOrUpdateStudio(this.state.studioInfo).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.props.onDialogDismiss();
				message.success(baseDialogTitle + "操作成功");
			} else {
				message.error(baseDialogTitle + "操作失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(baseDialogTitle + "操作失败: " + JSON.stringify(error));
		});
	}

}

export default InfoEditView;
