import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


const getLS = (id, value) => {
  return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}
function App() {
  const [alert, setAlert] = useState(false);
  const [input, setInput] = useState('');
  const [list, setList] = useState(getLS());
  const [edit,setEdit] = useState(null);
  const [alt, setAlt] = useState('');
  const [color, setColor] = useState('red');
  const binarySearch = (u) => {
    let l=0;
    let r=list.length;
    while(r>l)
    {
     let m=Math.floor((l+r)/2);
     if(list[m].id<=u)
     {
      l=m+1;
     }
     else
      r=m;
    }
    return r;
  }
  const setDefault = () => {
    setInput('');
    setEdit(null);
  }
  useEffect(
    () => {
      localStorage.setItem("list", JSON.stringify(list));
    }
    ,[list])
  const handleSubmit = (e) => {
    e.preventDefault();
    if(input==''){
      addAlert('red','Please Enter Value');
    }else{
      if(!edit){
        //add new item
        const tmpID = new Date().getTime().toString();
        addAlert('green','Item Added To The List')
        setList([...list,{id: tmpID,title:input}]);
        setInput(''); 
      }else{   
        //edit item
       addAlert('green','Value changed')
       const index = binarySearch(edit)-1;
       const tmp = list.slice(0,index);
       tmp.push({id: edit, title: input});
       tmp.push(...list.slice(index+1,list.length));
       setList(tmp);
       setDefault();
      }
    }
  }
  const clear = () => {
    addAlert('red','Empty List')
    setList([]);
    setDefault();
  }

  const dlt = (target) => {
    addAlert('red','Item Removed')
    const tmp = list.filter((item) => item.id!==target.id);
    setList(tmp);
    setDefault();
  }
  const modify = (item) => {
    if(edit!=item.id){
      setEdit(item.id);
      setInput(item.title);
    }else{
      setEdit(null);
      setInput('');
    }
  }
  const addAlert = (col, altTmp) => {
    setColor(col);
    setAlt(altTmp);
    setAlert(true);
  }
  const removeAlert = () => {
    setAlert(false);
  }
  return <section className ="section-center">
    <form className="grocery-form">
      {alert&&<Alert color={color} alert={alt}
       removeAlert = {removeAlert} />}
      <h3>
        To-do list
      </h3>
      <div className="form-control">
        <input
         type="text"
         className="grocery"
         placeholder="e.g. working with dog"
         value = {input}
         onChange = {e => setInput(e.target.value)}
         />
        <button 
         type="submit"
         className="submit-btn"
         onClick = {(e) => handleSubmit(e)}
         >
         {!edit?'submit':'edit'}
        </button>
      </div>
    </form>
    {list.length===0||
    <div className="grocery-container">
      <div className="grocery-list">
        <List list = {list} edit={modify} del = {dlt}/>
        <button
         className="clear-btn"
         onClick = {clear}
         >
         clear items
         </button>
      </div>
    </div>
    }
  </section>  
}

export default App
 