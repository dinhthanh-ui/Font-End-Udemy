import React, { useState, useRef } from 'react'
import GenerateOTP from './GenerateOTP'
import InputOTP from './InputOTP'
import './Otp.scss'
export default function OTPs ()
{
	const [orgOtpParent, setOrgOtpParent] = useState("");
	const [userOtpParent, setUserOtpParent] = useState("");
	const [isDisabledBtn, setIsDisabledBtn] = useState(false)
	const childrenRef = useRef()
	const handleSubmitOtp = () =>
	{
		if (!orgOtpParent)
		{
			alert(" vui long tao otp")
			return;
		}
		if (!userOtpParent)
		{
			alert(" vui long nhap otp")
			return;
		}
		if (+orgOtpParent === +userOtpParent)
		{
			alert("kết quả thành công")
		} else
		{
			alert(" kết quả thất bại")
		}
	}
	const handleClearOtpParent = () =>
	{
		childrenRef.current.GenerateOTPParent()
	}

	return (
		<div className="show-otp-container">
			<div className="container">
				<GenerateOTP
					setOrgOtpParent={setOrgOtpParent}
					ref={childrenRef}
				/>
				<InputOTP
					setUserOtpParent={setUserOtpParent}
					handleSubmitOtp={handleSubmitOtp}
					isDisabledBtn={isDisabledBtn}
					setIsDisabledBtn={setIsDisabledBtn}
					handleClearOtpParent={handleClearOtpParent}
				/>
			</div>
		</div>
	)
}


