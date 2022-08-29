import React from "react";
import './AddTaskBlock.css'
import { Link } from "react-router-dom";

//Блок для создания задачи
export default class AddTask extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			title: '', //Введённое название задачи из input
			description: '' //Введённое описания задачи из textarea
		}

		this.TitleChange = this.TitleChange.bind(this)
		this.DescriptionChange = this.DescriptionChange.bind(this)
		this.ClickAdd = this.ClickAdd.bind(this)

	}

	// Выводим название задачи в state
	TitleChange(event) {
		this.setState({ title: event.target.value })
	}

	//Выводим описание задачи в state
	DescriptionChange(event) {
		this.setState({ description: event.target.value })
	}

	// При назжатие на кнопку "добавить" создаём новым объект и передаём его родителю
	ClickAdd() {
		const newObjTask = {
			title: this.state.title,
			description: this.state.description,
			status: 'ожидает',
			id: this.props.mainArray.length + 1,
		}
		this.props.pushNewObj(newObjTask)
	}

	render() {
		return (
			<div className="addTask-block">
				<input onChange={this.TitleChange} className="text addTask-block__input" type="text" placeholder="Имя задания" />
				<textarea onChange={this.DescriptionChange} className="text textarea addTask-block__textarea" type="text" placeholder="Описание" />
				<div className="addTask-block__btn-flex">
					<Link to='/'><button onClick={this.ClickAdd} className="text addTask-block__btn btn-add">Добавить</button></Link>
					<Link to='/'><button className="text addTask-block__btn btn-cancel">Отменить</button></Link>
				</div>
			</div>
		)
	}
}