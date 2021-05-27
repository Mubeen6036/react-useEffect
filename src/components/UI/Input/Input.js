import classes from './Input.module.css';
import React, { useImperativeHandle, useRef } from 'react';
const Input = React.forwardRef((props, reference) =>{
    const ref = useRef();
    const activate = () =>{
        ref.current.focus();
    }
    useImperativeHandle(reference, ()=>{
        return {activate : activate}
    });
    return(
        <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.htmlFor}>{props.label}</label>
          <input ref = {ref}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
    );
});
export default Input;