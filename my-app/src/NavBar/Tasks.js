import React from "react";
import './Tasks.css'

// отображение блоков задачи в блоке навигации
function Tasks (props) {
	return (
		<div className="tasks-cards" key={props.id}>
			<h2 className="text tasks-cards__title">{props.title}</h2>
			{/* пищем нужный класс в зависимости от статуса, чтобы порлучить нужные стили */}
			<span className={`text tasks-cards__status ${props.status === 'ожидает' ? 'waiting' : props.status === 'в процессе' ? 'progress' : props.status === 'выполнена' ? 'finished' : null}`}>{props.status}</span>
		</div>
	)	
}

export default Tasks
