import { React, useState } from 'react'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { editUsers } from '../../Services/userService'


import '../Register/Register.scss'
// import { showGroup } from '../../Services/userService'

const EditUser = (props) =>
{
	const { register, handleSubmit } = useForm();
	// ==========================================
	const checkValid = {
		isValidFullName: true,
		isValidAddress: true,
		isValidUserName: true
	}
	const [objectCheckInput, setCheckInput] = useState(checkValid)
	/**
	 * @param { use useState de set toan bo gia tri}
	 */
	const handEditAccount = async (userData) =>
	{
		const setTime = () =>
		{
			window.location.reload()
		}
		setCheckInput(checkValid);
		/**
		 * @param {*} call variable and use
		 */
		let id = userData.id
		let fullName = userData.fullName
		let address = userData.address
		let gender = userData.Gender
		let userName = userData.userName
		let group = userData.Group
		/**
		 * @param {*} check regex
		*/
		let checkFullName = /[A - zÀ - ÿ]/
		let checkUserName = /^(?=[a-zA-Z0-9._]{8,15}$)/;
		/**
		 * @param {Check}
		 */
		if (!fullName || !checkFullName.test(fullName))
		{
			toast.error("Tên không được để trống và viết có dấu!");
			setCheckInput({ ...checkValid, isValidFullName: false })
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
		if (!group)
		{
			toast.error('Vui Lòng Chọn Nhóm Của Bạn');
			return false;
		}
		if (!userName || !checkUserName.test(userName))
		{
			toast.error(`Vui Lòng Nhập tên tài khoản  trong khoảng 8-15 kỹ tự,không kỹ tự đặc biệt và dấu cách,ví dụ: "dinh_thanh_1997`);
			setCheckInput({ ...checkValid, isValidUserName: false })
			return false;
		}
		let message = await editUsers(id, fullName, address, gender, userName, group)
		if (message && message.errorCode === 0)
		{
			props.fetchUsers()
			props.handleClose()
			toast.success(message.errorMessage)
			setTimeout(setTime, 3000)
		} else
		{
			toast.error(message.errorMessage)
		}
		return true;
	}
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Chỉnh Sửa Người Dùng</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(handEditAccount)}>
					<div className="">
						<div className="row">
							<div className="col-xl-6 ">
								<Form.Group>
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" placeholder={props.dataModal.email} disabled />
								</Form.Group>
								<Form.Group >
									<Form.Label>Điện Thoại</Form.Label>
									<Form.Control type="text" placeholder={props.dataModal.phone} disabled />
								</Form.Group>
							</div>
							<div className="col-xl-6 ">
								<Form.Group>
									<Form.Label>Họ Và Tên</Form.Label>
									<Form.Control type="text" placeholder={props.dataModal.fullName} name="fullName" {...register("fullName")} className={objectCheckInput.isValidFullName ? 'form-control form-control-lg is-valid ' : 'form-control is-invalid'} />
								</Form.Group>
								<Form.Group>
									<Form.Label>Địa Chỉ</Form.Label>
									<Form.Control type="text" placeholder={props.dataModal.address} {...register("address")} name="address" className={objectCheckInput.isValidAddress ? 'form-control form-control-lg is-valid ' : 'form-control is-invalid'} />
								</Form.Group>
							</div>
							<div className="col-xl-12 ">
								<Form.Group>
									<Form.Label> Tên Đăng Nhập</Form.Label>
									<Form.Control type="text" placeholder={props.dataModal.userName}  {...register("userName")} name="userName" className={objectCheckInput.isValidUserName ? 'form-control form-control-lg is-valid ' : 'form-control is-invalid'} />
								</Form.Group>
							</div>
							<div className="col-xl-6 my-3 ">
								<Form.Label>Gender : </Form.Label>
								{['radio'].map((type) => (
									<div key={`inline-${type}`} className="mb-1" >
										<Form.Check
											defaultValue="Nam" {...register("Gender")}
											inline
											label="Nam"
											name="Gender"
											type={type}
										/>
										<Form.Check
											defaultValue="Nữ" {...register("Gender")}
											inline
											label="Nữ"
											name="Gender"
											type={type}
										/>
										<Form.Check
											defaultValue="Giới tích thứ 3" {...register("Gender")}
											inline
											label="Giới tích thứ 3"
											name="Gender"
											type={type}
										/>
									</div>
								))}
							</div>
							<div className="col-xl-6 my-3 ">
								<Form.Label>Group </Form.Label>
								{['radio'].map((type) => (
									<div key={`inline-${type}`} className="">
										<Form.Check
											defaultValue="1" {...register("Group")}
											inline
											label="Developers"
											name="Group"
											type={type}
										/>
										<Form.Check
											defaultValue="2" {...register("Group")}
											inline
											label="Leader"
											name="Group"
											type={type}
										/>
										<Form.Check
											defaultValue="4" {...register("Group")}
											inline
											label="Customer"
											name="Group"
											type={type}
										/>
										<Form.Check
											defaultValue="3" {...register("Group")}
											inline
											label="Project Manage"
											name="Group"
											type={type}
										/>
										<Form.Check
											defaultValue="6" {...register("Group")}
											inline
											label="Admin"
											name="Group"
											type={type}
										/>
									</div>
								))}
							</div>
							<Form.Control defaultValue={props.dataModal.id} {...register("id")} name={props.dataModal.id} type="hidden" defaultChecked="checked" />
						</div>
					</div>
					<Modal.Footer>
						<Button variant="secondary" onClick={props.handleClose}>
							Thoát
						</Button>
						<Button variant="primary" type="submit" >
							Xác Nhận
						</Button>
					</Modal.Footer>
				</Form>
			</Modal.Body>
		</Modal>
	)
}
export default EditUser
