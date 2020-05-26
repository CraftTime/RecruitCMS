import {createElement} from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import {getMenuData} from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({namespace}) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = {...item};
      keys = {...keys, ...getFlatMenuData(item.children)};
    } else {
      keys[item.path] = {...item};
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/home': {
      component: dynamicWrapper(app, [], () => import('../routes/Home/HomeView'))
    },
    '/teach': {
      component: dynamicWrapper(app, [], () => import('../routes/Job/JobView'))
    },
    '/interview': {
      component: dynamicWrapper(app, [], () => import('../routes/Interview/Interview'))
    },
    '/resume': {
      component: dynamicWrapper(app, [], () => import('../routes/Resume/ResumeView'))
    },
    '/company': {
      component: dynamicWrapper(app, [], () => import('../routes/Company/CompanyView'))
    },
    '/job-seeker': {
      component: dynamicWrapper(app, [], () => import('../routes/JobSeeker/JobSeekerListView'))
    },
    '/recruiter': {
      component: dynamicWrapper(app, [], () => import('../routes/Recruiter/RecruiterView'))
    },
    '/banner': {
      component: dynamicWrapper(app, [], () => import('../routes/Banner/BannerView'))
    },
    '/notification': {
      component: dynamicWrapper(app, [], () => import('../routes/Notification/NotificationView'))
    },
    '/feedback': {
      component: dynamicWrapper(app, [], () => import('../routes/Feedback/FeedbackView'))
    },
    '/app': {
      component: dynamicWrapper(app, [], () => import('../routes/App/AppView'))
    },
    '/options': {
      component: dynamicWrapper(app, [], () => import('../routes/Options/OptionsView'))
    },
    '/oversea': {
      component: dynamicWrapper(app, [], () => import('../routes/Oversea/Oversea'))
    },
    '/Promotion': {
      component: dynamicWrapper(app, [], () => import('../routes/Promotion/PromotionView'))
    },
    '/product': {
      component: dynamicWrapper(app, [], () => import('../routes/Product/ProductView'))
    },
    '/teach/video': {
      component: dynamicWrapper(app, ['teach'], () => import('../routes/Teach/video/TeachVideoView'))
    },
    '/teach/image': {
      component: dynamicWrapper(app, ['teach'], () => import('../routes/Teach/image/TeachImageView'))
    },
    '/teach/image-text': {
      component: dynamicWrapper(app, ['teach'], () => import('../routes/Teach/image-text/TeachImageTextView'))
    },
    '/settings': {
      component: dynamicWrapper(app, ['studio'], () => import('../routes/Settings/SettingsView'))
    },
    '/studio/list': {
      component: dynamicWrapper(app, ['studio'], () => import('../routes/Studio/list/StudioView'))
    },
    '/studio/type-list': {
      component: dynamicWrapper(app, ['studio'], () => import('../routes/Studio/type/StudioTypeView'))
    },
    '/permission': {
      component: dynamicWrapper(app, ['user', 'cscore'], () => import('../routes/SchoolDB/school/SchoolView'))
    },
    '/user-mrg': {
      component: dynamicWrapper(app, ['user', 'cscore'], () => import('../routes/User/UserView'))
    },
    '/schooldb/school': {
      component: dynamicWrapper(app, ['user', 'cscore'], () => import('../routes/SchoolDB/school/SchoolView'))
    },
    '/schooldb/culture': {
      component: dynamicWrapper(app, ['user', 'cscore'], () => import('../routes/SchoolDB/culture/CultureView'))
    },
    '/schooldb/registration-guide': {
      component: dynamicWrapper(app, ['user', 'cscore'], () => import('../routes/SchoolDB/registrationguide/RegGuideView'))
    },
    '/schooldb/admission-score': {
      component: dynamicWrapper(app, ['user', 'cscore'], () => import('../routes/SchoolDB/admissionscore/AdmissionScoreView'))
    },
    '/schooldb/coscore-formula': {
      component: dynamicWrapper(app, ['user', 'cscore'], () => import('../routes/SchoolDB/comprehensiveScore/CScoreView'))
    },
    '/schooldb/io': {
      component: dynamicWrapper(app, ['user', 'io'], () => import('../routes/SchoolDB/io/IODataView'))
    },
    '/ad/': {
      component: dynamicWrapper(app, ['banner'], () => import('../routes/Banner/BannerView'))
    },
    '/home/article-list': {
      component: dynamicWrapper(app, ['user', 'article'], () => import('../routes/Article/list/ArticleList'))
    },
    '/home/article-type': {
      component: dynamicWrapper(app, ['user', 'article'], () => import('../routes/Article/type/ArticleTypeList'))
    },
    '/article/board': {
      component: dynamicWrapper(app, ['user', 'article'], () => import('../routes/Article/ArticleBoard'))
    },
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
      // hideInBreadcrumb: true,
      // name: '工作台',
      // authority: 'admin',
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
    },
    '/form/step-form/info': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });
  return routerData;
};
