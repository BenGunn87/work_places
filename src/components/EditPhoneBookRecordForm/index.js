import React from 'react';
import { observer, inject } from 'mobx-react';

import EditPhoneBookRecordForm from './EditPhoneBookRecordForm'

const EditPhoneBookRecordFormContainer = inject('phoneBookStore', 'viewStore')(observer(({ phoneBookStore,  viewStore}) =>
	{
		const { key, toggleVisibleEditForm, visibleEditPhoneBookRecordForm } = viewStore;
		if (!visibleEditPhoneBookRecordForm) {
			return null;
		}
		const addPhoneBookRecord = phoneBookRecord => {
			toggleVisibleEditForm('visibleEditPhoneBookRecordForm');
			phoneBookStore.addPhoneBookRecord(phoneBookRecord);
		};
		const editPhoneBookRecord = phoneBookRecord => {
			toggleVisibleEditForm('visibleEditPhoneBookRecordForm');
			phoneBookStore.editPhoneBookRecord(key, phoneBookRecord);
		};
		const handleOk = key ? editPhoneBookRecord : addPhoneBookRecord;

		const handleCancel = () => {
			toggleVisibleEditForm('visibleEditPhoneBookRecordForm');
		};

		const title = key ? 'Edit phoneBookRecord' : 'Add phoneBookRecord';
		const phoneBookRecord = key ? phoneBookStore.getPhoneBookRecordIndByKey(key) : {};

		return <EditPhoneBookRecordForm
			title = {title}
			viewStore = {viewStore}
			visible = {visibleEditPhoneBookRecordForm}
			handleOk = {handleOk}
			handleCancel = {handleCancel}
			data = {phoneBookRecord}
		/>
	}
));

export default EditPhoneBookRecordFormContainer;