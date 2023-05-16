import React from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import logo from '../img/logo.jpg';

export default function SideBar() {
  const items = [
    {
      label: 'Administradores',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Cadastrar',
          icon: 'pi pi-fw pi-plus',
          url: '/admin/cadastrar',
        },
        {
          label: 'Listar',
          icon: 'pi pi-fw pi-list',
          url: '/admin',
        },
      ],
    },
    {
      label: 'Superiores Imediatos',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Cadastrar Superior',
          icon: 'pi pi-fw pi-plus',
          url: '/supervisor/cadastrar',
        },
        {
          label: 'Listar Superior',
          icon: 'pi pi-fw pi-list',
          url: '/supervisor',
        },
      ],
    },
    {
      label: 'Questionários',
      icon: 'pi pi-fw pi-question',
      items: [
        {
          label: 'Cadastrar Questões',
          icon: 'pi pi-fw pi-plus',
          url: '/quizes/CreateQuestions',
        },
        {
          label: 'Listar Questões',
          icon: 'pi pi-fw pi-list',
          url: '/quizes/QuestionsList',
        },
        {
          label: 'Criar Modelo de Questionário',
          icon: 'pi pi-fw pi-plus',
          url: '/quizes/CreateQuiz',
        },
        {
          label: 'Listar Modelo de Questionário',
          icon: 'pi pi-fw pi-list',
          url: '/quizes/QuizesList',
        },
      ],
    },
    {
      label: 'Areas',
      icon: 'pi pi-fw pi-th-large',
      items: [
        {
          label: 'Cadastrar',
          icon: 'pi pi-fw pi-plus',
          url: '/area/cadastrar',
        },
        {
          label: 'Listar',
          icon: 'pi pi-fw pi-list',
          url: '/area',
        },
      ],
    },
    {
      label: 'Relatórios',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Abrir Relatório',
          icon: 'pi pi-fw pi-plus',
        },
      ],
    },
  ];

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
      }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={logo} alt="" style={{ height: '100px' }} />
          <div
            className="flex"
            style={{
              borderRadius: '5px', backgroundColor: '#9c27b0', color: 'white', padding: '10px',
            }}
          >
            user
          </div>
        </div>
        <div style={{ color: 'black' }}>
          <PanelMenu
            model={items}
          />
        </div>
      </div>
    </div>
  );
}
