import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import '../Group.scss'
import { showAllGroup, deleteGroup } from '../../../Services/groupService'
import ReactPaginate from 'react-paginate';
import ModalDelete from './ModalDeleteGroup'
import EditRole from './ModalEditGroup';
import { toast } from 'react-toastify';



export default forwardRef(function TableGroup (props, ref) 
{

	const [listGroup, setListGroup] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentLimit] = useState(4);
	const [totalPages, setTotalPages] = useState(0)
	const [isShowModalDelete, setIsShowModalDelete] = useState(false)
	const [isShowModalEdit, setIsShowModalEdit] = useState(false)

	const [dataModal, setDataModal] = useState({})
	//========================================
	/**
	 * @param {Use useEffect} for fetchRoles
	 */
	useEffect(() =>
	{
		fetchGroup();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage])
	useImperativeHandle(ref, () => ({
		fetchListRoleAgain ()
		{
			fetchGroup();
		}
	}));
	const fetchGroup = async () =>
	{
		let message = await showAllGroup(currentPage, currentLimit)
		if (message && message.errorCode === 0)
		{
			setTotalPages(message.errorData.totalPages);
			if (message.errorData.totalPages > 0 && message.errorData.group.length === 0)
			{
				setCurrentPage(+message.errorData.totalPages)
				await showAllGroup(+message.errorData.totalPages, currentLimit)
			}
			if (message.errorData.totalPages > 0 && message.errorData.group.length > 0)
			{
				setListGroup(message.errorData.group);
			}
		} else
		{
			toast.error(message.errorMessage)
		}
	}
	const handlePageClick = async (event) =>
	{
		setCurrentPage(+event.selected + 1)
	}
	//===========================================================
	/**
	 * 
	 * @param {DELETE} For role 
	 */

	const handleDeleteClose = () =>
	{
		setIsShowModalDelete(false)
		setDataModal({})
	}
	const handleDeleteGroup = (group) =>
	{
		setDataModal(group)
		setIsShowModalDelete(true)
	}
	const confirmDeleteRole = async () =>
	{
		let message = await deleteGroup(dataModal)
		if (message && message.errorCode === 0)
		{
			fetchGroup()
			toast.success(message.errorMessage)
			setIsShowModalDelete(false)
		} else
		{
			toast.error(message.errorMessage)
		}
	}
	//===============================
	/**
	 * @param {UPDATE} For role
	 */

	const handleEditRoles = (group) =>
	{
		setDataModal(group)
		setIsShowModalEdit(true)
	}
	const handleCloseEdit = () =>
	{
		setIsShowModalEdit(false)
		setDataModal({})
	}
	const handleRefresh = async () =>
	{
		await fetchGroup()
	}


	return (
		<div className="container">
			<div className="row">
				<div className="col-xl-12 col-sm-12 ">
					<div className="manage-role-container">
						<div className="role-header">
							<div className=" account mt-2">
								<button type="button" className="btn btn-warning me-2" onClick={() => handleRefresh()} > <i className="fa fa-refresh" aria-hidden="true"></i>Tải Lại</button>
							</div>
							<div className="user-table mt-2">
								<table className="table table-warning table-hover">
									<thead>
										<tr className="table-info" >
											<th scope="col">#</th>
											<th scope="col">Id</th>
											<th scope="col">name</th>
											<th scope="col">Nội Dung</th>
											<th scope="col"> Chức Năng</th>
										</tr>
									</thead>
									<tbody>
										{listGroup && listGroup.length > 0 ?
											<>
												{listGroup.map((item, index) =>
												{
													return (
														<tr key={`row-${index}`} >
															<th scope="row">{(currentPage - 1) * currentLimit + index + 1}</th>
															<td>{item.id}</td>
															<td>{item.name}</td>
															<td>{item.description}</td>
															<td>
																<button type="button" className="btn btn-danger me-2"
																	onClick={() => handleDeleteGroup(item)}
																	title="Delete User"
																>
																	<i className="fa fa-trash-o" aria-hidden="true" ></i>
																</button>
																<button type="button" className="btn btn-info"
																	onClick={() => handleEditRoles(item)}
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
											<><tr><td colSpan={5} className="text-capitalize">vui lòng tải lại trang website</td></tr></>
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
			<ModalDelete
				show={isShowModalDelete}
				handleClose={handleDeleteClose}
				confirmDeleteRole={confirmDeleteRole}
				dataModal={dataModal}
			/>
			<EditRole
				show={isShowModalEdit}
				handleClose={handleCloseEdit}
				dataModal={dataModal}
				setDataModal={setDataModal}
				fetchUsers={fetchGroup}
			/>
		</div>
	)
})
