import React from 'react'
import {inject, observer} from "mobx-react";
import PhoneBookTableContainer from '../components/PhoneBookTable';

export const PhoneBookView = inject('phoneBookStore')(observer(({phoneBookStore}) => {
	if (!phoneBookStore.loaded){
		return <div style={{paddingTop: '20px'}}>Загрузка</div>
	}
	return <PhoneBookTableContainer/>;
}));

