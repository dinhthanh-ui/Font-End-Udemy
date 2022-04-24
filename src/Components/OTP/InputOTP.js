import React, { useState, useRef } from 'react'
import OtpInput from 'react-otp-input-rc-17'
import CountDownAnimation from './CountDownAnimation'
export default function InputOTP (props)
{
	const childRef = useRef();
	const [otp, setOtp] = useState("")
	const handleChange = (otp) =>
	{
		setOtp(otp)
		props.setUserOtpParent(otp)
	}
	const handleConfirmOtp = () =>
	{
		props.handleSubmitOtp()
	}
	const handleClearOtp = () =>
	{
		childRef.current.restTimer();
		props.handleClearOtpParent();
		setOtp("")

	}
	return (
		<div className="input-otp">
			<div className="row">
				<div className="my-3">
					<OtpInput
						value={otp}
						onChange={handleChange}
						numInputs={6}
						separator={<span>-</span>}
						inputStyle={"input-current"}
					/>
				</div>
			</div>
			<div className="time">
				<CountDownAnimation
					setIsDisabledBtn={props.setIsDisabledBtn}
					ref={childRef}
				/>
			</div>
			<div className="action">
				<button className="btn btn-danger m-2" disabled={!props.isDisabledBtn} onClick={() => handleClearOtp()}>Gửi Lại Mã OTP</button>
				<button className="btn btn-success" disabled={props.isDisabledBtn} onClick={() => handleConfirmOtp()}> Xác Nhận</button>
			</div>
		</div>
	)
}
