import React, { useEffect, useState, useReducer, useRef} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
const emailReducer = (state, action)=>{
  switch(action.type){
    case 'USER_INPUT' : return {value:action.val, isValid : action.val.includes('@')}
    case 'INPUT_BLUR' : return {value:state.value, isValid : state.value.includes('@')}
    default : return {value : '', isValid : false};
  }
};

const passwordReducer = (state, action)=>{
  switch(action.type){
    case 'USER_INPUT' : return {value:action.val, isValid : action.val.trim().length > 6}
    case 'INPUT_BLUR' : return {value:state.value, isValid : state.value.trim().length > 6}
    default : return {value : '', isValid : false};
  }
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

  // const {};

  useEffect(()=>{
    const timer = setTimeout(setFormIsValid(
      emailState.isValid && paswordState.isValid
    ), 500);
    return ()=>{
      clearTimeout(timer);
    }
  }, [emailState.isValid, paswordState.isValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:'USER_INPUT', val : event.target.value});
    // setFormIsValid(
    //   event.target.value.includes('@') && paswordState.value.trim().length > 6
    // )
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT', val:event.target.value});
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

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      props.onLogin(emailState.value, paswordState.value);
    }else if(!emailState.isValid){
      emailRef.current.activate();
    }else{
      passwordRef.current.activate();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        ref = {emailRef}
        type={"email"}
        id={"email"}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        label={'E-Mail'}
        isValid={emailState.isValid}
        htmlFor={"email"}
        />

        <Input
        ref = {passwordRef}
        type={"password"}
        id={"password"}
        value={paswordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        label={'Password'}
        isValid={paswordState.isValid}
        htmlFor={"password"}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
