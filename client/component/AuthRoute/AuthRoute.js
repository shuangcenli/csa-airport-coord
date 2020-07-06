import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import { Route, Switch } from 'react-router-dom';
import Login from '../../container/auth/Login';
import Register from '../../container/auth/Register';
import MyRequest from '../../container/myRequest/MyRequest';
import AllPickReq from '../../container/Volunteer/AllPickReq';
import AllLodgeReq from '@/container/Volunteer/AllLodgeReq';
import MyAccept from '../../container/Volunteer/MyAccept';
import { EditPassword } from '@/container/UserCenter/EditPassword';
import PrivateRoute from './PrivateRoute';
import { EditProfile } from '../../container/UserCenter/EditProfile';


function Home () {
	return (
		<section>
			<div className='background'>
				<br />
				<center>
					<img src={require('../../img/brand/CSA logo.png')} alt='CSA logo' className='center' />
					<pre className='highlight highlight-dark'>
						<p className='h1'>Welcome to the Gator Nation!</p>
					</pre>
					<br />
					<pre className='highlight'>
						<p className='chinese'>CSA在此预祝大家旅途顺利</p>
						<p className='chinese'>为保证顺利安排每个新生的接机</p>
						<p className='chinese'>我们通过接机系统收集新生信息</p>
						<p className='chinese'>安排志愿者接机</p>
						<p className='chinese'>请您仔细阅读以下的接机系统注册指南</p>
					</pre>
					<br />
				</center>
				<p />
				<div className='single-step'>
					<span className='text-danger'>
						<p className='chinese'>重要声明：CSA作为UF学生政府下属的官方非营利性组织，本接机系统的作用仅限于提供新同学联系志愿者接机的平台，
							CSA不以任何形式向新同学收费。如遇志愿者收费行为，请及时与我们<a href='mailto:ufcsainfo@gmail.com'>联系</a>。</p>
						<p className='english'>Important announcement: CSA is a non-profit student organization under UF Student Government. 
							This web application serves only as a platform for new international students&apos; convenience in finding pick-up ride
							volunteers. CSA never asks for any forms of payment. If you have encountered volunteer trying to get a payment,
							please immediately <a href='mailto:ufcsainfo@gmail.com'>inform CSA</a>, or contact any CSA members to report the incidence.</p>
					</span>
				</div>
				<br />
			</div>
			<div className='main_body'>
				<div className='body_detail'>
					<div style={ { textAlign: 'center', fontSize: '16px' } } >Sponsored by: 
						<img src={require('../../img/ctexel.png')} />
					</div>
					<button className='collapsible'>接机系统使用指南</button>
					<div className='detail'>
						<button className='collapsible' style={ { background: 'rgb(238, 188, 107)' } } >注册账号</button>
						<div className='detail'>
							<p className='single-step' style={ { textAlign: 'center' } } >
								<img className='tutorial_pic' src={require('../../img/sign up tutorial/1-name.png')} />
								<br />
								第一步：填写姓名<br />
								1. 填写名字，用英文名或者汉语拼音 <br />
								2. 填写姓，用英文或者汉语拼音
							</p>
							<p className='single-step' style={ { textAlign: 'center' } } >
								<img className='tutorial_pic' src={require('../../img/sign up tutorial/2-email.png')} />
								<br />
								第二步：填写Email<br />
								1. Email将会用于登录，找回密码，提示你的接机请求已经被接受 <br />
								2. 推荐使用 @ufl.edu 的Email，或者任何平时经常检查的Email
							</p>
							<p className='single-step' style={ { textAlign: 'center' } } >
								<img className='tutorial_pic' src={require('../../img/sign up tutorial/3-username.png')} />
								<br />
								第三步：填写用户名<br />
								1. 用户名将会用于登录<br />
								2. 详细要求见图片
							</p>
							<p className='single-step' style={ { textAlign: 'center' } } >
								<img className='tutorial_pic' src={require('../../img/sign up tutorial/4-pw.png')} />
								<br />
								第四步：填写微信号<br />
								1. 微信号将会用于新生和接机者之间的联系<br />
								<br />
								第五步：填写密码<br />
								1. 详细要求见图片<br />
								2. 以后可以修改
							</p>
							<p className='single-step' style={ { textAlign: 'center' } } >
								<img className='tutorial_pic' src={require('../../img/sign up tutorial/5.png')} />
								<br />
								第六步：选填美国电话号码和性别<br />
								**这两项可以不填，填了的话方便更好的联系**
							</p>
						</div>
						<button className='collapsible' style={ { background: 'rgb(238, 188, 107)' } } >使用系统</button>
						<div className='detail'>
							<button className='collapsible'>修改信息</button>
							<div className='detail'>
								<p className='single-step' style={ { textAlign: 'center' } } >
									<img className='tutorial_pic' src={require('../../img/use tutorial/change info/1.png')} />
									<br />
									点击右上角的用户名进入修改信息界面
								</p>
								<p className='single-step' style={ { textAlign: 'center' } } >
									<img className='tutorial_pic' src={require('../../img/use tutorial/change info/2.jpg')} />
									<br />
									根据需求修改姓名，Email，电话号码<br />
									建议尽量更新到最新的信息，以便接机的时候联系<br />
									左侧可以选择修改密码和头像
								</p>
								<p className='single-step' style={ { textAlign: 'center' } } >
									<img className='tutorial_pic' src={require('../../img/use tutorial/change info/3.jpg')} />
									<br />
									修改密码需要填写现在密码<br />
									新密码的要求和注册时候一样<br />
									需要至少六个字符，至少一个数字，一个小写字母，一个大写字母，一个特殊字符
								</p>
							</div>
							<button className='collapsible'>发布/更新/取消接机请求</button>
							<div className='detail'>
								<p className='single-step' style={ { textAlign: 'center' } } >
									<img className='tutorial_pic' src={require('../../img/use tutorial/request/1.jpg')} />
									<br />
									点击&quot;Add Your Request&quot;来发布新的请求<br />
									（&apos;Pickup Requests&apos;是所有人已经发布的接机请求）<br />
									**一个账户同时只能发布一个接机请求**<br />
									**所以如果你之前发布过并且没有取消**<br />
									**点击&apos;Add Your Request&apos;会显示并允许修改你已经发布的信息**
								</p>
								<button className='collapsible'>如何发布请求</button>
								<div className='detail'>
									<p className='single-step' style={ { textAlign: 'center' } } >
										<img className='tutorial_pic' src={require('../../img/use tutorial/request/publish.jpg')} />
										<br />
										根据图片的步骤1-6来发布请求<br />
										行李数量尽量填写准确，以便志愿者根据自己的车的大小来选择接机请求
									</p>
								</div>
								<button className='collapsible'>如何更新已经发布的请求</button>
								<div className='detail'>
									<p className='single-step' style={ { textAlign: 'center' } } >
										<img className='tutorial_pic' src={require('../../img/use tutorial/request/update.jpg')} />
										<br />
										根据图片的步骤1-3来更新已经发布的请求<br />
										**如果你已经发布过信息，并且没有取消，进来的时候会显示你已经发布的信息**
									</p>
								</div>
								<button className='collapsible'>如何取消已经发布的请求</button>
								<div className='detail'>
									<p className='single-step' style={ { textAlign: 'center' } } >
										<img className='tutorial_pic' src={require('../../img/use tutorial/request/unpublish.jpg')} />
										<br />
										根据图片的步骤1-2来取消已经发布的请求
									</p>
								</div>
							</div>
						</div>
					</div>
					<button className='collapsible'>接机系统注意事项</button>
					<div className='detail'>
						<button className='collapsible' style={ { background: 'rgb(238, 188, 107)' } } >CSA志愿者可以提供接机的机场/地点</button>
						<div className='detail'>
							<p className='single-step'>
								1. 建议新生选择最终飞抵盖恩斯维尔Gainesville Regional Airport(GNV)，CSA将全力保证为到达GNV机场的新生提供接机。可以安排接机的时间，6月15日（请尽量提前发布接机请求）至8月30日。
								<br />
								<br />
								2. 已提前购买机场大巴（比如 red coach）来Gainesville的新生。同样可以可以使用接机系统联系志愿者免费接送，但请在使用接机系统时注意注明大巴的到达时间和地点（一般为UF Commutor Lot）。
								<br />
								<br />
								3. 对于飞抵 Orlando(MCO)，Jacksonville(JAX)机场的同学 ，由于路途遥远（往返需要四至五小时），CSA不保证有志愿者接机，对此CSA表示歉意。(可以选择Red Coach，Greyhound，GMG等大巴作为交通方案。)
								<br />
								<br />
								4. 为了保证同学们的安全，新生或志愿者都务必用真实身份信息注册，一旦发现不采用真实身份以后接机系统永久列入黑名单。新生或志愿者如果对匹配到的志愿者或新生的身份有怀疑请及时联系CSA成员。
								<br />
							</p>
						</div>
						<button className='collapsible' style={ { background: 'rgb(238, 188, 107)' } } >接机流程</button>
						<div className='detail'>
							<p className='single-step'>
								1. 请新生务必按照我们要求，提供并核实个人信息。
								<br />
								<br />
								2. 当您填写完旅程的信息之后，接机请求会被发布在接机网站上，等待志愿者接受。请新生在接机系统中核实自己的信息，比如接机机场和时间（时间都以当地时间为准）。
								<br />
								<br />
								3. 当志愿者接受请求之后，新生会收到请求被接受的Email（注册网站时提供的Email）。新生和志愿者可以在接机网站看到对方联系方式。请新生和志愿者提前与对方联系，以保证接机顺利。
								<br />
								<br />
								4. 请您在抵达后按照机场的指示前往指定行李传送带(Baggage Claim)提取托运行李，拿好行李之后前往新生和志愿者先前约定好的地方见面。由于我们的华人面孔，新生与接机者之间的相认十分简单，请不必担心。如果不放心，可以提前留好联系方式，机场有免费WiFi。
								<br />
								<br />
								5. 每位新生必须自己注册，且只能注册一次。凡是成功注册申请接机的同学，CSA可兑现上一章节中相关的承诺。对于未能完成这一过程，也未在抵达美国前通过其他渠道联系CSA的同学，CSA也会尽量代为安排接机，但资源原则上会被优先安排给已注册的同学。
								<br />
								<br />
								6. 注册时，您需要设置一个用户名和密码。这样可以保证您从返系统修改并更新自己的信息。个人信息必须完全准确无误。
								<br />
								<br />
								7. CSA承诺不会向第三方泄露您的个人信息。
							</p>
						</div>
						<button className='collapsible' style={ { background: 'rgb(238, 188, 107)' } } >各种意外或突发事件的处理</button>
						<div className='detail'>
							<p className='single-step'>
								1. 新生因故改变航班，请尽早通知志愿者。 <br />
								如果在转机过程中误机或航班延误，请新生在第一时间通过微信联系接机志愿者，如果不能协调，请尽快联系CSA重新安排。可以使用机场WIFI，投币电话或借用候机大厅其他乘客的手机来联系CSA紧急联系人。
								<br />
								<br />
								2. 如果原定的志愿者因故无法前往，CSA会尽力安排新的志愿者前往，同时CSA会尽可能通知您本人。
								<br />
								<br />
								3. 如果您在已经提取了行李之后还没有见到接机者，请您在原地耐心等候一段时间，并尝试与接机志愿者联系，如果半小时内依然无法取得联系，请联系CSA紧急联系人，我们会根据情况为您做出适当的安排。
								<br />
								<br />
								若遇紧急突发事件威胁到您的人身安全，请立刻拨打９１１联系美国警方。
							</p>
						</div>
					</div>
					<p className='bottom'>
						<br />© Copyright 2020 UFCSA Chinese Student
						<br />Association at University of Florida
						<br />佛罗里达大学中国学生会
						<br />All Rights Reserved.
					</p>
				</div>
			</div>
		</section>
	);
}

