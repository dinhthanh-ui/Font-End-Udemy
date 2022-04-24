import React, { useState, useEffect } from 'react'
import './Group_Role.scss'
import { fetchGroup } from '../../Services/userService'
import { toast } from 'react-toastify';
import { showAllRole, getRoleByGroup, assignRolesToGroup } from '../../Services/groupRoleService'
import _ from "lodash"
export default function Group_Role ()
{
  const [roleGroup, setRoleGroup] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");
  const [listRole, setListRole] = useState("")
  const [assignRolesByGroup, setAssignRolesByGroup] = useState([])
  const setTime = () =>
  {
    window.location.reload()
  }


  useEffect(() =>
  {
    getGroup()
    getAllRoles()
  }, []);

  const getGroup = async () =>
  {
    let result = await fetchGroup();
    if (result && result.errorCode === 0)
    {
      setRoleGroup(result.errorData);
    } else
    {
      toast.error(result.errorMessage)
    }
  }

  const getAllRoles = async () =>
  {
    let message = await showAllRole();
    if (message && +message.errorCode === 0)
    {
      setListRole(message.errorData);
    }
    else
    {
      toast.error(message.errorMessage)
    }
  }
  const handleOnchangeGroup = async (value) =>
  {
    setSelectGroup(value);
    if (value)
    {
      let message = await getRoleByGroup(value);
      if (message && +message.errorCode === 0)
      {
        let data = buildDataRolesByGroup(message.errorData.Roles, listRole);
        setAssignRolesByGroup(data)
      }
      else
      {
        toast.error(message.errorMessage)
      }
    }
  }
  const buildDataRolesByGroup = (groupRoles, allRoles) =>
  {
    let result = [];
    if (allRoles && allRoles.length > 0)
    {
      // eslint-disable-next-line array-callback-return
      allRoles.map(role =>
      {
        let object = {};
        object.url = role.url;
        object.id = role.id;
        object.description = role.description;
        object.isAssigned = false;
        if (groupRoles && groupRoles.length > 0)
        {
          object.isAssigned = groupRoles.some(item => item.url === object.url)
        }
        result.push(object);
      })
    }
    return result;
  }
  const handleSelectRole = (value) =>
  {
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
    let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value);
    if (foundIndex > -1)
    {
      _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned
    }
    setAssignRolesByGroup(_assignRolesByGroup)
  }

  const buildDataRolesToGroup = () =>
  {
    let result = [];
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
    result.groupId = selectGroup;
    let groupRole = _assignRolesByGroup.filter(item => item.isAssigned === true)
    let finalGroupRole = groupRole.map(item =>
    {
      let res = { GroupId: +selectGroup, RoleId: +item.id };
      return res
    })
    result.groupRole = finalGroupRole;
    return result;
  }


  const handleSave = async () =>
  {
    let data = buildDataRolesToGroup();
    let groupId = data.groupId
    let groupRole = data.groupRole
    let message = await assignRolesToGroup(groupId, groupRole);
    if (message && +message.errorCode === 0)
    {
      toast.success(message.errorMessage)
      setTimeout(setTime, 3000)
    }
  }









  return (
    <div className="group_role_container">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-sm-12 ">
            <h4 className="text-capitalize fst-italic fw-bolder text-center my-4 border border-primary border-4 rounded-pill p-3 manage-group_role"> Chỉ định quyền hạn cho từng nhóm người dùng</h4>
            <div className="row assign-group-role">
              <div className="col-12 col-sm-6 form-group">
                <label className=" mx-3 fw-bolder text-capitalize fst-italic border border-warning border-4 manage-group_role rounded-pill">
                  Chọn nhóm:
                </label>
                <select className={'from-select w-50 h-100  border border-4 rounded-pill'}
                  onChange={(event) => handleOnchangeGroup(event.target.value)}
                >
                  <option value="" > Vui Lòng Chọn Nhóm Của Bạn</option>
                  {roleGroup.length > 0 &&
                    roleGroup.map((item, index) =>
                    {
                      return (
                        <option key={`group-${index}`} value={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <hr />
            {selectGroup &&
              <>
                <div className="row roles mt-3">
                  <div className="col-xl-12 col-sm-12">
                    <div className="col-12 col-sm-6 ">
                      <label className=" mx-3 fw-bolder text-capitalize fst-italic border border-warning border-4 manage-group_role rounded-pill">
                        tất cả quyền hạn của người dùng:
                      </label>
                      {assignRolesByGroup && assignRolesByGroup.length > 0
                        // eslint-disable-next-line array-callback-return
                        && assignRolesByGroup.map((item, index) =>
                        {
                          return (
                            <div className="form-check mt-2" key={`list-role-${index}`}>
                              <input className="form-check-input" type="checkbox"
                                value={item.id} id={`list-role-${index}`}
                                checked={item.isAssigned}
                                onChange={(event) => handleSelectRole(event.target.value)}
                              />
                              <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                {item.url}
                              </label>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                <div className="mt-3 ms-4">
                  <button className="btn btn-warning" onClick={() => handleSave()}> Save </button>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
