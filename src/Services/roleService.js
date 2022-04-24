import axios from '../SetUp/axios';

const createRoles = (data) =>
{
	return axios.post('/api/v1/role/create', [...data]);
}
const showAllRole = (page, limit) =>
{
	return axios.get(`/api/v1/role/show?page=${page}&&limit=${limit}`)
}
const deleteRole = (role) =>
{
	return axios.delete('/api/v1/role/delete', { data: { id: role.id } })
}
const editRole = (id, url, description) =>
{
	return axios.put('/api/v1/role/update', {
		id: id,
		url: url,
		description: description,
	})
}

export { createRoles, showAllRole, deleteRole, editRole }