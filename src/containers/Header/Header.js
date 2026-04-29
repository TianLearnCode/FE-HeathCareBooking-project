import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import {LANGUAGES} from '../../utils'
import {changLanguaguesAppRedux} from '../../store/actions'

class Header extends Component {
    handleChangeLanguage = (language) =>{
        this.props.changLanguaguesAppRedux(language)
    }
    render() {
        const { processLogout, language } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='languages'>
                    <span className={language === LANGUAGES.VI ? 'language-vn active' : 'language-vn'} onClick={()=> this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                    <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} onClick={()=> this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Logout'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changLanguaguesAppRedux:(language) => dispatch(actions.changLanguaguesApp(language))//fire event
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
