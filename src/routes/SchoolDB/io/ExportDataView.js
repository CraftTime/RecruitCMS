import React, {Component} from 'react';
import {connect} from 'dva';
import {message, Button} from 'antd';
import {
	exportBigDataExcel,
	exportAdmissionPeopleNumberExcel,
	exportProfessionalExcel,
	exportSchoolExcel,
	exportSchoolProfessionExcel,
	exportAllScoreExcel,
	exportCultureScoreExcel,
	exportProfessionalScoreExcel,
	exportUserListExcel,
	exportAdmissionRateRecordsExcel,
	exportCultureScoreRecordsExcel
} from '../../../services/AppApi';

import {isSuccess, isEmpty} from '../../../utils/utils';
import Style from './ExportDataView.less';

@connect(({io}) => ({
	io,
}))
class ExportDataView extends Component {


	invoke(method) {
		method().then(function (response) {
			// message.success('下载成功');
		}).catch(function (error) {

		});
	}

	render() {
		return (
			<div className={Style.rootLayout}>

				<Button className={Style.commonBtn} type="primary"
					onClick={()=> this.invoke(exportAllScoreExcel)}
				>历年分数-下载</Button>

				<Button className={Style.commonBtn} type="primary"
				        onClick={()=> this.invoke(exportCultureScoreExcel)}
				>
					文化分历年排名-下载
				</Button>

				<Button className={Style.commonBtn} type="primary"
				        onClick={()=> this.invoke(exportProfessionalScoreExcel)}
				>专业分历年排名-下载</Button>

				<Button className={Style.commonBtn} type="primary"
				        onClick={()=> this.invoke(exportSchoolExcel)}
				>学校信息-下载</Button>

				<Button className={Style.commonBtn} type="primary"
				        onClick={()=> this.invoke(exportSchoolProfessionExcel)}
				>学校专业-下载</Button>

				<Button className={Style.commonBtn} type="primary"
				        onClick={()=> this.invoke(exportProfessionalExcel)}
				>专业选项-下载</Button>

				<Button className={Style.commonBtn} type="primary"
				        onClick={()=> this.invoke(exportAdmissionPeopleNumberExcel)}
				>招生人数-下载</Button>

				<Button className={Style.commonBtn} type="primary"
				        onClick={()=> this.invoke(exportBigDataExcel)}
				>录取大数据-下载</Button>

				<Button className={Style.commonBtn} type="primary"
				        onClick={()=> this.invoke(exportUserListExcel)}
				>用户列表-下载</Button>

				<Button className={Style.commonBtn} type="primary"
				        onClick={()=> this.invoke(exportCultureScoreRecordsExcel)}
				>文化分测算记录-下载</Button>

				<Button className={Style.commonBtn} type="primary"
				        onClick={()=> this.invoke(exportAdmissionRateRecordsExcel)}
				>录取测算记录-下载</Button>

			</div>
		);
	}
}

export default ExportDataView;
