import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';

import NotFound from './sections/NotFound';
import Home from './sections/home/Home/Home';
import Login from './sections/sign/Login';
import Register from './sections/sign/Register';
import Follower from './sections/follower/Follow/Follower';
import Mypage from './sections/profile/Profile/Mypage';
import Profile from './sections/profile/Profile/Profile';
import Setting from './sections/setting/Setting/Setting';
import Search from './sections/search/Search/Search';
import React_to_Spring from './sections/React_to_Spring';
import Cloudinary2 from './sections/sign/Cloudinary';
import ImageUpload from './sections/sign/ImageUpload';

// 템플릿



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'follower', element: <Follower /> },
      { path: 'profile/mypage', element: <Mypage /> },
      { path: 'profile', element: <Profile /> },
      { path: 'setting', element: <Setting /> },
      { path: 'search', element: <Search /> },
      { path: 'test', element: <React_to_Spring /> },
      { path: 'cloudinary', element: <Cloudinary2 /> },
      { path: 'image', element: <ImageUpload /> },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();