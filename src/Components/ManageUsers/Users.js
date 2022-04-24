import React, { useState, useEffect } from 'react'
import './Users.scss'
import { showAllUsers, deleteUser } from '../../Services/userService'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import ModalDelete from './ModalDeleteUser'
import EditUser from './EditUser'

////////////////////////////////////////////////////////////////
export default function Users (props)
{
	const [listUsers, setListUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentLimit] = useState(4);
	const [totalPages, setTotalPages] = useState(0)
	const [isShowModalDelete, setIsShowModalDelete] = useState(false)
	const [isShowModalEdit, setIsShowModalEdit] = useState(false)
	const [dataModal, setDataModal] = useState({})
	const [dataGroup, setDataGroup] = useState({})
	let history = useHistory();

	////////////////////////////////////////////////////////////////
	useEffect(() =>
	{
		fetchUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage])



	const fetchUsers = async () =>
	{
		let message = await showAllUsers(currentPage, currentLimit)
		if (message && message.errorCode === 0)
		{
			setTotalPages(message.errorData.totalPages);
			if (message.errorData.totalPages > 0 && message.errorData.users.length === 0)
			{
				setCurrentPage(+message.errorData.totalPages)
				await showAllUsers(+message.errorData.totalPages, currentLimit)
			}
			if (message.errorData.totalPages > 0 && message.errorData.users.length > 0)
			{
				setListUsers(message.errorData.users);
			}
		} else
		{
			toast.error(message.errorMessage)
		}
	}
	// =================================================================
	const handlePageClick = async (event) =>
	{
		setCurrentPage(+event.selected + 1)
	}
	// ===============================
	/**
	 * 
	 * @param {Delete} for Users 
	 */
	const handleDeleteUser = (user) =>
	{
		setDataModal(user)
		setIsShowModalDelete(true)
	}
	const confirmDeleteUser = async () =>
	{
		let message = await deleteUser(dataModal)
		if (message && message.errorCode === 0)
		{
			fetchUsers()
			toast.success(message.errorMessage)
			setIsShowModalDelete(false)
		} else
		{
			toast.error(message.errorMessage)
		}
	}
	const handleDeleteClose = () =>
	{
		setDataModal({})
		setIsShowModalDelete(false)
	}
	// ===============================
	const handleCreate = () =>
	{
		history.push('/create')
	}
	// ===============================
	/**
	 * 
	 * @param {Edit for User} user 
	 */
	const handleEditUser = (user) =>
	{
		setDataGroup(user.Group.name)
		setDataModal(user)
		setIsShowModalEdit(true)
	}
	const handleCloseEdit = () =>
	{
		setIsShowModalEdit(false)
		setDataModal({})
	}
	// ========================================
	const handleRefresh = async () =>
	{
		await fetchUsers()
	}
	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-xl-12 col-sm-12">
						<div className="manage-users-container">
							<div className="user-header">
								<div>
									<h3 className="manage-user text-center my-4 border border-primary border-4 rounded-pill p-3 text-uppercase">
										Manage User
									</h3>
								</div>
								<div className="actions mt-2">
									<button type="button" className="btn btn-warning me-2" onClick={() => handleRefresh()} > <i className="fa fa-refresh" aria-hidden="true"></i>Tải Lại</button>
									<button type="button" className="btn btn-success" onClick={() => handleCreate()}><i className="fa fa-plus-square" aria-hidden="true"></i> Thêm Mới</button>
								</div>
								<div className="user-table mt-2">
									<table className="table table-warning table-hover">
										<thead>
											<tr className="table-info" >
												<th scope="col">No</th>
												<th scope="col">Id</th>
												<th scope="col">Email</th>
												<th scope="col">Họ Và tên</th>
												<th scope="col">Địa Chỉ</th>
												<th scope="col">Tên Người Dùng</th>
												<th scope="col">Số Điện Thoại</th>
												<th scope="col">Giới Tính</th>
												<th scope="col">Group</th>
												<th scope="col"> Chức Năng</th>
											</tr>
										</thead>
										<tbody>
											{listUsers && listUsers.length > 0 ?
												<>
													{listUsers.map((item, index) =>
													{
														return (
															<tr key={`row-${index}`} >
																<th scope="row">{(currentPage - 1) * currentLimit + index + 1}</th>
																<td>{item.id}</td>
																<td>{item.email}</td>
																<td>{item.fullName}</td>
																<td>{item.address}</td>
																<td>{item.userName}</td>
																<td>{item.phone}</td>
																<td>{item.sex}</td>
																<td>{item.Group ? item.Group.name : ""}</td>
																<td>
																	<button type="button" className="btn btn-danger me-2"
																		onClick={() => handleDeleteUser(item)}
																		title="Delete User"
																	>
																		<i className="fa fa-trash-o" aria-hidden="true" ></i>
																	</button>
																	<button type="button" className="btn btn-info"
																		onClick={() => handleEditUser(item)}
																		title="Edit Use"
																	>
																		<i className="fa fa-pencil" aria-hidden="true" ></i>
																	</button>
																</td>
															</tr>
														)
													})}
												</>
												:
												<><tr><td className="text-capitalize">vui lòng tải lại trang website</td></tr></>
											}
										</tbody>
									</table>
								</div>
								{totalPages > 0 &&
									<div className="user-footer">
										<ReactPaginate
											nextLabel="next >"
											onPageChange={handlePageClick}
											pageRangeDisplayed={2}
											marginPagesDisplayed={4}
											pageCount={totalPages}
											previousLabel="< previous"
											pageClassName="page-item"
											pageLinkClassName="page-link"
											previousClassName="page-item"
											previousLinkClassName="page-link"
											nextClassName="page-item"
											nextLinkClassName="page-link"
											breakLabel="..."
											breakClassName="page-item"
											breakLinkClassName="page-link"
											containerClassName="pagination"
											activeClassName="active"
											renderOnZeroPageCount={null}
											forcePage={+currentPage - 1}
										/>
									</div>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<ModalDelete
				show={isShowModalDelete}
				handleClose={handleDeleteClose}
				confirmDeleteUser={confirmDeleteUser}
				dataModal={dataModal}
			/>
			<EditUser
				show={isShowModalEdit}
				handleClose={handleCloseEdit}
				dataModal={dataModal}
				dataGroup={dataGroup}
				setDataModal={setDataModal}
				fetchUsers={fetchUsers}
			/>
		</div>
	)
}
