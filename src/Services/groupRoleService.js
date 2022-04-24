
import axios from '../SetUp/axios';
const showAllRole = () =>
{
	return axios.get('/api/v1/role/allShow')
}
const getRoleByGroup = (groupId) =>
{
	return axios.get(`/api/v1/role/by-group/${groupId}`)
}
const assignRolesToGroup = (groupId, groupRole) =>
{
	return axios.post('/api/v1/role/assign-to-group', {
		groupId: groupId,
		groupRole: groupRole
	})
}
export { showAllRole, getRoleByGroup, assignRolesToGroup }