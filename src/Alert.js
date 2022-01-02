import React, { useState, useEffect } from 'react'

const Alert = (props) => {
  useEffect(() => {
    const timeout = setTimeout(()=> {
      props.removeAlert();
    }, 1000);
    return () => {
      clearTimeout(timeout);
    }
  },[])

  return <>{<p className={`alert ${props.color==='green'?'alert-success':'alert-danger'}`}>{props.alert}</p>}</>
}

export default Alert
 