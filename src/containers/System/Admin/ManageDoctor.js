import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {getAllUsers} from '../../../services/userService'
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions' 
import MdEditor from 'react-markdown-editor-lite/lib/index.js';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
    {value:'chocolate', label:'Chocolate'},
    {value:'chocolate1', label:'Chocolate'},
    

]
// Dùng require để ép Webpack đọc file .js (tránh lỗi .mjs)
const MarkdownIt = require('markdown-it');
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            contentMarkdown:'',
            contentHTML: '',
            selectedDoctor: '',
            description: ''
        }
    }


    async componentDidMount() {
        // this.props.getFetchUserData();
    }
    componentDidUpdate(prevProps, prevState, snapShot){
    }
    state = {

    }

    handleSaveMarkdownData = () =>{
        alert('Clicked')
    }
    handleOnChangeDescription = (event) =>{
        this.setState({
            description: event.target.value
        })
    }

    handleChange = ()=>{
        this.setState({selectedDoctor});
        console.log('selected option is: ', selectedDoctor)
    }
    handleEditorChange = ({ html, text }) => {
        console.log('Nội dung HTML:', html);
        console.log('Nội dung Text:', text);
    }
    
    render() {
       
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
                            onChange={this.handleChange}
                            options={options}
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
                    />
                </div>

                <button 
                    className='save-content-doctor rounded-pill' 
                    onClick={() => {this.handleSaveMarkdownData()}}>
                    Lưu thông tin
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
