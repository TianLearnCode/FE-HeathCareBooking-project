import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            username: '',
            password: '',
            loginError: '',
            isShowPassword: false
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnchangePassword = (event)=>{
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async()=>{
        this.setState({
            loginError: ''
        })
        try{
            let data = await handleLoginApi(this.state.username, this.state.password);

            if(data && data.errCode !== 0){
                this.setState({
                    loginError: data.message
                })
            }
            if(data && data.errcode === 0){
                this.props.userLoginSuccess(data.user)
                console.log('Login Succeed')
            }
            // alert(JSON.stringify())
            // alert(data.errcode)


        }catch(e){
            if(e.response && e.response.data){
                if(e.response.data){
                    this.setState({
                        loginError: e.response.data.message
                    })
                }
            }
            console.log( data);
        }
        
    }

    handleShowHidePassword = () =>{
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {
        //jsx
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Log In</div>
                        <div className='col-12 form-group mb-3'>
                            <label className='form-label'>Username: </label>
                            <input className='form-control login-input' type='text' placeholder='Enter your username' 
                            value={this.state.username} 
                            onChange={(event)=>this.handleOnChangeUsername(event)}/>
                        </div>
                        <div className='col-12 form-group mb-3'>
                            <label className='form-label'>Password: </label>
                            <div className='custom-input-password'>
                                <input 
                                    className='form-control login-input' 
                                    // Nếu isShowPassword là true thì hiện 'text', ngược lại hiện 'password'
                                    type={this.state.isShowPassword ? 'text' : 'password'} 
                                    placeholder='Enter your password' 
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnchangePassword(event)}
                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>

                        </div>
                        <div className="col-12 mt-1" style={{ color: '#ef4444', fontSize: '13px', textAlign: 'center', minHeight: '20px' }}>
                            {this.state.loginError}
                        </div>
                        <div className='col-12 mt-3'>
                            <button className='login-btn w-100'
                            onClick={()=>this.handleLogin()}>
                                Log In
                            </button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>

                        <div className='text-order-login col-12 text-center'>
                            <span className=''>Or log in with</span>
                        </div>
                        
                        <div className='col-12 social-login text-center d-flex justify-content-center'>
                            <i className="fab fa-google google"></i>
                            <i className="fab fa-facebook facebook"></i>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