function NoMatch () {
	return <p>404 Not Found</p>;
}

const navListRouting = (navList, isAuth) => {
	const routers = [];
	navList.forEach(op => {
		if (op.text === 'UF CSA Airpick') {
			routers.push(
				<Route
					exact
					key={op.text}
					path={op.path}
					component={op.component}
				></Route>
			);
		} else if (op.text === 'Volunteer') {
			const sublist = op.subItem;
			sublist.forEach(it => {
				routers.push(
					<PrivateRoute
						key={it.text}
						path={it.path}
						component={it.component}
						isAuth={isAuth}
					></PrivateRoute>
				);
			});
		} else if (op.text === 'usercenter') {
			op.subItem.forEach(it => {
				if (it.text !== 'Sign out') {
					routers.push(
						<PrivateRoute
							key={it.text}
							path={it.path}
							component={it.component}
							isAuth={isAuth}
						></PrivateRoute>
					);
				}
			});
		} else {
			if (op.auth) {
				routers.push(
					<PrivateRoute
						key={op.text}
						path={op.path}
						component={op.component}
						isAuth={isAuth}
					></PrivateRoute>
				);
			} else {
				routers.push(
					<Route key={op.text} path={op.path} component={op.component}></Route>
				);
			}
		}
	});

	routers.push(<Route key='nomatch' component={NoMatch}></Route>);
	return routers;
};

