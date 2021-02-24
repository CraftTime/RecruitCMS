import React, {Component} from 'react';
import {connect} from 'dva';
import fetch from 'dva/fetch';
import {Card, Upload, Button, Icon, message} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Style from './style.less';
import * as AppUrl  from '../../utils/AppInfo';
import * as HTTPCode from '../../utils/HTTPCode';
import IOExcelView from '../../components/IOExcel/IOExcelView';



@connect(({io}) => ({
  io,
}))
class ImportDataView extends Component {

  render() {
    return (
      <div>
        <IOExcelView
          title="城市信息"
          url={`${AppUrl.API_SERVER_URL}/excel/import/city`}
          tempUrl={'/excel/template/city'}
        />

        <IOExcelView
          title="年龄信息"
          url={`${AppUrl.API_SERVER_URL}/excel/import/age`}
          tempUrl={'/excel/template/age'}
        />
        <IOExcelView
          title="学历信息"
          url={`${AppUrl.API_SERVER_URL}/excel/import/education`}
          tempUrl={'/excel/template/education'}
        />

        <IOExcelView
          title="行业信息"
          url={`${AppUrl.API_SERVER_URL}/excel/import/industry`}
          tempUrl={'/excel/template/industry'}
        />

        <IOExcelView
          title="职业信息"
          url={`${AppUrl.API_SERVER_URL}/excel/import/position`}
          tempUrl={'/excel/template/position'}
        />

        <IOExcelView
          title="职业类型信息"
          url={`${AppUrl.API_SERVER_URL}/excel/import/positionType`}
          tempUrl={'/excel/template/positionType'}
        />

        <IOExcelView
          title="求职状态信息"
          url={`${AppUrl.API_SERVER_URL}/excel/import/jobState`}
          tempUrl={'/excel/template/jobState'}
        />
        <IOExcelView
          title="薪资信息"
          url={`${AppUrl.API_SERVER_URL}/excel/import/salary`}
          tempUrl={'/excel/template/salary'}
        />
        <IOExcelView
          title="公司规模"
          url={`${AppUrl.API_SERVER_URL}/excel/import/scale`}
          tempUrl={'/excel/template/scale'}
        />
        <IOExcelView
          title="待遇信息"
          url={`${AppUrl.API_SERVER_URL}/excel/import/treatment`}
          tempUrl={'/excel/template/treatment'}
        />
        <IOExcelView
          title="工作时间信息"
          url={`${AppUrl.API_SERVER_URL}/excel/import/workDate`}
          tempUrl={'/excel/template/workDate'}
        />

      </div>
    )
  }
}

export default ImportDataView;
