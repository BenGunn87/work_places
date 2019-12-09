import React from 'react';
import { observer, inject } from 'mobx-react';

import EditForm from './EditForm'

const EditFormContainer = inject('workPlacesStore', 'viewStore')(observer(({ workPlacesStore,  viewStore}) =>
  {
    const { key, toggleVisibleEditForm, visibleEditForm } = viewStore;
    if (!visibleEditForm) {
      return null;
    }
    const addWorkPlace = workPlace => {
      toggleVisibleEditForm();
      workPlacesStore.addWorkPlace(workPlace);
    };
    const editWorkPlace = workPlace => {
      toggleVisibleEditForm();
      workPlacesStore.editWorkPlace(key, workPlace);
    };
    const handleOk = key ? editWorkPlace : addWorkPlace;

    const handleCancel = () => {
      toggleVisibleEditForm();
    };

    const title = key ? 'Edit workPlace' : 'Add workPlace';
    const workPlace = key ? workPlacesStore.getWorkPlaceByKey(key) : {};

    return <EditForm
      title = {title}
      viewStore = {viewStore}
      visible = {visibleEditForm}
      handleOk = {handleOk}
      handleCancel = {handleCancel}
      data = {workPlace}
    />
  }
));

export default EditFormContainer;