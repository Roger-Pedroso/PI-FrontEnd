/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputMask } from 'primereact/inputmask';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Toast } from 'primereact/toast';
import api from '../../utils/Api';
import Spans from '../../components/Spans';

export default function Cadastro() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const toast = useRef(null);
  const [admin, setAdmin] = useState({
    nome: '',
    email: '',
    ramal: '',
    cracha: '',
    senha: '',
  });

  const showSuccess = (msg) => {
    toast.current.show({
      severity: 'success', summary: 'Concluído', detail: msg, life: 3000,
    });
  };

  const showWarn = (msg) => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso', detail: msg, life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar administrador.', life: 3000,
    });
  };

  const onChange = (e) => {
    if (e.target.name === 'nascimento') {
      const date = (e.target.value);
      setAdmin({ ...admin, nascimento: format(new Date(date), 'yyyy-MM-dd') });
    } else {
      setAdmin({ ...admin, [e.target.name]: e.target.value });
    }
  };

  const checkInput = (object) => {
    if (object.nome === '' || object.email === '' || object.ramal === '' || object.cracha === '' || object.senha === '') {
      return false;
    }
    return true;
  };

  const checkPass = (object) => {
    if (object.senha !== password) {
      return false;
    } return true;
  };

  const onSubmit = async () => {
    if (checkInput(admin)) {
      if (checkPass(admin)) {
        try {
          await api.post('/user', { ...admin });
          showSuccess('Administrador cadastrado!');
          setTimeout(() => {
            navigate('/app/admin');
          }, 2000);
        } catch (error) {
          showError();
        }
      } else {
        showWarn('Senhas não conferem!');
      }
    } else {
      showWarn('Um ou mais campos estão vazios.');
    }
  };
  return (

    <>

      <div style={innerWidth > 600 ? { display: 'flex', justifyContent: 'center', margin: '60px' } : {}}>
        <div style={innerWidth > 600 ? { width: '70%' } : {}}>
          <div
            className="card"
            style={{
              display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '5vw', paddingRight: '5vw',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h1>Cadastro de Administradores</h1>
            </div>
            <div className="p-inputgroup">
              <Spans icon="pi pi-user" />
              <InputText name="nome" onChange={(e) => { onChange(e); }} id="name" placeholder="Nome completo" />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-inbox" />
              <InputText name="email" onChange={(e) => { onChange(e); }} id="email" placeholder="Email" />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-tag" />

              <InputText
                placeholder="Crachá"
                type="number"
                name="cracha"
                onChange={(e) => { onChange(e); }}
              />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-calendar" />
              <Calendar name="nascimento" onChange={(e) => { onChange(e); }} id="date" placeholder="Data de Nascimento" useGrouping={false} />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-phone" />
              <InputMask name="ramal" onChange={(e) => { onChange(e); }} mask="452103-9999" placeholder="Ramal" useGrouping={false} />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-key" />
              <Password
                toggleMask
                placeholder="Senha"
                name="senha"
                onChange={(e) => { onChange(e); }}
              />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-key" />
              <Password
                onChange={(e) => setPassword(e.target.value)}
                feedback={false}
                toggleMask
                placeholder="Confirmação de senha"
              />
            </div>

            <div
              className="flex justify-content-end gap-3"
              style={{
                marginTop: '50px',
              }}
            >
              <Button label="Cancelar" onClick={() => navigate('/app/admin')} />
              <Button label="Confirmar" type="button" onClick={onSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Toast ref={toast} />
      </div>
    </>
  );
}
