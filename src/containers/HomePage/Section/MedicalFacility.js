import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from 'react-slick';
import medicalImg from '../../../assets/medical_facility/bvtd.png'


class MedicalFacility extends Component {

    render() {
       
        return (
            <div className='section-main section-medical-faccility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span>Cơ sở y tế nổi bật</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props}>
                            <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image medical-img">
                                        <img src={medicalImg} />
                                    </div>
                                    <div className="title-section">Bênh viện Thủ Đức</div>
                                </div>
                            </div>

                            <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image medical-img">
                                        <img src={medicalImg} />
                                    </div>
                                    <div className="title-section">Bênh viện Thủ Đức</div>
                                </div>
                            </div>


                            <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image medical-img">
                                        <img src={medicalImg} />
                                    </div>
                                    <div className="title-section">Bênh viện Thủ Đức</div>
                                </div>
                            </div>

                            <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image medical-img">
                                        <img src={medicalImg} />
                                    </div>
                                    <div className="title-section">Bênh viện Thủ Đức</div>
                                </div>
                            </div>


                            <div className="section-share">
                                <div className="section-customize">
                                    <div className="bg-image medical-img">
                                        <img src={medicalImg} />
                                    </div>
                                    <div className="title-section">Bênh viện Thủ Đức</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
