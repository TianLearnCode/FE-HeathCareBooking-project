import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './About.scss'
import { FormattedMessage, injectIntl } from 'react-intl';



class About extends Component {

    render() {
        
       let language = this.props.language;
    //    const { intl } = this.props;
    //    let placeHolderLangText = intl.FormattedMessage({id: 'banner.placeholder'})
        return (
            
            <div className='section-main section-about'>
                <div className='section-about-header'>
                    Thông tin về chúng tôi
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/xdadfvT9k3I" title="YouMed Tìm bác sĩ chính xác - Đặt lịch khám dễ dàng" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>

                    <div className='content-right'>
                        <h4>
                            Giải pháp tiết kiệm, thông minh và hiệu quả

                        </h4>
                        <p>
                            Giải pháp của BookingCare là xây 
                            dựng nền tảng công nghệ kết nối mạng lưới bác sĩ giỏi và các cơ sở y tế uy tín với thông tin được xác thực rõ ràng, cập nhật. Ứng dụng công nghệ giúp người bệnh dễ dàng lựa chọn đúng bác sĩ chuyên khoa phù hợp với vấn đề của mình và Đặt lịch khám.

                            Tiết kiệm, thông minh và hiệu quả là 3 giá trị, 3 lợi ích người bệnh nhận được qua việc đặt lịch khám. Tiết kiệm thời gian, giảm thời gian chờ đợi, tiết kiệm tiền bạc, công sức. Thông minh vì đã ứng dụng công nghệ trong kết nối người bệnh với bác sĩ và cơ sở y tế. Hiệu quả bởi người bệnh được định 
                            hướng đi khám đúng chuyên khoa, đúng bác sĩ phù hợp nhất.
                        </p>
                       
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
