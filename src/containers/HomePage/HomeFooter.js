import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './HomeFooter.scss'
import { FormattedMessage, injectIntl } from 'react-intl';



class HomeFooter extends Component {

    render() {
        
       let language = this.props.language;
    //    const { intl } = this.props;
    //    let placeHolderLangText = intl.FormattedMessage({id: 'banner.placeholder'})
        return (
            
            <div className='section-main section-homefooter'>
                
                <p>&copy; Trần Võ Nhựt Quang </p>

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
        // changLanguaguesAppRedux:(language) => dispatch(changLanguaguesApp(language))//fire event
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
