import React from 'react'
import PeopleTableContainer from "../components/PeopleTable"
import {inject, observer} from "mobx-react";

const PeopleTableView = inject('peopleStore')(observer(({ peopleStore}) => {
  if (!peopleStore.loaded){
    return <div style={{paddingTop: '20px'}}>Загрузка</div>
  }
  return <PeopleTableContainer/>;
}));


export default PeopleTableView;
