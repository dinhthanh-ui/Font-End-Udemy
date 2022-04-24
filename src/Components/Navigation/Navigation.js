
import React from 'react'
import { NavLink, useLocation, Link, useHistory } from 'react-router-dom';
import './Navigation.scss'
import { UserContext } from '../../Context/UserContext'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo_image from '../../Img/logo-og.png'
import Ztext from 'react-ztext'
import { logoutUser } from '../../Services/userService'
import { toast } from 'react-toastify';

const Navigation = () =>
{
	const history = useHistory();
	const { user, logoutContext } = React.useContext(UserContext);
	const location = useLocation();
	/**
	 * @param { Logout For User}
	 */
	const handleLogout = async () =>
	{
		let message = await logoutUser();
		localStorage.removeItem('jwt')
		logoutContext();
		if (message && +message.errorCode === 0)
		{
			history.push('/');
			toast.success(message.errorMessage)
		} else
		{
			toast.error(message.errorMessage)
		}
	}

	if ((user && user.isAuthenticated === true) || location.pathname === '/' || location.pathname === '/contact' || location.pathname === '/about' || location.pathname === '/otp')
	{
		return (
			<>
				<div className=" nav-header">
					<Navbar bg="header" expand="lg">
						<Container>
							<Navbar.Brand>
								<img src={logo_image} className="nav_img img-fluid" alt="logo" />
								<span className=" banner-name">React</span>
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="me-auto">
									<NavLink exact to="/" className="nav-link">Home</NavLink>
									<NavLink to="/contact" className="nav-link">Contact</NavLink>
									<NavLink to="/about" className="nav-link">About</NavLink>
									<NavLink to="/otp" className="nav-link">OTP</NavLink>
									{user && user.isAuthenticated === true
										?
										<>
											<NavLink to="/project" className="nav-link">Project</NavLink>
											<NavLink to="/users" className="nav-link">Users</NavLink>
											<NavLink to="/role" className="nav-link">Roles</NavLink>
											<NavLink to="/group-role" className="nav-link">Group-Roles</NavLink>
											<NavLink to="/group" className="nav-link">Group</NavLink>
										</>
										:
										<></>
									}
								</Nav>
								<Nav>
									{user && user.isAuthenticated === true
										?
										<>
											<Nav.Item className="nav-link" >
												Welcome
												<Ztext
													depth='60px'
													direction='light'
													event='pointer'
													eventRotation='30deg'
													eventDirection='-30deg'
													fade={false}
													layers={25}
													perspective='500px'
													style={{
														fontSize: '12px',
													}}
												>
													<span className="text-warning p-2 text-uppercase z-tex z-layer ">
														{user.account.fullName}
													</span>  !!!
												</Ztext>
											</Nav.Item>

											<NavDropdown title="Settings" id="basic-nav-dropdown">
												<NavDropdown.Item href="#action/3.1">Đổi Mật Khẩu</NavDropdown.Item>
												<NavDropdown.Divider />
												<NavDropdown.Item> <span onClick={() => handleLogout()}>Đăng Xuất</span></NavDropdown.Item>
											</NavDropdown>
										</>
										:
										<Link className="nav-link" to="/login" >
											Đăng Nhập
										</Link>
									}
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</div>
			</>
		)
	} else
	{
		return <></>
	}
}

export default Navigation