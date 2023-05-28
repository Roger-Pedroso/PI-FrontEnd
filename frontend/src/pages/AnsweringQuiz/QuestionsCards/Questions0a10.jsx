/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from 'primereact/rating';
import { AnswersContext } from '../../../context/AnswersContext';

export default function Questions0a10(item) {
  const [targetQuestion, setTargetQuestion] = useState(item.item);
  const { answers, setAnswers } = useContext(AnswersContext);

  useEffect(() => {
    if (targetQuestion === null) {
      setTargetQuestion(item.item);
    }
  }, [targetQuestion]);
  const [value, setValue] = useState(null);

  const handleValueChange = (e) => {
    setValue(e.value);
    const indice = answers.findIndex((answer) => answer.id_question === targetQuestion.id);
    if (indice !== -1) {
      const newAnswer = [...answers];
      newAnswer[indice].resposta = e.value;
      setAnswers(newAnswer);
    }
  };
  return (
    <div style={{ width: '100%' }}>
      <div
        className="card flex"
        style={{
          flexDirection: 'column', alignItems: 'center', border: '2px solid black', backgroundColor: 'white', boxShadow: '10px 10px 10px purple',
        }}
      >
        <div style={{ width: '100%', margin: '-10px' }}>
          <p style={{ margin: '-8px', fontSize: '12px' }}>
            <b>
              {targetQuestion.obrigatorio === false ? '*Opcional' : '*Obrigatório'}
            </b>
          </p>
          <p style={{ textAlign: 'end' }}>
            <b>Tipo: </b>
            <i>0 à 10</i>
          </p>
        </div>
        <h2>{targetQuestion.nome_campo}</h2>
        <p><i>{targetQuestion.descricao}</i></p>
        <Rating
          value={value}
          onChange={(e) => handleValueChange(e)}
          stars={10}
          cancel={false}
        />
        <p>
          Nota:
          {' '}
          {value}
        </p>
      </div>
    </div>
  );
}
