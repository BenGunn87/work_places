import React from 'react';
import { observer, inject } from 'mobx-react';

import EditPhoneBookRecordForm from './EditPhoneBookRecordForm'

const EditPhoneBookRecordFormContainer = inject('phoneBookStore', 'viewStore')(observer(({ phoneBookStore,  viewStore}) =>
	{
		const { key, toggleVisibleEditForm, visibleEditPhoneBookRecordForm } = viewStore;
		const { fileName } = phoneBookStore;

		if (!visibleEditPhoneBookRecordForm) {
			return null;
		}
		const addPhoneBookRecord = phoneBookRecord => {
			// toggleVisibleEditForm('visibleEditPhoneBookRecordForm');
			phoneBookStore.addPhoneBookRecord(phoneBookRecord);
		};
		const editPhoneBookRecord = phoneBookRecord => {
			// toggleVisibleEditForm('visibleEditPhoneBookRecordForm');
			phoneBookStore.editPhoneBookRecord(key, phoneBookRecord);
		};
		const handleOk = key ? editPhoneBookRecord : addPhoneBookRecord;
		const handleSend = () => {
			phoneBookStore.sendPhoneBookRecord();
			toggleVisibleEditForm('visibleEditPhoneBookRecordForm');
		};

		const handleCancel = () => {
			toggleVisibleEditForm('visibleEditPhoneBookRecordForm');
			if (fileName !== '') {
				phoneBookStore.clearPhoneBookRecordFile();
			}
		};

		const title = key ? 'Edit phoneBookRecord' : 'Add phoneBookRecord';
		const phoneBookRecord = key ? phoneBookStore.getPhoneBookRecordIndByKey(key) : {};

		return <EditPhoneBookRecordForm
			title = {title}
			viewStore = {viewStore}
			visible = {visibleEditPhoneBookRecordForm}
			handleOk = {handleOk}
			handleCancel = {handleCancel}
			handleSend = {handleSend}
			data = {phoneBookRecord}
			isButtonSendDisabled = {fileName === ''}
		/>
	}
));

export default EditPhoneBookRecordFormContainer;