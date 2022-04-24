import React from 'react'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { editRole } from '../../../Services/roleService'


const EditRole = (props) =>
{

	const { register, handleSubmit } = useForm();
	/**
	 * @param { use useState de set toan bo gia tri}
	 */
	const handEditAccount = async (roleData) =>
	{
		const setTime = () =>
		{
			window.location.reload()
		}
		/**
		 * @param {*} call variable and use
		 */
		let id = roleData.id
		let url = roleData.url
		let description = roleData.description
		let message = await editRole(id, url, description)
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
							<div className="col-xl-12 col-md-12 ">
								<Form.Group>
									<Form.Label>Dường Dẫn</Form.Label>
									<Form.Control type="text" placeholder={props.dataModal.url} {...register("url")} />
								</Form.Group>
								<Form.Group >
									<Form.Label>Nội Dung</Form.Label>
									<Form.Control type="text" placeholder={props.dataModal.description}{...register("description")} />
								</Form.Group>
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
export default EditRole
