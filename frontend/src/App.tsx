import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.page';
import NotFound from './pages/NotFound.page';
import { User } from './types/User';
import * as utils from './utils/authHandlers';
import './styles/index.css';
import MainLayout from './components/UI/MainLayout';
import PleaseLogin from './components/Login/PleaseLogin';
import InfoMap from './components/Map/InfoMap';

const App = () => {
  const [user, setUser] = useState<User>({
    _id: '',
    nickname: '',
    email: '',
    firstName: '',
    lastName: ''
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
              path="infomap"
              element={<InfoMap />}
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
