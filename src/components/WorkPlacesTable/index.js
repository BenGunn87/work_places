import React from 'react';
import { observer, inject } from 'mobx-react';

import WorkPlacesTable from './WorkPlacesTable'

const WorkPlacesTableContainer = inject('workPlacesStore', 'workPlacesTableStore')(observer(({ workPlacesStore,  workPlacesTableStore}) =>
	{
		const onDelManButtonClick = () => {
			const {selectedRowKeys, setSelectedRowKeys} = workPlacesTableStore;
			workPlacesStore.delWorkPlace(selectedRowKeys);
			setSelectedRowKeys([]);
		};
		const onAddManButtonClick = () => {
			workPlacesStore.rootstore.viewStore.key = '';
			workPlacesStore.rootstore.viewStore.toggleVisibleEditForm()
		};
		return <WorkPlacesTable
			workPlacesStore={workPlacesStore}
			tableStore={workPlacesTableStore}
			onDelButtonClick={onDelManButtonClick}
			onAddButtonClick={onAddManButtonClick}
		/>
	}
));

export default WorkPlacesTableContainer;