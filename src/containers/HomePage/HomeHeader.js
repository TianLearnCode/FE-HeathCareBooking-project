import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage, injectIntl } from 'react-intl';
import {LANGUAGES} from '../../utils'
import {changLanguaguesApp} from '../../store/actions'
import { dispatch } from '../../redux';
import { lang } from 'moment/moment';
class HomeHeader extends Component {

   
    changeLanguages = (language) =>{
        this.props.changLanguaguesAppRedux(language)
        // console.log(changLanguaguesAppRedux(language))
    }
    render() {
       let language = this.props.language;
    //    const { intl } = this.props;
    //    let placeHolderLangText = intl.FormattedMessage({id: 'banner.placeholder'})
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo'></div>
                        </div>

                        <div className='middle-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id ="home-header.speciality"/></b></div>
                                <div className='sub-title'><FormattedMessage id ="home-header.search-doctor"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id ="home-header.health-facility"/></b></div>
                                <div className='sub-title'><FormattedMessage id ="home-header.select-room"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id ="home-header.doctor"/></b></div>
                                <div className='sub-title'><FormattedMessage id ="home-header.select-doctor"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id ="home-header.health-package"/></b></div>
                                <div className='sub-title'><FormattedMessage id ="home-header.health-check"/></div>
                            </div>
                        </div>

                        <div className='right-content'>
                            <div className='support'>
                                <i className='fas fa-question-circle'></i> <FormattedMessage id ="home-header.support"/>
                            </div>

                            <div className={language === LANGUAGES.VI ? 'language-vn active' : 'language-vn'}><span onClick={() => this.changeLanguages(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguages(LANGUAGES.EN)}>EN</span></div>

                        </div>


                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-top'>
                        <div className='title1'><FormattedMessage id="banner.title1"/></div>
                        <div className='title2'><FormattedMessage id="banner.title2"/></div>
                        <div className='search'>
                            <i className='fas fa-search'></i>
                            {/* <input type='text' placeholder='{placeHolderLangText}'/> */}
                            <FormattedMessage id="banner.placeholder">
                                {placeholder => (
                                    <input type='text' placeholder={placeholder} />
                                )}
                            </FormattedMessage>
                        </div>
                    </div>
                    <div className='content-bottom'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className='far fa-hospital'></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child1"/>
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className='fas fa-mobile-alt'></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child2"/>
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className='fas fa-procedures'></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child3"/>
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className='fas fa-flask'></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child4"/>
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className='fas fa-user-md'></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child5"/>
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className='fas fa-smile'></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child6"/>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    

                </div>
            </React.Fragment>
            
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
        changLanguaguesAppRedux:(language) => dispatch(changLanguaguesApp(language))//fire event
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
