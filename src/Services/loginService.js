import axios from '../SetUp/axios';

/**
 * @Initialized Axios
 * @Initialized Create a new User
 */

const handLoginUer = (valueLogin, password) =>
{
	return axios.post('/api/v1/login', {
		valueLogin: valueLogin,
		password: password
	})
}
/**
	 * @Initialized Axios
	 * @Initialized Create a new User
	 */
const registerUser = (fullName, email, password, phone, address, gender, userName) =>
{
	return axios.post('/api/v1/register', {
		fullName: fullName,
		email: email,
		password: password,
		phone: phone,
		address: address,
		sex: gender,
		userName: userName
	})
}
export { handLoginUer, registerUser }