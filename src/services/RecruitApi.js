import request, {request2} from '../utils/request';
import * as AppUrl from '../utils/AppInfo';

// //关于相关
export async function listAbout(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/about/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}

export async function deleteAbout(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/about/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}

export async function updateOrAddAbout(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/about/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//==============================================================================================================================================
// //反馈
export async function listFeedback(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/feedback/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddFeedback(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/feedback/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteFeedback(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/feedback/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}
// //=== Option 选项相关
//

//==============================================================================================================================================
//城市接口
export async function listCity(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/city/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteCity(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/city/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}
export async function updateOrAddCity(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/city/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}

//年龄接口
export async function listAge(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/age/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddAge(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/age/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteAge(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/age/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}

// 行业信息
export async function listIndustry(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/industry/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddIndustry(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/industry/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteIndustry(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/industry/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}

//职业信息
export async function listPosition(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/position/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddPosition(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/position/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deletePosition(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/position/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}

//学历信息
export async function listEducation(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/education/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddEducation(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/education/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteEducation(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/education/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}

//待遇信息
export async function listTreatment(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/treatment/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddTreatment(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/treatment/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteTreatment(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/treatment/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}
//工作时间
export async function listWorkDate(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/workDate/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddWorkDate(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/workDate/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteWorkDate(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/workDate/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}
//公司规模
export async function listCompanyScale(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/scale/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddScale(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/scale/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteWorkScale(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/scale/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}

// 薪资信息
export async function listSalary(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/salary/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddSalary(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/salary/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteWorkSalary(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/salary/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}

//经营状态
export async function listManagement(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/management/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddManagement(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/management/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteManagement(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/management/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}
//求职状态
export async function listJobState(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/jobState/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddJobState(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/jobState/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteJobState(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/jobState/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}




//===================================================================================================================================================
//
// //通知
export async function listNotification(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/notice/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//
//===================================================================================================================================================================
// //Banner
export async function listBanner(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/banner/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddBanner(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/banner/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteBanner(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/banner/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}
//
// //================================================================================================================================================================

//下面三个评论相关的都变成通用的
export async function listComment(modal, id, param, s, f) {
  let url = AppUrl.API_SERVER_URL + `/${modal}/comment/${id}/list`;
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(param),
    headers: {
      "Content-Type": "application/json"
    }
  }, s, f);
}


export async function updateCommentStatus(modal, param, s, f) {
  let url = AppUrl.API_SERVER_URL + `/${modal}/comment/updateStatus`;
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(param),
    headers: {
      "Content-Type": "application/json"
    }
  }, s, f);
}

export async function deleteComment(modal, param, s, f) {
  let url = AppUrl.API_SERVER_URL + `/${modal}/comment/delete`;
  return request2(url, {
    method: 'DELETE',
    params: param,
  }, s, f);
}
//======================================================================================================================
//求职者接口
//基本信息
export async function infoList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/jobSeeker/infoList';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//岗位收藏
export async function jobStarList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/jobSeeker/jobStarList';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//公司收藏
export async function CompanyStarList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/jobSeeker/companyStarList';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//公司屏蔽
export async function ShieldList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/jobSeeker/shieldCompanyList';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
// 工作经历
export async function WorkExpList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/jobSeeker/workExpList';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//教育经历
export async function EducationExpList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/jobSeeker/educationExpList';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//项目经历
export async function ProjectExpList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/jobSeeker/projectExpList';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//求职期望
export async function JobExpectList(JobSeekerId, success, failed) {
  let url = AppUrl.API_SERVER_URL + `/jobSeeker/JobIntention/${JobSeekerId}`;
  return request2(url, {
    method: 'Get',
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//面试记录
export async function Interview(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/jobSeeker/interview';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//=====================================================================================================================
//招聘者接口
export async function recruiter(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/recruiter/infoList';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//屏蔽用户
export async function ShieldUserList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/recruiter/shieldList';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//收藏用户
export async function StarUserList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/recruiter/starList';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
// 发布的岗位信息
export async function JobUserList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/recruiter/job/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//招聘者所属公司信息
export async function CompanyUserList(Id, success, failed) {
  let url = AppUrl.API_SERVER_URL + `/recruiter/company/${Id}`;
  return request2(url, {
    method: 'Get',
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//招聘者面试记录
export async function RecruiterInterview(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/recruiter/interview';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}


//======================================================================================================================
//公司信息
export async function companyList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/company/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function updateOrAddCompany(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/company/save';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function deleteCompany(id, s, f) {
  let url = AppUrl.API_SERVER_URL + `/company/delete/${id}`;
  return request2(url, {
    method: 'DELETE',
  }, s, f);
}
//======================================================================================================================
//简历信息
export async function resumeList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/resume/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
export async function resumeDetailList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + `/jobSeeker/resume/${info}`;
  return request2(url, {
    method: 'Get',
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//======================================================================================================================
//面试信息接口
export async function InterviewList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/interview/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//=====================================================================================================================
//招聘岗位信息
export async function JobViewList(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/job/list';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//岗位面试信息
export async function JobInterview(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/job/interview';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//岗位状态信息
export async function JobEmploy(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + `/job/employ/${info}`;
  return request2(url, {
    method: 'Get',
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//岗位申请记录
export async function JobApply(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/job/apply';
  return request2(url, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//=====================================================================================================================
//图片上传接口
export async function Imgupload(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/image/upload';
  return request2(url, {
    method: 'POST',
    body: info,
  }, success, failed);
}
//=====================================================================================================================
//首页接口
//招聘信息
export async function HomeInfo(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/index/info';
  return request2(url, {
    method: 'Get',
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//用户权限
export async function RootInfo(info, success, failed) {
  let url = AppUrl.API_SERVER_URL + '/userRole/list';
  return request2(url, {
    method: 'Post',
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json"
    }
  }, success, failed);
}
//======================================================================================================================
//导出接口
export async function exportAge() {
  let url = AppUrl.API_SERVER_URL + '/excel/age';
  return request(url,{
    method: 'GET',
  });
}
export async function exportCity() {
  let url = AppUrl.API_SERVER_URL + '/excel/city';
  return request(url,{
    method: 'GET',
  });
}
export async function exportCompany() {
  let url = AppUrl.API_SERVER_URL + '/excel/company';
  return request(url,{
    method: 'GET',
  });
}
export async function exportEducation() {
  let url = AppUrl.API_SERVER_URL + '/excel/education';
  return request(url,{
    method: 'GET',
  });
}
export async function exportIndustry() {
  let url = AppUrl.API_SERVER_URL + '/excel/industry';
  return request(url,{
    method: 'GET',
  });
}
export async function exportJob() {
  let url = AppUrl.API_SERVER_URL + '/excel/job';
  return request(url,{
    method: 'GET',
  });
}
export async function exportJobSeeker() {
  let url = AppUrl.API_SERVER_URL + '/excel/jobSeeker';
  return request(url,{
    method: 'GET',
  });
}
export async function exportJobState() {
  let url = AppUrl.API_SERVER_URL + '/excel/jobState';
  return request(url,{
    method: 'GET',
  });
}
export async function exportPosition() {
  let url = AppUrl.API_SERVER_URL + '/excel/position';
  return request(url,{
    method: 'GET',
  });
}
export async function exportPositionType() {
  let url = AppUrl.API_SERVER_URL + '/excel/positionType';
  return request(url,{
    method: 'GET',
  });
}
export async function exportRecruiter() {
  let url = AppUrl.API_SERVER_URL + '/excel/recruiter';
  return request(url,{
    method: 'GET',
  });
}
export async function exportResume() {
  let url = AppUrl.API_SERVER_URL + '/excel/resume';
  return request(url,{
    method: 'GET',
  });
}
export async function exportSalary() {
  let url = AppUrl.API_SERVER_URL + '/excel/salary';
  return request(url,{
    method: 'GET',
  });
}
export async function exportScale() {
  let url = AppUrl.API_SERVER_URL + '/excel/scale';
  return request(url,{
    method: 'GET',
  });
}
export async function exportTreatment() {
  let url = AppUrl.API_SERVER_URL + '/excel/treatment';
  return request(url,{
    method: 'GET',
  });
}
export async function exportWorkDate() {
  let url = AppUrl.API_SERVER_URL + '/excel/workDate';
  return request(url,{
    method: 'GET',
  });
}
//导入统一接口
export async function importExcelFile(url, params) {
  return request(url, {
    method: 'POST',
    body: params,
  });
}
