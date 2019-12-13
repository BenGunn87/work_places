import React from 'react';
import { observer, inject } from 'mobx-react';

import EditWorkPlaceForm from './EditWorkPlaceForm'

const EditWorkPlaceFormContainer = inject('workPlacesStore', 'viewStore')(observer(({ workPlacesStore,  viewStore}) =>
  {
    const { key, toggleVisibleEditForm, visibleEditWorkPlaceForm } = viewStore;
    if (!visibleEditWorkPlaceForm) {
      return null;
    }
    const addWorkPlace = workPlace => {
      toggleVisibleEditForm('visibleEditWorkPlaceForm');
      workPlacesStore.addWorkPlace(workPlace);
    };
    const editWorkPlace = workPlace => {
      toggleVisibleEditForm('visibleEditWorkPlaceForm');
      workPlacesStore.editWorkPlace(key, workPlace);
    };
    const handleOk = key ? editWorkPlace : addWorkPlace;

    const handleCancel = () => {
      toggleVisibleEditForm('visibleEditWorkPlaceForm');
    };

    const title = key ? 'Edit workPlace' : 'Add workPlace';
    const workPlace = key ? workPlacesStore.selectedWorkPlace : {};

    return <EditWorkPlaceForm
      title = {title}
      viewStore = {viewStore}
      visible = {visibleEditWorkPlaceForm}
      handleOk = {handleOk}
      handleCancel = {handleCancel}
      data = {workPlace}
    />
  }
));

export default EditWorkPlaceFormContainer;