import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutStandingDoctor.scss';
import Slider from 'react-slick';
import doctorImg from '../../../assets/doctor/doctor.png'
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'

class OutStandingDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrDoctor: []
        } 
        
    }
    componentDidUpdate(prevProps, prevState, snapShot){
        if(prevProps.topDoctorRedux !== this.props.topDoctorRedux){
            this.setState({
                arrDoctor: this.props.topDoctorRedux
            })
        }
    }
    componentDidMount(){
        this.props.loadTopDoctor();
    }

    render() {
        let {language} = this.props;
       let allDoctor = this.state.arrDoctor
        return (
            <div className='section-main section-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span>Bác sĩ nổi bật</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props}>
                           
                            {allDoctor && allDoctor.length > 0 && allDoctor.map((item, index) =>{
                                let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;

                                return(
                                    <div className="section-share" key={index}>
                                        <div className="section-customize">
                                            <div className="bg-image doctor-img">
                                                {/* <img src={doctorImg} /> */}
                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div className="title-section">Giáo sư, Tiến sĩ Nhựt Quang</div>
                                                <div className="title-section">Khoa Xương Khớp</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            
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
        topDoctorRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctorStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
