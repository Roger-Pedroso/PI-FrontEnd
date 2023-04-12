import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import CreateAdmin from '../pages/admin/CreateAdmin';
import LoginUser from '../pages/login/usuario/UserLogin';
import LoginRecovery from '../pages/login/recuperar/Recovery';
import LoginAdmin from '../pages/login/admin/AdminLogin';
import CreateSuperior from '../pages/superior/CreateSuperior';
import ListSuperior from '../pages/superior/ListSuperior';
import ListArea from '../pages/area/ListArea';
import CreateArea from '../pages/area/CreateArea';
import CreateQuestions from '../pages/quizes/CreateQuestions';

function AllRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginUser />} />
      <Route path="login/admin" element={<LoginAdmin />} />
      <Route path="recuperar" element={<LoginRecovery />} />
      <Route path="/" element={<App />}>
        <Route path="admin/add" element={<CreateAdmin />} />
        <Route path="supervisor/add" element={<CreateSuperior />} />
        <Route path="supervisor" element={<ListSuperior />} />
        <Route path="area" element={<ListArea />} />
        <Route path="area/cadastrar" element={<CreateArea />} />
        <Route path="quizes/CreateQuestions" element={<CreateQuestions />} />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
