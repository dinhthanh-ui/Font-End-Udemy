import React, { useState, useRef } from 'react'
import './Group.scss'
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createGroup } from '../../Services/groupService'
import TableGroup from './group/TableGroup';

export default function Group ()
{

	const setTime = () =>
	{
		window.location.reload()
	}
	const dataChildrenDefault = {
		name: "",
		description: "",
		isValidUrl: true,
		isValidDescription: true,
	}
	const childRef = useRef();
	const [listChildren, setListChildren] = useState({
		children: dataChildrenDefault
	})
	const handleOnchangeInput = (name, value, key) =>
	{
		let _listChildren = _.cloneDeep(listChildren);
		_listChildren[key][name] = value;
		if ((value && name === "name") || (value && name === "description"))
		{
			_listChildren[key]['isValidUrl'] = true;
			_listChildren[key]['isValidDescription'] = true;
		}
		setListChildren(_listChildren)
	}
	const handleAddNewInput = () =>
	{
		let _listChildren = _.cloneDeep(listChildren);
		_listChildren[`children-${uuidv4()}`] = dataChildrenDefault;
		setListChildren(_listChildren)
	}
	const handleDeleteInput = (key) =>
	{
		let _listChildren = _.cloneDeep(listChildren);
		delete _listChildren[key];
		setListChildren(_listChildren);
	}
	const handleSaveGroup = async () =>
	{
		// eslint-disable-next-line array-callback-return
		let check = Object.entries(listChildren).find(([__key, __value], index) =>
		{
			return ((__value && !__value.name) || (__value && !__value.description));
		})
		if (!check)
		{
			let data = buildDataToPersist();
			let message = await createGroup(data);
			if (message && message.errorCode === 0)
			{
				toast.success(message.errorMessage)
				childRef.current.fetchListRoleAgain()
				setTimeout(setTime, 3000)
			} else
			{
				toast.error(message.errorMessage)
			}

		} else
		{
			toast.error("Thông Tin Không Được Để Trống !!!")
			const key = check[0];
			let _listChildren = _.cloneDeep(listChildren);
			_listChildren[key]["isValidUrl"] = false;
			_listChildren[key]["isValidDescription"] = false;
			setListChildren(_listChildren)
		}
	}
	const buildDataToPersist = () =>
	{
		let _listChildren = _.cloneDeep(listChildren);
		let result = [];
		// eslint-disable-next-line array-callback-return
		Object.entries(_listChildren).map(([__key, __value], index) =>
		{
			result.push({
				name: __value.name,
				description: __value.description
			})
		})
		return result;
	}
	return (
		<div className="role-container">
			<div className="container">
				<div className="adding-roles mt-3">
					<div className="title-row">
						<h4>
							Add a New Group ......
						</h4>
					</div>
					<div className="role-parent">
						{Object.entries(listChildren).map(([__key, __value], index) =>
						{
							return (
								<div className="row role-children" key={`children-${__key}`}>
									<div className={`col-5 form-group ${__key}`}>
										<label className="">Name : </label>
										<input
											type="text"
											className={__value.isValidUrl ? 'form-control is-valid ' : 'form-control is-invalid'}
											defaultValue={__value.name}
											onChange={(event) => handleOnchangeInput('name', event.target.value, __key)}
										/>
									</div>
									<div className="col-5 form-group">
										<label className="">Description : </label>
										<input
											type="text"
											className={__value.isValidDescription ? 'form-control is-valid ' : 'form-control is-invalid'}
											defaultValue={__value.description}
											onChange={(event) => handleOnchangeInput('description', event.target.value, __key)}
										/>
									</div>
									<div className="col-2 mt-4 actions">
										<i className="fa fa-plus-square create" onClick={() => handleAddNewInput()} aria-hidden="true"></i>
										{index >= 1 &&
											<i className="fa fa-trash-o delete" aria-hidden="true" onClick={() => handleDeleteInput(__key)}></i>
										}
									</div>
								</div>
							)
						}
						)}
						<div className="">
							<button className="btn btn-warning mt-2" onClick={() => handleSaveGroup()}> Save </button>
						</div>
					</div>
				</div>
				<hr />
				<div className="mt-3">
					<h4 className="text-capitalize fst-italic fw-bolder text-center my-4 border border-primary border-4 rounded-pill p-3 manage-role"> danh sách quyền của người dùng </h4>
					<TableGroup />
				</div>
			</div>
		</div>
	)
}


// ref = { childRef }