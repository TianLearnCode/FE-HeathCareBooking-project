import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getAllUsers, getDetailInforDoctor } from '../../../services/userService'
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTION, CRUD_ACTIONS, CommonUtils } from '../../../utils';

import './ManageDoctor.scss'
import * as actions from '../../../store/actions'
import MdEditor from 'react-markdown-editor-lite/lib/index.js';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'chocolate1', label: 'Chocolate' },


]
// Dùng require để ép Webpack đọc file .js (tránh lỗi .mjs)
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
        // this.props.getFetchUserData();
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
    state = {

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
        console.log('Nội dung HTML:', html);
        console.log('Nội dung Text:', text);
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        });
    }

    render() {
        console.log('Check state: ', this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <h2>Quản lý thông tin bác sĩ</h2>
                </div>

                <div className='more-infor'>
                    <div className='content-left'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder="Tìm kiếm bác sĩ..."
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu</label>
                        <textarea
                            className='form-control'
                            rows="4"
                            placeholder="Nhập mô tả ngắn về bác sĩ..."
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <label>Nội dung chi tiết</label>
                    <MdEditor
                        style={{ height: '400px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        placeholder="Viết nội dung Markdown tại đây..."
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button
                    className='save-content-doctor rounded-pill'
                    onClick={() => { this.handleSaveMarkdownData() }}>
                    Lưu thông tin
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language, //state của app (appReducer) được định nghĩa trong rootReducer

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
        saveDetailDoctorStart: (data) => dispatch(actions.saveDetailDoctorStart(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
