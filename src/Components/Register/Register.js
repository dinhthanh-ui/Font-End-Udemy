import React, { useState, useEffect, useContext } from 'react'
import register_image from '../../Img/register.webp'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { UserContext } from '../../Context/UserContext'
import './Register.scss'
import { registerUser } from '../../Services/loginService'


const Register = () =>
{
	const { user } = useContext(UserContext)
	const { register, handleSubmit } = useForm();
	// ==========================================
	/**
	 * @Initialized User History
	 */
	let history = useHistory();
	const handLogin = () =>
	{
		history.push('/login')
	}

	/**
	 * @param {*} Check valid state
	 */
	const checkValid = {
		isValidFullName: true,
		isValidEmail: true,
		isValidPassword: true,
		isValidConfirmPassword: true,
		isValidPhone: true,
		isValidAddress: true,
		isValidUserName: true
	}
	const [objectCheckInput, setCheckInput] = useState(checkValid)

	/**
	 * @Initialized handCreateAccount
	 */
	const handCreateAccount = async (userData) =>
	{
		setCheckInput(checkValid)
		/**
		 * @param {*} check regex
		*/
		let checkFullName = /[A - zÀ - ÿ]/
		let checkGmail = /^[a-z][a-z0-9]{2,12}@[a-z0-9]{2,5}(\.[a-z0-9]{2,4})$/;
		let checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,16}$/;
		let checkPhone = /^(84|0[3|5|7|8|9])+([0-9]{8})$/
		let checkUserName = /^(?=[a-zA-Z0-9._]{8,15}$)/;
		/**
		 * @param {*} call variable and use
		 */
		let fullName = userData.fullName
		let email = userData.email
		let password = userData.password
		let confirmPassword = userData.confirmPassword
		let phone = userData.phone
		let address = userData.address
		let gender = userData.Gender
		let userName = userData.userName



		if (!fullName || !checkFullName.test(fullName))
		{
			toast.error("Tên không được để trống và viết có dấu!");
			setCheckInput({ ...checkValid, isValidFullName: false })
			return false;
		}
		if (!email || !checkGmail.test(email))
		{
			toast.error(`Vui Lòng Nhập Email,không kỹ tự đặc biệt,dấu gạch chân và trong khoảng 2-12 ký tự sau @gmail.com ,ví dụ: "dinhthanh1997@gmail.com"`);
			setCheckInput({ ...checkValid, isValidEmail: false })
			return false;
		}
		if (!password || !checkPassword.test(password))
		{
			toast.error(`Vui Lòng Nhập Password,không kỹ tự đặc biệt, tối thiểu 8 kỹ tự và ít nhất một chữ hoa, một chữ thường và số ,ví dụ: Abc123442`);
			setCheckInput({ ...checkValid, isValidPassword: false })
			return false;
		}
		if (password !== confirmPassword)
		{
			toast.error(`Vui Lòng Nhập Lại Mật Khẩu Để xác Nhận`);
			setCheckInput({ ...checkValid, isValidConfirmPassword: false })
			return false;
		}
		if (!phone || !checkPhone.test(phone))
		{
			toast.error(`Vui Lòng Nhập Số Điện Thoại, trong khoảng 10 số. Ví Dụ: " 0322448800 hoặc 841122990033"`);
			setCheckInput({ ...checkValid, isValidPhone: false })
			return false;
		}
		if (!address)
		{
			toast.error(`Vui Lòng Nhập Địa chỉ Bạn Đang Sinh Sống`);
			setCheckInput({ ...checkValid, isValidAddress: false })
			return false;
		}
		if (!gender)
		{
			toast.error(`Vui Lòng Chọn Giới Tính`);
			return false;
		}
		if (!userName || !checkUserName.test(userName))
		{
			toast.error(`Vui Lòng Nhập tên tài khoản  trong khoảng 8-15 kỹ tự,không kỹ tự đặc biệt và dấu cách,ví dụ: "dinh_thanh_1997`);
			setCheckInput({ ...checkValid, isValidUserName: false })
			return false;
		}
		let response = await registerUser(fullName, email, password, phone, address, gender, userName)
		if (+response.errorCode === 0)
		{
			toast.success(response.errorMessage)
			history.push('/login')
		} else
		{

			if (response.errorMessage === "Email hoặc tên người dùng và điện thoại đã tồn tại, Vui lòng nhập một địa chỉ email mới !!!!" || response.errorData === "Email")
			{
				toast.error(response.errorMessage)
				setCheckInput({ ...checkValid, isValidEmail: false })
			}
			else if (response.errorMessage === "Email hoặc tên người dùng và điện thoại đã tồn tại, Vui lòng nhập một địa chỉ email mới !!!!" || response.errorData === "phone")
			{
				toast.error(response.errorMessage)
				setCheckInput({ ...checkValid, isValidPhone: false })
			}
			else if (response.errorMessage === "Email hoặc tên người dùng và điện thoại đã tồn tại, Vui lòng nhập một địa chỉ email mới !!!!" || response.errorData === "userName")
			{
				toast.error(response.errorMessage)
				setCheckInput({ ...checkValid, isValidUserName: false })
			}
			else
			{
				toast.error(response.errorMessage)
			}

		}
		return true;
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
		<div className="h-100 bg-dark">
			<div className="container h-100">
				<div className="row d-flex justify-content-center align-items-center h-100 register ">
					<div className="col">
						<div className="card card-registration">
							<div className="row g-0 my-2">
								<div className="col-xl-6 d-none d-xl-block ">
									<img src={register_image} className="register img-fluid" alt="logo" />
								</div>
								<form className="col-xl-6" onSubmit={handleSubmit(handCreateAccount)} >
									<div className="card-body p-md-3 text-black">
										<h3 className="mb-2 info text-center text-uppercase">Mẫu Đăng ký</h3>
										<div className="row">
											<div className="col-md-6 ">
												<div className="form-outline">
													<input type="text"  {...register("fullName")} name="fullName" className={objectCheckInput.isValidFullName ? 'form-control form-control-lg is-valid ' : 'form-control is-invalid'} placeholder="Your Full Name" />
													<label className="form-label" htmlFor="form3Example1m">Full Name</label>
												</div>
											</div>
											<div className="col-md-6 ">
												<div className="form-outline">
													<input type="text"  {...register("email")} name="email" className={objectCheckInput.isValidEmail ? 'form-control form-control-lg is-valid ' : 'form-control is-invalid'} placeholder="Email Address" />
													<label className="form-label" htmlFor="form3Example97">Email Address</label>
												</div>
											</div>
										</div>

										<div className="row">
											<div className="col-md-6 ">
												<div className="form-outline">
													<input type="password" {...register("password")} name="password" className={objectCheckInput.isValidPassword ? 'form-control form-control-lg is-valid ' : 'form-control is-invalid'} placeholder="Password Address" />
													<label className="form-label" htmlFor="form3Example1m1">Password</label>
												</div>
											</div>
											<div className="col-md-6 ">
												<div className="form-outline">
													<input type="password" {...register("confirmPassword")} name="confirmPassword" className={objectCheckInput.isValidConfirmPassword ? 'form-control form-control-lg is-valid ' : 'form-control is-invalid'} placeholder=" Re-Enter Password Address" />
													<label className="form-label">Confirm Password</label>
												</div>
											</div>
											<div className="col-md-6 ">
												<div className="form-outline">
													<input type="text"  {...register("phone")} name="phone" className={objectCheckInput.isValidPhone ? 'form-control form-control-lg is-valid ' : 'form-control is-invalid'} placeholder="Your Phone" />
													<label className="form-label" htmlFor="form3Example1n1">Phone Number</label>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-outline ">
													<input type="text"  {...register("address")} name="address" className={objectCheckInput.isValidAddress ? 'form-control form-control-lg is-valid ' : 'form-control is-invalid'} placeholder=" Your Address" />
													<label className="form-label" htmlFor="form3Example8">Address</label>
												</div>
											</div>
										</div>

										<div className="d-md-flex justify-content-start align-items-center mb-2 py-2">
											<h6 className="mb-0 me-4">Gender: </h6>
											<div className="form-check form-check-inline mb-0 me-4">
												<input className="form-check-input" type="radio" name='Gender'
													value="Nữ" {...register("Gender")} />
												<label className="form-check-label" htmlFor="flexRadioDefault1">Nữ</label>
											</div>

											<div className="form-check form-check-inline mb-0 me-4">
												<input className="form-check-input" type="radio" name="Gender"
													value="Nam" {...register("Gender")} />
												<label className="form-check-label" htmlFor="flexRadioDefault2">Nam</label>
											</div>

											<div className="form-check form-check-inline mb-0">
												<input className="form-check-input" type="radio" name="Gender"
													value="Giới tích thứ 3" {...register("Gender")} />
												<label className="form-check-label" htmlFor="flexRadioDefault3">Giới tích thứ 3</label>
											</div>

										</div>
										<div className="form-outline mb-4">
											<input type="text"  {...register("userName")} name="userName" className={objectCheckInput.isValidUserName ? 'form-control form-control-lg is-valid ' : 'form-control is-invalid'} placeholder=" Your UserName" />
											<label className="form-label" htmlFor="form3Example99">User Name</label>
										</div>
										<div className="d-flex justify-content-end pt-3">
											<button type="button" className="btn btn-light btn-lg ms-3 text-uppercase" onClick={() => handLogin()}>back to login</button>
											<button type="submit" className="btn btn-warning btn-lg ms-2 text-uppercase">create account</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}
export default Register
