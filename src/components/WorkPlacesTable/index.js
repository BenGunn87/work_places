import React from 'react';
import { observer, inject } from 'mobx-react';

import WorkPlacesTable from './WorkPlacesTable'

const WorkPlacesTableContainer = inject('workPlacesStore', 'workPlacesTableStore')(observer(({ workPlacesStore,  workPlacesTableStore}) =>
	{
		const onDelWorkPlaceButtonClick = () => {
			const {selectedRowKeys, setSelectedRowKeys} = workPlacesTableStore;
			workPlacesStore.delWorkPlace(selectedRowKeys);
			setSelectedRowKeys([]);
		};
		const onAddWorkPlaceButtonClick = () => {
			workPlacesStore.rootstore.viewStore.key = '';
			workPlacesStore.rootstore.viewStore.toggleVisibleEditForm('visibleEditWorkPlaceForm');
		};
		return <WorkPlacesTable
			workPlacesStore={workPlacesStore}
			tableStore={workPlacesTableStore}
			onDelButtonClick={onDelWorkPlaceButtonClick}
			onAddButtonClick={onAddWorkPlaceButtonClick}
		/>
	}
));

export default WorkPlacesTableContainer;