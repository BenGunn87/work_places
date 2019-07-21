import React from 'react'
import { Modal, Button, Row, Col, InputNumber, Input, Select, Alert } from 'antd'
import { observer } from 'mobx-react'
import { decorate, observable, action} from "mobx";
import rootStore from "../../stores/rootStore";

const { Option } = Select;
const fieldsList = rootStore.peopleStore.fieldList;

class FormStore {
  constructor(man = {}) {
    for (let field of fieldsList) {
      this[field] = man[field];
      this[`${field}Error`] = false;
      decorate(this, {
        [field]: observable,
        [field+'Error']: observable,
      })
    }
  }
  onNameChange = e => {
    this.name = e.target.value;
    this.nameError = false;
  };
  onGenderChange = value => {
    this.gender = value;
    this.genderError = false;
  };
  onHeightChange = value => {
    this.height = value;
    this.heightError = false;
  };
  onMassChange = value => {
    this.mass = value;
    this.massError = false;
  };
  setError = errorList => {
    errorList.forEach(field => this[`${field}Error`] = true);
  }
}

decorate(FormStore, {
  onNameChange: action,
  onGenderChange: action,
  onHeightChange: action,
  onMassChange: action,
  setError: action
});

const validate = store => {
  const errorList = fieldsList.filter(field => !store[field]);
  store.setError(errorList);
  return errorList.length === 0;
};

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.formStore = new FormStore(props.man);
  };
  handleOk = () => {
    if (validate(this.formStore)) {
      const resMan = {};
      fieldsList.forEach(field => {
        resMan[field] = this.formStore[field];
      });
      this.props.handleOk(resMan);
    }
  };

  render() {
    const { visible, handleCancel, title } = this.props;
    const { name, gender, height, mass } = this.formStore;
    const { nameError, genderError, heightError, massError } = this.formStore;
    const { onNameChange, onGenderChange, onHeightChange, onMassChange } = this.formStore;

    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}>
            Save
          </Button>,
        ]}
      >
        <Row>
          <Col span={6} className='ant-form-item-label'>
            <label className='ant-form-item-required' htmlFor='name' title='name' style={{paddingBottom: 8}}>
              Name
            </label>
          </Col>
          <Col span={18}>
            <Input id='name' defaultValue={name} onChange={onNameChange}/>
            {nameError ? <Alert message="Please input name!" type="error" banner/> : null}
          </Col>
        </Row>
        <Row>
          <Col span={6} className='ant-form-item-label'>
            <label className='ant-form-item-required' htmlFor='gender' title='gender' style={{paddingBottom: 8}}>
              Gender
            </label>
          </Col>
          <Col span={18}>
            <Select defaultValue={gender} style={{ width: 120 }} onChange={onGenderChange}>
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="n/a">n/a</Option>
            </Select>
            {genderError ? <Alert message="Please select gender!" type="error" banner/> : null}
          </Col>
        </Row>
        <Row>
          <Col span={6} className='ant-form-item-label'>
            <label className='ant-form-item-required' htmlFor = 'height' title = 'height' style={{paddingBottom: 8}}>
              Height (cm)
            </label>
          </Col>
          <Col span={18}>
            <InputNumber id='height' min={0} max={10000} defaultValue={height} onChange={onHeightChange}/>
            {heightError ? <Alert message="Please input height!" type="error" banner/> : null}
          </Col>
        </Row>
        <Row>
          <Col span={6} className='ant-form-item-label'>
              <label className='ant-form-item-required' htmlFor='mass' title = 'mass'>
                Mass (kg)
              </label>
          </Col>
          <Col span={18}>
            <InputNumber id='mass' min={0} max={10000} defaultValue={mass} onChange={onMassChange}/>
            {massError ? <Alert message="Please input mass!" type="error" banner/> : null}
          </Col>
        </Row>
      </Modal>
    )
  }
}

observer(EditForm);
export default EditForm;