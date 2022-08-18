import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Form, Checkbox } from 'rsuite';






function LoginForm(props) {
    const { loginHandler, prevUsername } = props;

    const [ username, setUsername ] = useState(prevUsername);
    const [ password, setPassword ] = useState("");
    const [ rememberMe, setRememberMe ] = useState(false);



    function clearForm() {
        setUsername("");
        setPassword("");
        setRememberMe(false);
    }



    return (
    <Form fluid className='card m-auto p-3 rounded shadow-sm' style={{ maxWidth: '500px'}}
        onSubmit={()=> loginHandler(username, password, rememberMe)}
    >
        <h4 className='text-center fw-bold mb-3 lead'>Login</h4>

        <Form.Group controlId="username">
            <Form.ControlLabel>Username</Form.ControlLabel>
            <Form.Control name="name" onChange={setUsername} value={username} required />
        </Form.Group>

        <Form.Group controlId="password">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control name="password" type="password" onChange={setPassword} value={password} required />
        </Form.Group>

        <Checkbox onChange={setRememberMe} value={rememberMe}> Remember me</Checkbox>

        <ButtonGroup className='mt-3 m-auto'>
            <Button appearance='primary' size='lg' type="submit" >
                Submit
            </Button>
            <Button appearance='primary' color='yellow' size='lg' onClick={clearForm}>
                Clear
            </Button>
        </ButtonGroup>

        <span className='text-muted text-center mt-4'>
            Haven't register? <Link to='/register'>Register now</Link>
        </span>
    </Form>
    );
}



export default LoginForm;