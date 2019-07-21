import React from 'react';
import { observer, inject } from 'mobx-react';

import EditForm from './EditForm'

const EditFormContainer = inject('peopleStore', 'viewStore')(observer(({ peopleStore,  viewStore}) =>
  {
    const { key, toggleVisibleEditForm, visibleEditForm } = viewStore;
    if (!visibleEditForm) {
      return null;
    }
    const addMan = man => {
      toggleVisibleEditForm();
      peopleStore.addMan(man);
    };
    const editMan = man => {
      toggleVisibleEditForm();
      peopleStore.editMan(key, man);
    };
    const handleOk = key ? editMan : addMan;

    const handleCancel = () => {
      toggleVisibleEditForm();
    };

    const title = key ? 'Edit profile' : 'Add profile';
    const man = key ? peopleStore.getManByKey(key) : {};

    return <EditForm
      peopleStore = {peopleStore}
      title = {title}
      viewStore = {viewStore}
      visible = {visibleEditForm}
      handleOk = {handleOk}
      handleCancel = {handleCancel}
      man = {man}
    />
  }
));

export default EditFormContainer;