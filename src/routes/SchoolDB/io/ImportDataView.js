import React, {Component} from 'react';
import {connect} from 'dva';
import fetch from 'dva/fetch';
import {Card, Upload, Button, Icon, message} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from './ImportDataView.less';
import * as AppUrl from '../../../utils/AppInfo';
import * as HTTPCode from '../../../utils/HTTPCode';
import IOExcelView from '../../../components/IOExcel/IOExcelView';


@connect(({io}) => ({
	io,
}))
class ImportDataView extends Component {

	render() {
		return (
			<div>
				<IOExcelView
					title="历年分数"
					url={AppUrl.IMPORT_HISTORY_SCORE}
				/>

				<IOExcelView
					title="文化分历年排名"
					url={AppUrl.IMPORT_CULTURE_SCORE_RANK}
				/>

				<IOExcelView
					title="专业分历年排名"
					url={AppUrl.IMPORT_PROFESSIONAL_SCORE_RANK}
				/>

				<IOExcelView
					title="学校信息"
					url={AppUrl.IMPORT_CHINA_SCHOOL}
				/>

				<IOExcelView
					title="学校专业"
					url={AppUrl.IMPORT_SCHOOL_MAJOR}
				/>

				<IOExcelView
					title="专业选项"
					url={AppUrl.IMPORT_MAJOR}
				/>

				<IOExcelView
					title="招生人数"
					url={AppUrl.IMPORT_ENROLMENT}
				/>

				<IOExcelView
					title="录取大数据"
					url={AppUrl.IMPORT_BIG_DATA}
				/>

			</div>
		)
	}
}

export default ImportDataView;
