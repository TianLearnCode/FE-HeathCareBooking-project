import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HandBook.scss'
import { FormattedMessage, injectIntl } from 'react-intl';
// Import css files
import Slider from 'react-slick';
// import HomeHeader from '../HomeHeader';
import handbookImg from '../../../assets/handbook/handbook.png'


class HandBook extends Component {

    render() {
        
       let language = this.props.language;
    //    const { intl } = this.props;
    //    let placeHolderLangText = intl.FormattedMessage({id: 'banner.placeholder'})
        return (
            
            <div className='section-main section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span>Cẩm nang</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props}>
                            <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image handbook-img">
                                        <img src={handbookImg} />
                                    </div>
                                    <div className="title-section">Cơ xương khớp 2</div>
                                </div>
                            </div>

                            <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image handbook-img">
                                        <img src={handbookImg} />
                                    </div>
                                    <div className="title-section">Cơ xương khớp 2</div>
                                </div>
                            </div>


                            <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image handbook-img">
                                        <img src={handbookImg} />
                                    </div>
                                    <div className="title-section">Cơ xương khớp 2</div>
                                </div>
                            </div>

                            <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image handbook-img">
                                        <img src={handbookImg} />
                                    </div>
                                    <div className="title-section">Cơ xương khớp 2</div>
                                </div>
                            </div>


                            <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image handbook-img">
                                        <img src={handbookImg} />
                                    </div>
                                    <div className="title-section">Cơ xương khớp 2</div>
                                </div>
                            </div>
                        </Slider>
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
        // changLanguaguesAppRedux:(language) => dispatch(changLanguaguesApp(language))//fire event
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
