import React from 'react'
import {inject, observer} from "mobx-react";
import WorkPlacesTableContainer from '../components/WorkPlacesTable';

export const WorkPlacesView = inject('workPlacesStore')(observer(({workPlacesStore}) => {
	if (!workPlacesStore.loaded){
		return <div style={{paddingTop: '20px'}}>Загрузка</div>
	}
	return <WorkPlacesTableContainer/>;
}));

