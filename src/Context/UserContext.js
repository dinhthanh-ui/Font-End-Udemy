import React, { useState, useEffect } from 'react'
import { getUserAccounts } from '../Services/userService'

const UserContext = React.createContext(null);
const UserProvider = ({ children }) =>
{
	const userDefault = {
		isLoading: true,
		isAuthenticated: false,
		token: "",
		account: {}
	}
	// User is the name of the "data" that gets stored in context
	const [user, setUser] = useState(userDefault);

	// Login updates the user data with a name parameter
	const loginContext = (userData) =>
	{
		setUser({ ...userData, isLoading: false })

	}
	// Logout updates the user data to default
	const logoutContext = () =>
	{
		setUser({ ...userDefault, isLoading: false })
	};
	const fetchUser = async () =>
	{
		let message = await getUserAccounts();
		if (message && message.errorCode === 0)
		{
			let groupWithRoles = message.errorData.groupWithRoles;
			let email = message.errorData.email;
			let fullName = message.errorData.fullName;
			let userName = message.errorData.userName;
			let token = message.errorData.accessToken;
			let data = {
				isAuthenticated: true,
				token: token,
				account: { groupWithRoles, email, fullName, userName },
				isLoading: false
			}
			setTimeout(() =>
			{
				setUser(data)
			}, 20 * 100)
		} else
		{
			setUser({ ...userDefault, isLoading: false })
		}
	}
	useEffect(() =>
	{
		fetchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<UserContext.Provider value={{ user, loginContext, logoutContext }}>
			{children}
		</UserContext.Provider>
	);
}

export { UserContext, UserProvider }

