import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';


import './styles.css';
import TeacherItem, {Classes} from '../../components/TeacherItem';
import api from '../../services/api';


const TeacherList: React.FC = () => {

  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(event: FormEvent){
    event.preventDefault();
   const response = await api.get('/classes',{
      params:{
        subject,
        week_day,
        time
      }
    });
    console.log(response.data);
    setTeachers(response.data);
  }

  return(
    <div id="page-teacher-list" className="container">
      <PageHeader
        title="Estes são os proffys disponíveis"
      >
        <form onSubmit={searchTeachers} id="search-teachers">

          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(event) => {setSubject(event.target.value)}}
            options={[
              {value:'Artes', label: 'Artes'},
              {value:'Ciências', label: 'Ciências'},
              {value:'Biologia', label: 'Biologia'},
              {value:'História', label: 'História'},
              {value:'Português', label: 'Português'},
            ]}
          />
          <Select
            name="week-day"
            label="Dia da semana"
            value={week_day}
            onChange={(event) => {setWeekDay(event.target.value)}}
            options={[
              {value:'0', label: 'Domingo'},
              {value:'1', label: 'Segunda-feira'},
              {value:'2', label: 'Terça-feira'},
              {value:'3', label: 'Quarta-feira'},
              {value:'4', label: 'Quinta-feira'},
              {value:'5', label: 'Sexta-feira'},
              {value:'6', label: 'Sábado'},

            ]}
          />

          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(event) => {setTime(event.target.value)}}
          />
          <button type="submit">Buscar</button>
          </form>
        </PageHeader>
        <main>
          {teachers.map((item:Classes)=>{
            console.log(item)
            return(
            <TeacherItem
              key={item.id}
              classes={item}
            />


            )
          })}
        </main>

    </div>
  );
}

export default TeacherList;
