import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'


export default function PrivateRoutes (props)
{
	const { user } = React.useContext(UserContext)
	if (user && user.isAuthenticated === true)
	{
		return (
			<>
				<Route path={props.path} component={props.component} />
			</>
		)
	}
	if (user && user.isAuthenticated === false)
	{
		return (
			<>
				<Redirect to='/login'></Redirect>
			</>
		)
	}
}
