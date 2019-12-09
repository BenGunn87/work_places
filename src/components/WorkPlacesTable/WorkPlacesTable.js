import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'

import SearchableTable from "../SearchableTable";

class WorkPlacesTable extends React.Component {
	render() {
		const { fieldList, workPlaces, workPlacesCount } = this.props.workPlacesStore;
		const { tableStore, onDelButtonClick, onAddButtonClick } = this.props;
		const columns = fieldList.map(({field, title}) => {
			return {
				title: title,
				dataIndex: field,
				key: field
			}
		});

		return (
			<div data-count={workPlacesCount}>
				<div className="table-operations" style={{ marginTop: 16, marginBottom: 16 }}>
					<Button style={{marginRight: 8}} onClick={onAddButtonClick}>
						Добавить
					</Button>
					<Button disabled={!tableStore.isSelected} onClick={onDelButtonClick}>
						Удалить
					</Button>
				</div>
				<SearchableTable
					dataSource ={workPlaces}
					columns={columns}
					tableStore = {tableStore}
					searchFields = {[0, 2]}
				/>
			</div>
		);
	}
}

observer(WorkPlacesTable);

export default WorkPlacesTable;