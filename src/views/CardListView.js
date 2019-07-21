import React from 'react';
import { observer, inject } from 'mobx-react';

import PeopleCards from '../components/PeopleCards'

const CardListView = inject('peopleStore')(observer(({ peopleStore }) =>
  {
    if (!peopleStore.loaded){
      return <div style={{paddingTop: '20px'}}>Загрузка</div>
    }
    const onEditManButtonClick = key => {
      peopleStore.rootstore.viewStore.key = key;
      peopleStore.rootstore.viewStore.toggleVisibleEditForm()
    };
    return (
      <PeopleCards
        dataSource = {peopleStore.people}
        fieldList = {peopleStore.fieldList}
        onEditClick = {onEditManButtonClick}
      />
    );
  }
));

export default CardListView;
