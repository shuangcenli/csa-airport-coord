import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import { Route, Switch } from 'react-router-dom';
import Login from '../../container/auth/Login';
import Register from '../../container/auth/Register';
import MyRequest from '../../container/myRequest/MyRequest'
import AllPickReq from '../../container/volunteer/AllPickReq'

function Home() {
  return <h2>Airpick homepage</h2>
}

function NoMatch() {
  return <h2>404 Not Found</h2>
}

@withRouter
@connect(state => state, { loadData })
class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
    console.log('checking if logged')

    const publicList = ['/login', '/register'];
    const pathname = this.props.location.pathname;
    if (publicList.indexOf(pathname) === -1) {
      axios.get('/api/user/info')
        .then(res => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.props.loadData(res.data.data);
            } else {
              console.log('going to login')
              this.props.history.push('/login');
            }
          }
        });
    }
  }

  render() {
    const isAuth = this.props.user.isAuth;
    const rightNavbarClass = 'navbar-right'
    const navList = [
      {
        path: '/',
        text: 'UF CSA Airpick',
        component: Home,
        className: 'navbar-title',
        hide: false
      },
      {
        path: '/myrequestcenter',
        text: 'My Requests',
        className: '',
        hide: !isAuth,
        component: MyRequest,
        // subItem: [{
        //   path: '/pickrequest',
        //   text: 'Need pickup!',
        //   component: PickReq
        // }, {
        //   path: '/lodgerequest',
        //   text: 'Need Lodging!',
        //   component: LodgeReq
        // }, {
        //   path: '/myrequest',
        //   text: 'Request Status',
        //   component: MyRequest
        // }]
      },
      {
        path: '/list',
        text: 'Volunteer',
        hide: !isAuth,
        component: AllPickReq,
      },
      {
        path: '/register',
        text: 'Register',
        component: Register,
        className: rightNavbarClass,
        hide: isAuth
      },
      {
        path: '/login',
        text: 'Login',
        component: Login,
        className: rightNavbarClass,
        hide: isAuth
      },
      {
        text: 'No match',
        component: NoMatch
      },
      {
        text: 'Logout',
        className: rightNavbarClass,
        hide: !isAuth
      }
    ];
    console.log(isAuth);
    return (
      <div>
        <NavBar data={navList}></NavBar>
        <Switch>
          {navList.map(op => {
            if (op.text === 'UF CSA Airpick') {
              return <Route exact key={op.text} path={op.path} component={op.component}></Route>
            }
            else if (op.text !== 'Logout') {
              return <Route key={op.text} path={op.path} component={op.component}></Route>
            }
            else if (op.text !== 'No match') {
              return <Route key={op.text} component={NoMatch}></Route>
            }
            else {
              return null;
            }
          })}
        </Switch>
      </div>
    )
  }
}

export default AuthRoute;