import React, { useState, forwardRef, useImperativeHandle } from 'react'

export default forwardRef(function GenerateOTP (props, ref) 
{
	const [orgOTP, setOrgOTP] = useState("");
	const handleClickButton = () =>
	{
		const otp = Math.floor(100000 + Math.random() * 900000);
		setOrgOTP(otp);
		props.setOrgOtpParent(otp)
	}
	useImperativeHandle(ref, () =>
	({
		GenerateOTPParent ()
		{
			const otp = Math.floor(100000 + Math.random() * 900000);
			setOrgOTP(otp);
			props.setOrgOtpParent(otp)
		}

	}))
	return (
		<div className="generate-otp-container">
			<div className="row">
				<div className="text-center mt-5">
					<button type="button" className="btn btn-warning" onClick={() => handleClickButton()}> Generate OTP</button>
					<div className="text-uppercase">
						đây là mã otp của bạn: <span className=" text-danger border border-danger rounded-pill p-2 bg-secondary bg-opacity-25">{orgOTP}</span>
					</div>
				</div>
			</div>
		</div>
	)
})
