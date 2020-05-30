import React, {Component} from 'react';
import {connect} from 'dva';
import {message, Button} from 'antd';

import {isSuccess, isEmpty} from '../../utils/utils';
import Style from './style.less';
import * as RecruitApi from '../../services/RecruitApi';

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
  onExportAge() {
    RecruitApi.exportAge().then();
  }
  onExportCity() {
    RecruitApi.exportCity().then();
  }
  onExportCompany() {
    RecruitApi.exportCompany().then();
  }
  onExportEducation() {
    RecruitApi.exportEducation().then();
  }
  onExportIndustry() {
    RecruitApi.exportIndustry().then();
  }
  onExportJob() {
    RecruitApi.exportJob().then();
  }
  onExportJobSeeker() {
    RecruitApi.exportJobSeeker().then();
  }
  onExportJobState() {
    RecruitApi.exportJobState().then();
  }
  onExportPosition() {
    RecruitApi.exportPosition().then();
  }
  onExportPositionType() {
    RecruitApi.exportPositionType().then();
  }
  onExportRecruiter() {
    RecruitApi.exportRecruiter().then();
  }
  onExportResume() {
    RecruitApi.exportResume().then();
  }
  onExportSalary() {
    RecruitApi.exportSalary().then();
  }
  onExportScale() {
    RecruitApi.exportScale().then();
  }
  onExportTreatment() {
    RecruitApi.exportTreatment().then();
  }
  onExportWorkDate() {
    RecruitApi.exportWorkDate().then();
  }

  render() {
    return (
      <div className={Style.rootLayout}>

        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportAge();
        }}> 导出年龄信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportCity();
        }}> 导出城市信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this. onExportCompany();
        }}> 导出公司信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportEducation();
        }}> 导出学历信息</Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportIndustry();
        }}> 导出行业信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportJob();
        }}> 导出岗位信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportJobSeeker();
        }}> 导出求职者信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportJobState();
        }}> 导出求职状态信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportPosition();
        }}> 导出职业信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportPositionType();
        }}> 导出职业类型信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportRecruiter();
        }}> 导出招聘者信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportResume();
        }}> 导出简历信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportSalary();
        }}> 导出薪资信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportScale();
        }}> 导出公司规模信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportTreatment();
        }}> 导出待遇信息 </Button>
        <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
          this.onExportWorkDate();
        }}> 导出工作时间信息 </Button>
      </div>
    );
  }
}

export default ExportDataView;
