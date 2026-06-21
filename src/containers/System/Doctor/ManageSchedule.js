import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import {CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
        }
    }
    async componentDidMount() {
        this.props.fetchAllDoctorStart();
    }
    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }
    buildDataInputSelect = (inputdata) => {
        let result = [];
        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let object = {};
                let labelvi = `${item.firstName} ${item.lastName}`;
                let labelen = `${item.lastName} ${item.firstName}`;
                object.label = this.props.language === LANGUAGES.VI ? labelvi : labelen;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    }   
    render() {
        console.log('check state', this.state.listDoctors);
        console.log('check selected doctor', this.state.selectedDoctor);
        return (
            <React.Fragment>
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-4'>
                            {/* <FormattedMessage id="manage-schedule.select-date" /> */}
                            <label>Chọn bác sĩ</label>
                            <Select
                                classNamePrefix="doctor-select"
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder="Tìm kiếm bác sĩ..."
                            />
                        </div>
                        <div className='col-4'>
                            <label>Chọn ngày</label>
                            <input className='form-control' />
                        </div>

                        <div className='col-12 pick-time-container mt-3'>
                            <label>Chọn khung giờ khám bệnh</label>
                        </div>
                        <div className='btn btn-primary'>Lưu</div>
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
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);