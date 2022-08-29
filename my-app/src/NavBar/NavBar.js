import './NavBar.css'
import {Link} from 'react-router-dom'
import Tasks from './Tasks'
import { useState } from 'react'

// Блок навигации
function NavBar (props) {
	const [tasksInput, setTasksInput] = useState([]) // Иассив задачи совпадающие с вводом input
	const [inputValue, setInputValue] = useState('') // Значение ввода из input

	// При изменения в input выводим значение в state, фильтруем задачи, у которых название совпадает с ведённым названием в input, в новый массив
	const InputValue = (event) => {
		setInputValue(event.target.value)
		const taskForInput = props.mainArray.filter(item => item.title.toLowerCase().startsWith(event.target.value.toLowerCase()))
		setTasksInput(taskForInput)
		console.log(inputValue)
	}

	return (
		<>
		<div className="navBar">
			<input onChange={InputValue} className='text navBar__input' type='text'/>
			<div className="navBar__container">

			{/* Если input пустой, выводятся задачи из основного массива, т.е. все */}
				{inputValue === ''
				 ? 
				 props.mainArray.map((item) => {
					return (
						<Link to={`task/${item.id}`}><Tasks title={item.title} content={item.description} status={item.status} id={item.id}/></Link>
					)
				})
				
				// Если были ведены изменении в input, то выводятся только те задачи, которые совпадают с input
				: tasksInput.map((item) => {
						return (
							<Link to={`task/${item.id}`}><Tasks title={item.title} content={item.description} status={item.status} id={item.id}/></Link>
						)
					})
				}

			</div>
			<Link to='/addTask'><button className='navBar__btn-add'>Добавить</button></Link>
		</div>
		</>
	)
}

export default NavBar