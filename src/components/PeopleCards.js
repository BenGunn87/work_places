import React from 'react'
import { observer } from 'mobx-react'
import { Row, Col, Card, Button } from 'antd'

class CardContent extends React.Component {
  render(){
    const man = this.props.man;
    return (
      <>
      {
        this.props.fieldList.map((item, ind) =>
          <div key={man[item]+man.key}>
            {item}: {man[item]}
          </div>
        )
      }
      </>
    )
  }
}

class PeopleCards extends React.Component {
  render() {
    const {dataSource, onEditClick} = this.props;
    const rows = [[]];
    let rowNum = 0;
    let fieldList = this.props.fieldList;
    const titleField = fieldList[0];
    fieldList = fieldList.slice(1);

    dataSource.forEach((item, ind) =>
    {
      if (ind % 3 === 0 && ind !== 0) {
        rows[rowNum] =
          <Row gutter={16} style={{ marginBottom: '20px' }} key={rowNum}>
            {rows[rowNum]}
          </Row>;
        rows.push([]);
        rowNum++;
      }
      rows[rowNum].push(
        <Col span={8} key={item.key}>
          <Card title={item[titleField]} bordered={false} extra={<Button icon="edit" onClick={() => onEditClick(item.key)}/>}>
            <CardContent
              fieldList = {fieldList}
              man = {item}
            />
          </Card>
        </Col>
      );
    });

    if (rows[rowNum].length === 0) {
      rows.shift();
    } else {
      rows[rowNum] =
        <Row gutter={16} style={{ marginBottom: '20px' }} key={rowNum}>
          {rows[rowNum]}
        </Row>;
    }
    return (
      <div style={{ padding: '20px 0 0 0' }}>
        {rows}
      </div>
    )
  }
}

observer(PeopleCards);
observer(CardContent);

export default PeopleCards;