@withRouter
@connect(state => state, { loadData })
class AuthRoute extends React.Component {
	constructor (props) {
		super(props);
		console.log('checking if logged');

		const publicList = ['/login', '/register'];
		const pathname = this.props.location.pathname;
		if (publicList.indexOf(pathname) === -1) {
			axios.get('/api/user/info').then(res => {
				if (res.status === 200) {
					if (res.data.code === 0) {
						this.props.loadData(res.data.data);
					} else {
						console.log('going to login');
						this.props.history.push('/login');
					}
				}
			});
		}
	}

	render () {
		const isAuth = this.props.user.isAuth;
		const rightNavbarClass = 'navbar-right header-nav';
		const leftNavbarClass = 'navbar-left header-nav';
		
		const home = [
			{
				path: '/',
				text: 'UF CSA Airpick',
				component: Home,
				className: 'navbar-title',
				auth: false,
				hide: false
			}
		];
		const needAuth = [
			{
				path: '/myrequestcenter',
				text: 'My Requests',
				className: '',
				hide: !isAuth,
				component: MyRequest,
				auth: true
			},
			{
				text: 'Volunteer',
				hide: !isAuth,
				subItem: [
					{
						path: '/airpicklist',
						text: 'Airpick Requests',
						component: AllPickReq,
						auth: true
					},
					{
						path: '/lodgelist',
						text: 'Lodge Requests',
						component: AllLodgeReq,
						auth: true
					},
					{
						path: '/accepted',
						text: 'My Acception',
						component: MyAccept,
						auth: true
					}
				]
			}
		];
		const userAuth = [
			{
				path: '/register',
				text: 'Register',
				component: Register,
				className: rightNavbarClass,
				hide: isAuth,
				auth: false
			},
			{
				path: '/login',
				text: 'Login',
				component: Login,
				className: rightNavbarClass,
				hide: isAuth,
				auth: false
			},
			{
				text: 'usercenter',
				hide: !isAuth,
				className: rightNavbarClass,
				subItem: [
					{
						path: '/edit-profile',
						text: 'Edit Profile',
						component: EditProfile,
						auth: true
					},
					{
						path: '/change-password',
						text: 'Change Password',
						component: EditPassword,
						auth: true
					},
					{
						text: 'Sign out',
						auth: true
					}
				]
			}
		];

		const allRouteList = [...home, ...needAuth, ...userAuth];

		return (
			<div>
				<div className='header'>
					<div className='logo'>
						<NavBar data={home}></NavBar>
					</div>
					<div className={rightNavbarClass}>
						<NavBar data={userAuth}></NavBar>
					</div>
					<div className={leftNavbarClass}>
						<NavBar data={needAuth}></NavBar>
					</div>
				</div>
				<div className=''>
					<Switch>{navListRouting(allRouteList, isAuth)}</Switch>
				</div>
			</div>
		);
	}
}

export default AuthRoute;
