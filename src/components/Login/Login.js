import React, { useEffect, useState, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const emailReducer = (state, action)=>{
  switch(action.type){
    case 'USER_INPUT' : return {value:action.val, isValid : action.val.includes('@')}
    case 'INPUT_BLUR' : return {value:state.value, isValid : state.value.includes('@')}
  }
  return {value : '', isValid : false};
};

const passwordReducer = (state, action)=>{
  switch(action.type){
    case 'USER_INPUT' : return {value:action.val, isValid : action.val.trim().length > 6}
    case 'INPUT_BLUR' : return {value:state.value, isValid : state.value.trim().length > 6}
  }
  return {value : '', isValid : false};
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  

  const [paswordState, dispatchPassword] = useReducer(passwordReducer, {value : '', isValid : null});
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value : '', isValid : null});

  // useEffect(()=>{
  //   console.log('Effect');
  //   return ()=>{console.log('Clean UP')};
  // },[enteredEmail]);

  useEffect(()=>{
    const timer = setTimeout(setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    ), 500);
    return ()=>{
      clearTimeout(timer);
    }
  }, [enteredPassword, enteredEmail]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:'USER_INPUT', val : event.target.value});
    // setFormIsValid(
    //   event.target.value.includes('@') && paswordState.value.trim().length > 6
    // )
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'paswordState', val:event.target.value});
    // setFormIsValid(
    //   emailState.value.includes('@') && event.target.value.trim().length > 6
    // )
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes('@'));
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, paswordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            paswordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={paswordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;