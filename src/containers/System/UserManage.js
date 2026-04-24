import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService';
import { keys } from 'lodash';

class UserManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrUsers: []
        }
    }


    async componentDidMount() {
        let response = await getAllUsers('ALL')
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.user
            })
        }
        console.log(response)
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
                <div className='title text-center'>Manage user</div>
                <div className="container mt-5">

                    <div className="row justify-content-center">
                        <div className="col-12 col-xl-11">
                            <h2>Get users</h2>
                            <a href="/crud" className="btn btn-outline-primary mb-3"><i className="fas fa-plus"></i> Add New User</a>            
                            <div className="table-responsive shadow-sm">
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

                                        { arrUsers && arrUsers.map((item, index) =>{
                                            console.log('check data: ', item, index)

                                                return (
                                                    <tr key = {item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.firstName}</td>
                                                        <td>{item.lastName}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phoneNumber}</td>
                                                        <td>{item.address}</td>
                                                        <td>{item.roleId}</td>
                                                        <td className='text-center'> 
                                                            <button className='btn-edit'><i className='fas fa-pencil-alt'></i></button> 
                                                            <button className='btn-delete'><i className='fas fa-trash-alt'></i></button> 

                                                        </td>
                                                    </tr>
                                                )
                                            })

                                        }
                                        
                                    </tbody>
                                </table>
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
