import React from 'react';
import { observer, inject } from 'mobx-react';

import PeopleTable from './PeopleTable'

const PeopleTableContainer = inject('peopleStore', 'peopleTableStore')(observer(({ peopleStore,  peopleTableStore}) =>
  {
    const onDelManButtonClick = () => {
      const {selectedRowKeys, setSelectedRowKeys} = peopleTableStore;
      peopleStore.delPeople(selectedRowKeys);
      setSelectedRowKeys([]);
    };
    const onAddManButtonClick = () => {
      peopleStore.rootstore.viewStore.key = '';
      peopleStore.rootstore.viewStore.toggleVisibleEditForm()
    };
    return <PeopleTable
      peopleStore={peopleStore}
      tableStore={peopleTableStore}
      onDelButtonClick={onDelManButtonClick}
      onAddButtonClick={onAddManButtonClick}
    />
  }
));

export default PeopleTableContainer;