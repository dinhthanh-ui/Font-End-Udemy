import { React } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function ModalDeleteRole (props)
{
	return (
		<>
			<Modal show={props.show} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Xác Nhận Xóa Nhóm Của Người Dùng</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo,Bạn Có Chắc Chắn Muốn Xóa Tên Nhóm <span className="p-1 bg-secondary text-white border border-secondary my-2 rounded-pill">{props.dataModal.name}</span> Này Không ????</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.handleClose}>
						Thoát
					</Button>
					<Button variant="primary" onClick={props.confirmDeleteRole}>
						Xác Nhận
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}