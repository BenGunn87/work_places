import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'

import SearchableTable from "../SearchableTable";

class PeopleTable extends React.Component {
  render() {
    const { fieldList, people, peopleCount } = this.props.peopleStore;
    const { tableStore, onDelButtonClick, onAddButtonClick } = this.props;
    const columns = fieldList.map(field => {
      return {
        title: field,
        dataIndex: field,
        key: field
      }
    });

    return (
      <div data-count={peopleCount}>
        <div className="table-operations" style={{ marginTop: 16, marginBottom: 16 }}>
          <Button style={{marginRight: 8}} onClick={onAddButtonClick}>
            Add
          </Button>
          <Button disabled={!tableStore.isSelected} onClick={onDelButtonClick}>
            Delete
          </Button>
        </div>
        <SearchableTable
          dataSource ={people}
          columns={columns}
          tableStore = {tableStore}
          searchFields = {[0, 2]}
        />
      </div>
    );
  }
}

observer(PeopleTable);

export default PeopleTable;