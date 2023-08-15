import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.page';
import ContactBook from './components/ContactBook/ContactBook';
import NotFound from './pages/NotFound.page';
import { User } from './types/User';
import * as utils from './utils/authHandlers';
import './styles/index.css';
import MainLayout from './components/Layout/MainLayout';
import PleaseLogin from './components/Login/PleaseLogin';

const App = () => {
  const [user, setUser] = useState<User>({
    _id: '',
    nickname: '',
    email: ''
  });

  useEffect(() => {
    utils.getUserData(setUser);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<MainLayout user={user} setUser={setUser} />}
          >
            <Route index={true} element={<Home />} />
            <Route
              path="contactbook"
              element={<ContactBook user={user} setUser={setUser} />}
            />
            <Route path="login" element={<PleaseLogin setUser={setUser} />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
