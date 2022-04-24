import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login';
import About from '../Components/About/About';
import Error from '../Components/Error/Error';
import Contact from '../Components/Contact/Contact';
import Register from '../Components/Register/Register';
import User from '../Components/ManageUsers/Users'
import PrivateRoutes from '../Route/PrivateRoutes'
import Project from '../Components/Projects/Projects'
import CreateUser from '../Components/ManageUsers/CreateUser'
import Roles from '../Components/Roles/Roles'
import Group_Role from '../Components/Group-Role/Group_Role'
import Group from '../Components/Group/Group'
import Otp from '../Components/OTP/ShowOtp'

export default function AppRoute (props)
{
	return (
		<>
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route exact path='/' component={Home} />
				<Route path='/contact' component={Contact} />
				<Route path='/about' component={About} />
				<Route path='/otp' component={Otp} />
				<PrivateRoutes path='/project' component={Project} />
				<PrivateRoutes path='/role' component={Roles} />
				<PrivateRoutes path='/users' component={User} />
				<PrivateRoutes path='/create' component={CreateUser} />
				<PrivateRoutes path='/group-role' component={Group_Role} />
				<PrivateRoutes path='/group' component={Group} />
				<Route path='*' component={Error} />
			</Switch>
		</>
	)
}
