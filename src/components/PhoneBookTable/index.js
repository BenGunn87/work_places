import React from 'react';
import { observer, inject } from 'mobx-react';
import PhoneBookTable from './PhoneBookTable'

const PhoneBookTableContainer = inject('phoneBookStore', 'phoneBookTableStore')(observer(({ phoneBookStore,  phoneBookTableStore}) =>
	{
		const onDelPhoneBookRecordButtonClick = () => {
			const {selectedRowKeys, setSelectedRowKeys} = phoneBookTableStore;
			phoneBookStore.delPhoneBookRecords(selectedRowKeys);
			setSelectedRowKeys([]);
		};
		const onAddPhoneBookRecordButtonClick = () => {
			phoneBookStore.rootstore.viewStore.key = '';
			phoneBookStore.rootstore.viewStore.toggleVisibleEditForm('visibleEditPhoneBookRecordForm');
		};
		return <PhoneBookTable
			phoneBookStore={phoneBookStore}
			tableStore={phoneBookTableStore}
			onDelButtonClick={onDelPhoneBookRecordButtonClick}
			onAddButtonClick={onAddPhoneBookRecordButtonClick}
		/>
	}
));

export default PhoneBookTableContainer;