import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutStandingDoctor.scss';
import Slider from 'react-slick';
import doctorImg from '../../../assets/doctor/doctor.png'


class OutStandingDoctor extends Component {

    render() {
       
        return (
            <div className='section-main section-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span>Bác sĩ nổi bật</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props}>
                           <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image doctor-img">
                                        <img src={doctorImg} />
                                    </div>
                                    <div className='position text-center'>
                                        <div className="title-section">Giáo sư, Tiến sĩ Nhựt Quang</div>
                                        <div className="title-section">Khoa Xương Khớp</div>
                                    </div>
                                </div>
                            </div>

                            <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image doctor-img">
                                        <img src={doctorImg} />
                                    </div>
                                    <div className='position text-center'>
                                        <div className="title-section">Giáo sư, Tiến sĩ Nhựt Quang</div>
                                        <div className="title-section">Khoa Xương Khớp</div>
                                    </div>
                                </div>
                            </div>


                           <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image doctor-img">
                                        <img src={doctorImg} />
                                    </div>
                                    <div className='position text-center'>
                                        <div className="title-section">Giáo sư, Tiến sĩ Nhựt Quang</div>
                                        <div className="title-section">Khoa Xương Khớp</div>
                                    </div>
                                </div>
                            </div>

                           <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image doctor-img">
                                        <img src={doctorImg} />
                                    </div>
                                    <div className='position text-center'>
                                        <div className="title-section">Giáo sư, Tiến sĩ Nhựt Quang</div>
                                        <div className="title-section">Khoa Xương Khớp</div>
                                    </div>
                                </div>
                            </div>


                           <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image doctor-img">
                                        <img src={doctorImg} />
                                    </div>
                                    <div className='position text-center'>
                                        <div className="title-section">Giáo sư, Tiến sĩ Nhựt Quang</div>
                                        <div className="title-section">Khoa Xương Khớp</div>
                                    </div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
