import React, { useState, useContext, useEffect } from 'react'
import './Login.scss'
import { useHistory } from "react-router-dom";
import logo from '../../Img/img-01.png';
import { toast } from 'react-toastify';
import { handLoginUer } from '../../Services/loginService'
import { UserContext } from '../../Context/UserContext'
const Login = (props) =>
{
	/**
	 * @param {Check user}
	 */
	const { user, loginContext } = useContext(UserContext)



	let history = useHistory();
	const [valueLogin, setValueLogin] = useState("");
	const [password, setPassword] = useState("")
	/**
	 * @param {*} Check valid state
	 */
	const checkValidInput = {
		isValidLogin: true,
		isValidPassword: true,
	}
	const [checkInput, setCheckInput] = useState(checkValidInput)

	/**
	 * @param {*} New Page Register
	 */
	const handNewAccount = () =>
	{
		history.push("/register")
	}
	/**
	 * @param {*} Initialized Hand login
	 */
	const handleLogin = async () =>
	{
		setCheckInput(checkValidInput)
		if (!valueLogin)
		{
			toast.error("Vui lòng nhập địa chỉ email hoặc số điện thoại của bạn !!!")
			setCheckInput({ ...checkValidInput, isValidLogin: false })
			return;
		} else if (!password)
		{
			toast.error("Vui lòng nhập mật khẩu của bạn !!!")
			setCheckInput({ ...checkValidInput, isValidPassword: false })
			return;
		}
		let message = await handLoginUer(valueLogin, password)
		if (message && message.errorCode === 0)
		{
			let groupWithRoles = message.errorData.groupWithRoles;
			let email = message.errorData.email;
			let userName = message.errorData.userName;
			let fullName = message.errorData.fullName;
			let token = message.errorData.accessToken;
			let data = {
				isAuthenticated: true,
				token: token,
				account: { groupWithRoles, email, userName, fullName }
			}
			localStorage.setItem("jwt", token)
			loginContext(data)
			history.push('/users')
		} else
		{
			toast.error(message.errorMessage)
		}
	}
	/**
	 * 
	 * @param {*} event in Key Boat 
	 */
	const handlePressEnter = (event) =>
	{
		if (event.charCode === 13 && event.code === "Enter")
		{
			handleLogin();
		}
	}

	useEffect(() =>
	{
		if (user && user.isAuthenticated) 
		{
			history.push('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	return (
		< div className="login-container">
			<div className="container-login100" >
				<div className="wrap-login100">
					<div className="login100-pic js-tilt d-none d-md-block" data-tilt>
						<img src={logo} className="App-logo" alt="logo" />
					</div>
					<div className="login100-form validate-form">
						<span className=" login100-form-title"> Member Login</span>

						<div className="wrap-input100 validate-input" data-validate="Validate email is required: ex@gmail.com">
							<input className={checkInput.isValidLogin ? 'input100 form-control form-control-lg  is-valid ' : 'input100 form-control is-invalid'} type="text" name="email" placeholder="Address Email or Phone Number" value={valueLogin} onChange={(event) => { setValueLogin(event.target.value) }} onKeyPress={(event) => handlePressEnter(event)} />
							<span className="focus-input100"></span>
							<span className="symbol-input100">
								<i className=" fa fa-envelope" aria-hidden="true"></i>
							</span>
						</div>
						<div className="wrap-input100 validate-input" data-validate="Password is required">
							<input className={checkInput.isValidPassword ? 'input100 form-control form-control-lg  is-valid ' : 'input100 form-control is-invalid'} type="password" name="password" placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} onKeyPress={(event) => handlePressEnter(event)} />
							<span className="focus-input100"></span>
							<span className="symbol-input100">
								<i className=" fa fa-lock" aria-hidden="true"></i>
							</span>
						</div>
						<div className="container-login100-form-btn">
							<button className="login100-form-btn" onClick={() => handleLogin()}>
								Login
							</button>
						</div>
						<div className="text-center p-t-12">
							<span className="txt1 p-2 fs-5">
								Forgot your account?
							</span>
						</div>
						<div className="text-center p-t-136">
							<button className=" txt2-info" onClick={() => handNewAccount()}>
								Create Your Account
								<i className=" fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
							</button>
						</div>
					</div>

				</div>

			</div>
		</div >
	)
}

export default Login