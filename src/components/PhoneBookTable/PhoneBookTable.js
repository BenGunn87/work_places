import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'

import SearchableTable from "../SearchableTable";

class PhoneBookTable extends React.Component {
	render() {
		const { fieldList, phoneBookRecords, phoneBookRecordsCount } = this.props.phoneBookStore;
		const { tableStore, onDelButtonClick, onAddButtonClick } = this.props;
		const columns = fieldList.map(({field, title}) => {
			return {
				title: title,
				dataIndex: field,
				key: field
			}
		});

		return (
			<div data-count={phoneBookRecordsCount}>
				<div className="table-operations" style={{ marginTop: 16, marginBottom: 16 }}>
					<Button style={{marginRight: 8}} onClick={onAddButtonClick}>
						Добавить
					</Button>
					<Button disabled={!tableStore.isSelected} onClick={onDelButtonClick}>
						Удалить
					</Button>
				</div>
				<SearchableTable
					dataSource ={phoneBookRecords}
					columns={columns}
					tableStore = {tableStore}
					searchFields = {[0, 2]}
				/>
			</div>
		);
	}
}

observer(PhoneBookTable);

export default PhoneBookTable;