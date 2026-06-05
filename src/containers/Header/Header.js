import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuApp:[]
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changLanguaguesAppRedux(language)
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if(role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu
        });
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        const displayName = userInfo && userInfo.firstName ? userInfo.firstName : 'User';

        return (
            <div className="header-container">
                <div className="header-brand">
                    <div className="header-logo"></div>
                    <div className="header-brand-text">
                        <span className="brand-title">HealthCare</span>
                        <span className="brand-subtitle">Admin Center</span>
                    </div>
                </div>

                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className="header-actions">
                    <div className="welcome-user">
                        <span className="user-avatar">
                            {displayName.charAt(0).toUpperCase()}
                        </span>
                        <span className="welcome-text">
                            <FormattedMessage id="home-header.welcome" />, {displayName}
                        </span>
                    </div>

                    <div className="language-switch">
                        <button
                            type="button"
                            className={language === LANGUAGES.VI ? 'language-option active' : 'language-option'}
                            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                        >
                            VN
                        </button>
                        <button
                            type="button"
                            className={language === LANGUAGES.EN ? 'language-option active' : 'language-option'}
                            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                        >
                            EN
                        </button>
                    </div>

                    <button type="button" className="btn-logout" onClick={processLogout} title='Logout'>
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changLanguaguesAppRedux: (language) => dispatch(actions.changLanguaguesApp(language))//fire event

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
