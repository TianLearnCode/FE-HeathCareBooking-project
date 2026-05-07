import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {getAllUsers} from '../../../services/userService'
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions' 
import MdEditor from 'react-markdown-editor-lite/lib/index.js';
import 'react-markdown-editor-lite/lib/index.css';

// Dùng require để ép Webpack đọc file .js (tránh lỗi .mjs)
const MarkdownIt = require('markdown-it');
const mdParser = new MarkdownIt();

class TableManageUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            usersRedux: []
        }
    }


    async componentDidMount() {
        this.props.getFetchUserData();
    }
    componentDidUpdate(prevProps, prevState, snapShot){
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }
    state = {

    }

    handleDelete = (user)=>{
        
        this.props.deleteUserAction(user.id)
    }
    handleEdit = (user) =>{
        console.log('edit test: ',user)
        this.props.handleEditUserFromParentKey(user)
    }
    handleEditorChange = ({ html, text }) => {
        console.log('Nội dung HTML:', html);
        console.log('Nội dung Text:', text);
    }
    /*** Với front end có life cycle (vòng đời) khi chạy
     * Run component:
     *  1. Run constructor -> initstate
     *  2. Hàm componentDidMount (gọi Api, lấy giá trị vào và set state, 
     * state sẽ lưu trữ các giá trị và dùng state trong render để đưa ra giá trị)
     *  3. Render
     * 
     * 
     * 
     * 
     */

    render() {
        console.log('Check user list: ', this.props.listUsers)
        console.log('Check user list state: ', this.state.usersRedux)
        let arrUsers = this.state.usersRedux
        return (
            <React.Fragment>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />

                <table className="table table-info table-striped table-hover table-bordered">
                    <thead className="table-dark">

                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Address</th>
                        <th scope="col">Role</th>
                        <th scope="col" className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) =>{
                            return(
                                <tr key={index}>

                                    <td>{item.id}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{item.roleId}</td>
                                    <td className='text-center'> 
                                        <button className='btn-edit' onClick={() => {this.handleEdit(item)}}><i className='fas fa-pencil-alt'></i></button> 
                                        <button className='btn-delete' onClick={()=>{this.handleDelete(item)}}><i className='fas fa-trash-alt'></i></button> 

                                    </td>
                                </tr>
                            )
                        })}
                    


                                            
                    </tbody>
                </table>

            </React.Fragment>
           
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getFetchUserData: () => dispatch(actions.fetchAllUserStart()),
        deleteUserAction: (id) => dispatch(actions.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
