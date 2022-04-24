import axios from '../SetUp/axios';

const createGroup = (data) =>
{
	return axios.post('/api/v1/group/create', [...data]);
}
const showAllGroup = (page, limit) =>
{
	return axios.get(`/api/v1/group/allShow?page=${page}&&limit=${limit}`)
}
const deleteGroup = (group) =>
{
	return axios.delete('/api/v1/group/delete', { data: { id: group.id } })
}
const editGroup = (id, name, description) =>
{
	return axios.put('/api/v1/group/update', {
		id: id,
		name: name,
		description: description,
	})
}
export { createGroup, showAllGroup, deleteGroup, editGroup }