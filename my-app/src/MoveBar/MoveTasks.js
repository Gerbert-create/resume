import React, { useState } from "react";
import './MoveTasks.css'
import { useParams } from "react-router-dom";

// Блок для просмотра задачи
function MoveTasks(props) {

	const params = useParams() // получаем параметры ссылки
	const paramsId = Number(params.id) // через параметры получаем id 
	const [newDesc, setNewDesc] = useState('') // Введённые изменения в описании задачи
	const [disabled, setDisabled] = useState(true) // Состояние кнопки "редактировать"

	// При нажатия на кнопку "редактировать" кнопка разблокируется
	const ClickBtnChange = () => {
		setDisabled(false)
	}

	// При редактирования описании выводим полученные изменения в state
	const ChangeValue = (event) => {
		setNewDesc(event.target.value)
	}

	// При клике на кнопку "сохранить" ищем элемент в массиве по id и вставляем новые данные и возвращаем изменённый массив родителю
	const ClickBtnSave = () => {
		if (newDesc !== '') {
			props.mainArray.map(item => {
				if (item.id === paramsId) {
					return item.description = newDesc
				}
				return props.mainArray
			})
			props.pushChanchedArray(props.mainArray)
			console.log(props.mainArray)
		}
	}

	// При клике на кнопку "удалить" выводим все неподходящие элементы по id в новый массив и возвращаем его родителю
	const ClickDelete = () => {
		const deleteTask = props.mainArray.filter(item => item.id !== paramsId)
		props.pushChanchedArray(deleteTask)
	}

	// При клике на кнопку "далее" мы изменяем статус данного элемента в следующий и возвращаем изменённый массив родителю
	const ChangeStatus = () => {
		props.mainArray.map(item => {
			if (item.id === paramsId) {
				if (item.status === 'ожидает') {
					return item.status = 'в процессе'
				}

				if (item.status === 'в процессе') {
					return item.status = 'выполнена'
				}
			}
			return props.mainArray
		})

		props.pushChanchedArray(props.mainArray)
	}

	return (
		<>
			{/* отображение данных по нужному id */}
			{props.mainArray.map(item => {
				return (item.id === paramsId
					? <div key={item.id} className="moveTasks-block">
						<h1 className="text moveTasks-block__title">{item.title}</h1>
						<textarea onChange={ChangeValue} readOnly={disabled} className="text moveTasks-block__textarea">{item.description}</textarea>
						<button onClick={ClickBtnChange} className="text moveTasks-block__btn btn-change">Редактировать</button>
						<button onClick={ClickDelete} className="text moveTasks-block__btn btn-delete">Удалить</button>
						<button onClick={ClickBtnSave} className="text moveTasks-block__btn btn-save">Сохранить изменения</button>

						{/* Когда элемент имеет статус "выполнен" кнопка "далее" исчезает */}
						{item.status !== 'выполнена'
							? <button onClick={ChangeStatus} className="text moveTasks-block__btn btn-save">Далее</button>
							: null
						}

					</div>
					: null
				)
			})}
		</>
	)

}

export default MoveTasks