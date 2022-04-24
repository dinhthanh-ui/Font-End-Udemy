import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Components/Navigation/Navigation';
import AppRoute from './Route/AppRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Watch } from 'react-loader-spinner'
import { UserContext } from './Context/UserContext'
import './App.scss';
import { Scrollbars } from 'react-custom-scrollbars-2';

function App ()
{
  const { user } = React.useContext(UserContext)
  const [scrollHeight, setScrollHeight] = useState(0)
  useEffect(() =>
  {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);
  }, [user])
  return (
    <Scrollbars autoHide style={{ height: scrollHeight }}>
      <Router>
        {user && user.isLoading ?
          <div className="Loading-container">
            <Watch
              height="100"
              width="100"
              color='#00BFFF'
              ariaLabel='loading'
            />
            <div>Xin vui lòng chờ trong giây lát .....</div>
          </div>
          :
          <>
            <div className="app-header">
              <Nav />
            </div>
            <div className="app-container">
              <AppRoute />
            </div>
          </>
        }
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Scrollbars>
  );
}

export default App;
