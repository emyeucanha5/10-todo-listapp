import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = (props) => {
  return props.list.map((item) => {
    return <article key={item.id} className="grocery-item">
    <p className="title">{item.title}</p>
    <div className="btn-container">
    <button onClick={() => props.edit(item)} type="button" className="edit-btn"><FaEdit /></button>
    <button onClick={() => props.del(item)} type="button" className="delete-btn"><FaTrash /></button>
    </div>
  </article>
  })
}

export default List
