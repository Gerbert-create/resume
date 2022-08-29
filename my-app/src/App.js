import './App.css';
import React from 'react'
import MoveTasks from './MoveBar/MoveTasks';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import AddTask from './MoveBar/AddTaskBlock';
import NavBar from "./NavBar/NavBar";

export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			tasks: [] //Основной массив задачи
		}

		this.PushNewObj = this.PushNewObj.bind(this)
		this.PushChanchedArray = this.PushChanchedArray.bind(this)
	}

	// Функция получает изменённый массив с новым объектом
	PushNewObj(newObj) {
		const cloneTasksObj = [...this.state.tasks]
		cloneTasksObj.push(newObj)
		this.setState({ tasks: cloneTasksObj })
	}

	// Функция получает изменённый массив с новыми данными в объектах
	PushChanchedArray(newArray) {
		this.setState({ tasks: newArray })
		console.log(this.state.tasks)
	}

	render() {
		console.log(this.state.tasks)
		return (
			<BrowserRouter>
				<Routes>
					<Route path='/' element={
						// Основной блок
						<div className='main-block'>
							{/* Блок с задачами */}
							<NavBar mainArray={this.state.tasks}/>
							{/* Блок для просмотра или создания задачи */}
							<div className='moveBar-block'>
								{/* Рендер блоков просмотра по маршруту */}
								<Outlet/>
							</div>
						</div>
					}>
						{/* Роут для блока просмотра */}
						<Route path="/task/:id" element={<MoveTasks mainArray={this.state.tasks} pushChanchedArray={this.PushChanchedArray}/>} />
						{/* Роут для блока добавлении новых задач */}
						<Route path="/addTask" element={<AddTask mainArray={this.state.tasks} pushChanchedArray={this.PushChanchedArray} pushNewObj={this.PushNewObj}/>} />
					</Route>
				</Routes>
			</BrowserRouter>
		);
	}
}

