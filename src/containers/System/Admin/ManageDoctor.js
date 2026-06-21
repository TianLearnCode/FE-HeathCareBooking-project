import React, { Component } from 'react';
import { getDetailInforDoctor } from '../../../services/userService';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';

import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import 'react-markdown-editor-lite/lib/index.css';

const MdEditor = require('react-markdown-editor-lite').default;
const MarkdownIt = require('markdown-it');
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: []
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
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
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

    handleSaveMarkdownData = () => {
        this.props.saveDetailDoctorStart({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        })
    }

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        await getDetailInforDoctor(selectedDoctor.value).then(res => {
            if (res && res.errCode === 0 && res.data && res.data.MarkDown) {
                let markdown = res.data.MarkDown;
                this.setState({
                    contentHTML: markdown.contentHTML,
                    contentMarkdown: markdown.contentMarkdown,
                    description: markdown.description
                })
            } else {
                this.setState({
                    contentHTML: '',
                    contentMarkdown: '',
                    description: ''
                })
            }
        })
        console.log('selected option is: ', selectedDoctor)
    }

    handleEditorChange = ({ html, text }) => {
        console.log('Noi dung HTML:', html);
        console.log('Noi dung Text:', text);
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        });
    }

    render() {
        console.log('Check state: ', this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-header'>
                    <div>
                        <div className='manage-doctor-eyebrow'>Doctor Content</div>
                        <h2>Quản lý thông tin bác sĩ</h2>
                    </div>
                    <button
                        className='save-content-doctor'
                        onClick={() => { this.handleSaveMarkdownData() }}>
                        <i className="fas fa-save"></i>
                        <span>Lưu thông tin</span>
                    </button>
                </div>

                <div className='doctor-content-card'>
                    <div className='card-section-title'>
                        <i className="fas fa-user-md"></i>
                        <span>Thông tin cơ bản</span>
                    </div>

                    <div className='more-infor'>
                        <div className='content-left form-field'>
                            <label>Chọn bác sĩ</label>
                            <Select
                                classNamePrefix="doctor-select"
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder="Tìm kiếm bác sĩ..."
                            />
                        </div>
                        <div className='content-right form-field'>
                            <label>Thông tin giới thiệu</label>
                            <textarea
                                className='form-control doctor-description'
                                rows="4"
                                placeholder="Nhập mô tả ngắn về bác sĩ..."
                                onChange={(event) => this.handleOnChangeDescription(event)}
                                value={this.state.description}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className='doctor-content-card editor-card'>
                    <div className='editor-card-header'>
                        <div>
                            <div className='card-section-title'>
                                <i className="fas fa-file-medical-alt"></i>
                                <span>Nội dung chi tiết</span>
                            </div>
                            <div className='editor-subtitle'>Soạn nội dung Markdown và xem trước HTML ở khung bên phải.</div>
                        </div>
                    </div>

                    <div className='manage-doctor-editor'>
                        <MdEditor
                            style={{ height: '520px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            placeholder="Viết nội dung Markdown tại đây..."
                            value={this.state.contentMarkdown}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
        saveDetailDoctorStart: (data) => dispatch(actions.saveDetailDoctorStart(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
