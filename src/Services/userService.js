import axios from '../SetUp/axios';



const showAllUsers = (page, limit) =>
{
	return axios.get(`/api/v1/user/show?page=${page}&&limit=${limit}`)
}
const deleteUser = (user) =>
{
	return axios.delete('/api/v1/user/delete', { data: { id: user.id } })
}

const createUsers = (fullName, email, password, phone, address, gender, userName, group) =>
{
	return axios.post('/api/v1//user/create', {
		fullName: fullName,
		email: email,
		password: password,
		phone: phone,
		address: address,
		sex: gender,
		userName: userName,
		GroupId: group
	})
}
const editUsers = (id, fullName, address, gender, userName, group) =>
{
	return axios.put('/api/v1/user/update', {
		id: id,
		fullName: fullName,
		address: address,
		sex: gender,
		userName: userName,
		GroupId: group
	})
}
const getUserAccounts = () =>
{
	return axios.get('/api/v1/account')
}
const logoutUser = () =>
{
	return axios.post('/api/v1/logout')
}
const fetchGroup = () =>
{
	return axios.get('/api/v1/group/show')
}

export { showAllUsers, deleteUser, createUsers, editUsers, getUserAccounts, logoutUser, fetchGroup }