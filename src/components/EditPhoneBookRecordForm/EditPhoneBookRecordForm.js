import React from 'react'
import { Modal, Button, Row, Col, Input,Alert } from 'antd'
import { observer } from 'mobx-react'
import { decorate, observable, action} from "mobx";
import rootStore from "../../stores/rootStore";

const fieldsList = rootStore.phoneBookStore.fieldList.map(({field}) => field);

class FormStore {
	constructor(workPlace = {}) {
		for (let field of fieldsList) {
			this[field] = workPlace[field];
			this[`${field}Error`] = false;
			decorate(this, {
				[field]: observable,
				[field+'Error']: observable,
			})
		}
	}

	onChange = e => {
		this[e.target.id] = e.target.value;
		this[`${e.target.id}Error`] = false;
	};

	setError = errorList => {
		errorList.forEach(field => this[`${field}Error`] = true);
	}
}

decorate(FormStore, {
	onChange: action,
	setError: action
});

const validate = store => {
	const errorList = fieldsList.filter(field => !store[field]);
	store.setError(errorList);
	return errorList.length === 0;
};

class EditPhoneBookRecordForm extends React.Component {
	constructor(props) {
		super(props);
		this.formStore = new FormStore(props.data);
	};

	handleOk = () => {
		if (validate(this.formStore)) {
			const resWorkPlace = {};
			fieldsList.forEach(field => {
				resWorkPlace[field] = this.formStore[field];
			});
			this.props.handleOk(resWorkPlace);
		}
	};

	render() {
		const { visible, handleCancel, title } = this.props;
		const { lastName, firstName, workPhone, mobilePhone, mail, birthDate } = this.formStore;
		const { lastNameError, firstNameError, workPhoneError, mobilePhoneError, mailError, birthDateError } = this.formStore;
		const { onChange } = this.formStore;

		return (
			<Modal
				title={title}
				visible={visible}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel}>
						Отмена
					</Button>,
					<Button key="submit" type="primary" onClick={this.handleOk}>
						Сохранить
					</Button>,
				]}
			>
				<Row>
					<Col span={8} className='ant-form-item-label'>
						<label
							className='ant-form-item-required'
							htmlFor='lastName'
							title='lastName'
							style={{paddingBottom: 8}}
						>
							Фамилия
						</label>
					</Col>
					<Col span={16}>
						<Input id='lastName' defaultValue={lastName} onChange={onChange}/>
						{lastNameError ? <Alert message="Пожалуйста введите фамилию!" type="error" banner/> : null}
					</Col>
				</Row>
				<Row>
					<Col span={8} className='ant-form-item-label'>
						<label
							className='ant-form-item-required'
							htmlFor='firstName'
							title='firstName'
							style={{paddingBottom: 8}}
						>
							Имя
						</label>
					</Col>
					<Col span={16}>
						<Input id='firstName' defaultValue={firstName} onChange={onChange}/>
						{firstNameError ? <Alert message="Пожалуйста введите имя!" type="error" banner/> : null}
					</Col>
				</Row>
				<Row>
					<Col span={8} className='ant-form-item-label'>
						<label
							className='ant-form-item-required'
							htmlFor = 'workPhone'
							title = 'workPhone'
							style={{paddingBottom: 8}}
						>
							Рабочий телефон
						</label>
					</Col>
					<Col span={16}>
						<Input id='workPhone' defaultValue={workPhone} onChange={onChange}/>
						{workPhoneError ? <Alert message="Пожалуйста введите рабочий телефон!" type="error" banner/> : null}
					</Col>
				</Row>
				<Row>
					<Col span={8} className='ant-form-item-label'>
						<label
							className='ant-form-item-required'
							htmlFor='mobilePhone'
							title='mobilePhone'
						>
							Мобильный телефон
						</label>
					</Col>
					<Col span={16}>
						<Input id='mobilePhone' defaultValue={mobilePhone} onChange={onChange}/>
						{mobilePhoneError ? <Alert message="Пожалуйста введите мобильный телефон!" type="error" banner/> : null}
					</Col>
				</Row>
				<Row>
					<Col span={8} className='ant-form-item-label'>
						<label
							className='ant-form-item-required'
							htmlFor='mail'
							title='mail'
						>
							e-mail
						</label>
					</Col>
					<Col span={16}>
						<Input id='mail' defaultValue={mail} onChange={onChange}/>
						{mailError ? <Alert message="Пожалуйста введите e-mail!" type="error" banner/> : null}
					</Col>
				</Row>
				<Row>
					<Col span={8} className='ant-form-item-label'>
						<label
							className='ant-form-item-required'
							htmlFor='birthDate'
							title='birthDate'
						>
							Дата рождения
						</label>
					</Col>
					<Col span={16}>
						<Input id='birthDate' defaultValue={birthDate} onChange={onChange}/>
						{birthDateError ? <Alert message="Пожалуйста введите дату рождения!" type="error" banner/> : null}
					</Col>
				</Row>
			</Modal>
		)
	}
}

observer(EditPhoneBookRecordForm);
export default EditPhoneBookRecordForm;