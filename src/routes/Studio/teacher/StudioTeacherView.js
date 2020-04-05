import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal, Button} from 'antd';
import TeacherListView from './TeacherListView';
import * as Data from '../../../data/data';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import Style from '../../../css/common.less';

const {TabPane} = Tabs;

@connect(({studio}) => ({
	studio,
}))
class StudioTeacherView extends Component {

	constructor(props) {
		super();
		this.state = {
			isShowDialog: false
		};
	}

	componentDidMount() {
		this.getTypeList();
	}

	getTypeList() {
		const {dispatch} = this.props;
		dispatch({
			type: 'studio/getTeacherTypeList',
			param: {
				institutionId: this.props.studioInfo.id
			}
		});
	}

	render() {
		const {studio: {teacherTypeList}} = this.props;


		let tabPanes = [];

		for (let index in teacherTypeList) {
			let type = teacherTypeList[index];

			let tabPane = (
				<TabPane tab={type.name} key={type.id}>
					<TeacherListView
						onShowTypeMrg={()=> this.onShowTypeMrg()}
						studioInfo={this.props.studioInfo}
						typeId={type.id}
					/>
				</TabPane>
			);

			tabPanes.push(tabPane);
		}


		return (
			<div>
				{this.state.isShowModel &&
				<Modal
					destroyOnClose="true"
					title="教师类型管理"
					onCancel={() => this.onDialogDismiss(false)}
					visible={true}
					width={(Data.MODEL_WIDTH)}
					footer={[]}
				>
					<TypeListView
						institutionId={this.props.studioInfo.id}
						typeList={teacherTypeList}
						addOrUpdateMethod="addOrUpdateTeacherTypeList"
						getTypeListMethod="getTeacherTypeList"
						deleteUrl='/institutionTeacherType/delete'
						title="画室教师"
					/>

				</Modal>
				}
				{teacherTypeList.length === 0 &&
				<div className={Style.commonBtnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onShowTypeMrg();
					}}>教师类型管理</Button>
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


	onShowTypeMrg() {
		this.setState({
			isShowModel: true,
			modelTitle: '教师类型管理',
		});
	}


	onDialogDismiss() {
		this.setState({
			isShowModel: false,
		});
	}

}

export default StudioTeacherView;
