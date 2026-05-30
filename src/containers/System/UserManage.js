import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import { keys, result } from 'lodash';
import ModalUser from './ModalUser';
import Swal from 'sweetalert2'
import { use } from 'react';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }


    async componentDidMount() {
        await this.getAllUsersFromReact();
        
    }

    getAllUsersFromReact = async ()=>{
        let response = await getAllUsers('ALL')
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = () =>{
        this.setState({
            isOpenModalUser: true,
            // userEdit: user
        })    
    }
    handleEditUser = async (user)=>{
        console.log('chcek user', user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async (user) =>{

        try{
            let response = await editUserService(user);
            if(response && response.errCode !== 0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text:'There is something wrong!!!'
                })
            }else{
                await this.getAllUsersFromReact()//load lại trang
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Cập nhật thông tin người dùng thành công',
                    confirmButtonColor: 'rgb(26, 255, 42)',
                    confirmButtonText: 'Ok'
                }).then((result)=>{
                    if(result.isConfirmed){
                        this.toggleEditUserModal();
                    }
                })
            }
        }
        catch(e){
            console.log(e)
        }
    }
    
    toggleUserModal =()=>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,

        })
    }
    toggleEditUserModal = () =>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    createNewUser = async (data)=>{
        // alert('check data from child', data)
        // alert('check data from child'+ JSON.stringify(data))
        try{
            let response = await createNewUserService(data);// '/api/create-new-user'
            if(response && response.errCode !==0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.errMessage || 'Something is wrong!'
                })
            }else{
                await this.getAllUsersFromReact();//load lại trang
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Người dùng mới đã được tạo.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    /* 3. Khi người dùng nhấn nút OK (hoặc click ra ngoài/đóng alert)
                    thì ta mới thực hiện đóng Modal
                    */
                    if (result.isConfirmed) {
                        this.toggleUserModal();//làm from modal biến mất
                    }
                    emitter.emit('EVENT_CLEAR_MODAL_DATA')
                });
            }
            // console.log('response create user: ', response)
        }catch(e){
            console.log(e)
        }
        // console.log('check data from child', data)
        
    }
    handleDeleteUser = async (user) => {
        console.log('delete',user)
        Swal.fire({
            icon: 'question',
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc muốn xóa người dùng này?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d63030',
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
        }).then(async (result)=>{
            if(result.isConfirmed){
                try{
                    let response = await deleteUserService(user.id)
                    if(response  && response.errCode === 0){
                        Swal.fire({
                            icon: 'success',
                            title: 'Đã xóa thành công',
                            confirmButtonColor: '#34ea40',
                            confirmButtonText: 'OK',
                        });
                        await this.getAllUsersFromReact();

                    }else{
                        Swal.fire('Lỗi!', response.errMessage, 'error');
                    }
                }
                catch(e){
                    console.log(e)
                }
            }
            
        })
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
        let arrUsers = this.state.arrUsers
        
        return (
            <div className="users-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen = {this.state.isOpenModalEditUser}
                        toggleFromParent = {this.toggleEditUserModal}
                        currentUser = {this.state.userEdit} 
                        editUser = {this.doEditUser}
                    />
                }
                
                <div className='title text-center'>Manage user</div>
                <div className="container mt-5">

                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="user-table-card">
                                <div className="user-table-toolbar">
                                    <div>
                                        <h2 className="user-table-title">User list</h2>
                                        <div className="user-table-subtitle">{arrUsers && arrUsers.length ? arrUsers.length : 0} users in system</div>
                                    </div>
                                    <button className="btn-add-user" onClick={() => this.handleAddNewUser()}>
                                        <i className="fas fa-plus"></i>
                                        <span>Add New User</span>
                                    </button>
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

                                            { arrUsers && arrUsers.length > 0 ? arrUsers.map((item, index) =>{
                                                // console.log('check data: ', item, index)

                                                return (
                                                    <tr key = {item.id}>
                                                        <td><span className="user-id">#{item.id}</span></td>
                                                        <td className="fw-semibold">{item.firstName}</td>
                                                        <td>{item.lastName}</td>
                                                        <td className="user-email">{item.email}</td>
                                                        <td>{item.phoneNumber}</td>
                                                        <td className="user-address">{item.address}</td>
                                                        <td><span className="role-badge">{item.roleId}</span></td>
                                                        <td className='text-center'>
                                                            <div className="table-actions">
                                                                <button className='btn-edit' onClick={() => this.handleEditUser(item)} title="Edit user"><i className='fas fa-pencil-alt'></i></button>
                                                                <button className='btn-delete' onClick={() => this.handleDeleteUser(item)} title="Delete user"><i className='fas fa-trash-alt'></i></button>
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

                        </div>
                    </div>
                    
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
