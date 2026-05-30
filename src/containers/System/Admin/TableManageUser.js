import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getAllUsers } from '../../../services/userService';
import { connect } from 'react-redux';

import './TableManageUser.scss';
import * as actions from '../../../store/actions';

// SỬA THÀNH LIB ĐỂ KHỚP VỚI BẢN 1.3.0
import 'react-markdown-editor-lite/lib/index.css';

// Khai báo các biến require đồng bộ với file ManageDoctor
const MdEditor = require('react-markdown-editor-lite').default;
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

                <div className="user-table-card redux-table-card">
                    <div className="user-table-toolbar">
                        <div>
                            <h2 className="user-table-title">User list</h2>
                            <div className="user-table-subtitle">{arrUsers && arrUsers.length ? arrUsers.length : 0} users in system</div>
                        </div>
                    </div>

                    <div className="user-table-responsive">
                        <table className="user-management-table">
                            <thead>

                                <tr>
                                <th scope="col">ID</th>
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
                                {arrUsers && arrUsers.length > 0 ? arrUsers.map((item, index) =>{
                                    return(
                                        <tr key={index}>

                                            <td><span className="user-id">#{item.id}</span></td>
                                            <td className="fw-semibold">{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td className="user-email">{item.email}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td className="user-address">{item.address}</td>
                                            <td><span className="role-badge">{item.roleId}</span></td>
                                            <td className='text-center'>
                                                <div className="table-actions">
                                                    <button className='btn-edit' onClick={() => {this.handleEdit(item)}} title="Edit user"><i className='fas fa-pencil-alt'></i></button>
                                                    <button className='btn-delete' onClick={()=>{this.handleDelete(item)}} title="Delete user"><i className='fas fa-trash-alt'></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="8" className="empty-users">
                                        <i className="far fa-folder-open"></i>
                                        <span>No users found</span>
                                    </td>
                                </tr>
                            }




                            </tbody>
                        </table>
                    </div>
                </div>

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
