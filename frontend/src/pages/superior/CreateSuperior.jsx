/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import api from '../../utils/Api';
import Spans from '../../components/Spans';

export default function CreateSuperior() {
  const [superior, setSuperior] = useState({
    nome: '',
    cracha: '',
    cargo: '',
    email: '',
    idSector: '',
  });
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState(null);
  const [areas, setAreas] = useState([]);
  const toast = useRef(null);

  const showWarn = () => {
    toast.current.show({
      severity: 'warn', summary: 'Aviso', detail: 'Um ou mais campos estão vazios.', life: 3000,
    });
  };

  const showSuccess = (msg) => {
    toast.current.show({
      severity: 'success', summary: 'Concluído', detail: msg, life: 3000,
    });
  };

  const showError = (msg) => {
    toast.current.show({
      severity: 'error', summary: 'Erro', detail: msg, life: 3000,
    });
  };

  const findAreas = async () => {
    const data = await api.get('/sector');
    setAreas(data.data);
  };

  useEffect(() => {
    if (areas.length === 0) {
      findAreas();
    }
  }, [areas]);

  const onChange = (e) => {
    if (e.target.name === 'area') {
      setSelectedArea(e.target.value);
    }
    setSuperior({ ...superior, [e.target.name]: e.target.value });
  };

  const checkInput = (object) => {
    if (object.nome === '' || object.cargo === '' || object.cracha === '' || object.email === '' || object.idSector === '') {
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    try {
      if (selectedArea !== null) {
        const parsedSuperior = ({ ...superior, idSector: selectedArea.id });
        if (checkInput(parsedSuperior) === true) {
          await api.post('/superior', { ...parsedSuperior }).then(() => {
            showSuccess('Superior imediato criado com sucesso!');
            setTimeout(() => {
              navigate('/app/superior');
            }, 2000);
          });
        } else {
          showWarn();
        }
      } else {
        showWarn();
      }
    } catch (error) {
      showError('Ocorreu um erro ao se comunicar com o backend.');
    }
  };

  const superiorRoute = () => {
    navigate('/app/superior');
  };
  return (
    <div>

      <div style={innerWidth > 600 ? { display: 'flex', justifyContent: 'center', margin: '60px' } : {}}>
        <div style={innerWidth > 600 ? { width: '70%' } : {}}>
          <div
            className="card"
            style={{
              display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '5vw', paddingRight: '5vw',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '50px' }}><h1>Cadastrar Superior Imediato</h1></div>
            <div className="p-inputgroup">
              <Spans icon="pi pi-user" />
              <InputText name="nome" onChange={(e) => { onChange(e); }} id="name" placeholder="Nome completo" />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-tag" />
              <InputText
                type="number"
                placeholder="Crachá"
                name="cracha"
                onChange={(e) => { onChange(e); }}
              />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-briefcase" />
              <InputText name="cargo" onChange={(e) => { onChange(e); }} placeholder="Cargo" />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-inbox" />
              <InputText
                type="email"
                placeholder="Email"
                useGrouping={false}
                name="email"
                onChange={(e) => { onChange(e); }}
              />
            </div>

            <div className="p-inputgroup">
              <Spans icon="pi pi-table" />
              <Dropdown
                value={selectedArea}
                onChange={(e) => { onChange(e); }}
                name="area"
                options={areas}
                optionLabel="nome"
                placeholder="Selecione uma área"
                className="w-full md:w-14rem"
              />
            </div>
            <div
              className="flex justify-content-end gap-3"
              style={{
                marginTop: '50px',
              }}
            >
              <Button label="Cancelar" onClick={superiorRoute} />
              <Button label="Confirmar" onClick={onSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Toast ref={toast} />
      </div>
    </div>
  );
}
