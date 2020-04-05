import React, {Component} from 'react';
import {connect} from 'dva';
import Style from '../../../css/common.less';
import {Tabs, Card, message, Modal, Button} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import ImageTextListView from './ImageTextListView';
import {getTeachImageTextSecondTypeList} from '../../../services/AppApi';
import {isSuccess} from '../../../utils/utils';
import SecondTypeListView from './secondTypeList/SecondTypeListView';
import * as Data from '../../../data/data';

const {TabPane} = Tabs;

@connect(({teach}) => ({
	teach,
}))
class TeachImageTextSecondView extends Component {
	constructor(props) {
		super();
		this.state = {
			isShowDialog: false,
			types: [],
		};
	}

	componentDidMount() {
		this.getTypeList();
	}


	getTypeList() {
		let that = this;
		getTeachImageTextSecondTypeList(this.props.parentTypeId).then(function (response) {
			if (isSuccess(response)) {
				that.setState({
					types: response.response
				});
				console.log("艺考教学图库二级菜单类型列表获取成功");
			} else {
				message.error("艺考教学图库二级菜单类型列表获取失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("艺考教学图库二级菜单类型列表获取失败 typeId: " + JSON.stringify(error));
		});
	}

	onSecondTypeChange() {
		this.getTypeList();
	}

	render() {
		const {types} = this.state;
		let tabPanes = [];

		for (let index in types) {
			let type = types[index];

			let tabPane = (
				<TabPane tab={type.name} key={type.id}>
					<ImageTextListView
						typeId={type.id}
						parentTypeId={this.props.parentTypeId}
						onSecondTypeChange={() => this.onSecondTypeChange()}
					/>
				</TabPane>
			);

			tabPanes.push(tabPane);
		}


		return (
			<div>
				{
					this.state.isShowDialog &&
					<Modal
						destroyOnClose="true"
						title={this.state.modelTitle}
						onCancel={() => this.onDialogDismiss()}
						visible={true}
						width={(Data.MODEL_WIDTH)}
						footer={[]}
					>
						<SecondTypeListView
							parentTypeId={this.props.parentTypeId}
							onSecondTypeChange={() => this.onSecondTypeChange()}
						/>
					</Modal>
				}
				{
					this.state.types.length === 0 &&
					<div className={Style.commonBtnLayout}>
						<Button className={Style.commonBtn} type="primary" onClick={() => {
							this.props.onShowFirstTypeMrg();
						}}>图文教学一级类型管理</Button>
						<Button className={Style.commonBtn} type="primary" onClick={() => {
							this.onShowSecondTypeMrg();
						}}>图文教学二级类型管理</Button>
					</div>



				}
				<Tabs onChange={(key) => this.callback(key)} type="card">
					{tabPanes}
				</Tabs>
			</div>
		);
	}

	callback(key) {
		console.info(' callback key: ' + key);
	}

	onShowSecondTypeMrg() {
		this.setState({
			isShowDialog: true,
			modelTitle: '艺考教学图文二级类型管理',
		});
	}

	onDialogDismiss() {
		this.setState({
			isShowDialog: false,
		});
	}


}

export default TeachImageTextSecondView;
