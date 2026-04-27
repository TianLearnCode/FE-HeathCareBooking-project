import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './UserManage.scss'
import Swal from 'sweetalert2'
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '1',
            roleId: '0'
        }
        this.listenEmitter();
    }
    listenEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () =>{
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: '1',
                roleId: '0'
            })
        })
    }

    componentDidMount() {
    }
    toggle =  () =>{
         this.props.toggleFromParent();

        //  this.setState({
        //     email: '',
        //     password: '',
        //     firstName: '',
        //     lastName: '',
        //     address: '',
        //     phoneNumber: '',
        //     gender: '1',
        //     roleId: '0'
        // });
    }
    handleOnChangeInput = (event, id) =>{
    //nếu sửa đổi state theo this.state[i] = event.target.value; thì sẽ gây mất dữ liệu khi render 

        // console.log(event.target.value, id)
        // //bad code
        // // this.state[id] = event.target.value;
        // // this.setState({
        // //     ...this.state
        // // },()=>{
        // //     console.log('Bad code: ', this.state)
        // // })

        // //good code

        let copyState = {...this.state}; //object laays theo gia tri state
        copyState[id] = event.target.value
        this.setState({
            ...copyState //copy lại state của copystate modify trung gian
        }, ()=>{
            console.log('check good code: ',this.state)
        })

    }
    checkValidInput = () =>{//hàm kiểm tra có nhập hết giá trị chưa
        let isValid = true;//đầu tiên đặt 1 trạng thái mặc định là hợp lệ (isValid)
        let arrInput = ['firstName', 'lastName','email', 'password', 'address', 'phoneNumber', 'gender', 'roleId']
        // tạo 1 mảng chứa các giá trị cần nhập
        for(let i = 0; i < arrInput.length; i++){//duyệt từng phần tử trong mảng
            console.log('check array: ', this.state[arrInput[i]], arrInput[i])
            if(!this.state[arrInput[i]]){//kiểm tra các phần tử theo từng vị trí xem có hợp lệ không
                isValid = false;//nếu không hợp lệ thì sẽ đưa trạng thái isValid về false
                Swal.fire({
                    title: 'Lỗi nhập liệu!',
                    text: 'Bạn đang thiếu thông tin: ' + arrInput[i],
                    icon: 'error',
                    confirmButtonText: 'Đã hiểu'
                });//đưa ra thông báo thiếu sót tại phần tử nào
                break//thoát
            }
        }
        return isValid
    }
    handleAddNewUser =()=>{
        let isValid = this.checkValidInput()//goi checkvalid
        console.log('check add user click: ',this.state)
        if(isValid){
            //khi isValid hợp lệ thì gọi api để tạo user
            this.props.createNewUser(this.state)//gọi function xử lý create user bên UserManage phần tử cha của ModalUser
            //nếu trực tiệp thực hiện hàm createNewUser ở bên hàm con thì trang sẽ phải load lại
        }
    }

    render() {
        

        return (
            <Modal isOpen={this.props.isOpen} toggle={() =>(this.toggle())} 
                className='modal-user-container'
                size='lg'
            >
                <ModalHeader toggle={() =>(this.toggle())} className='custom-modal-header'>Create a new user
                    
                </ModalHeader>
                <ModalBody>
                   <div className="container">
                        <div className="row">
                            <div className="col-6 mb-3">
                                <label className="form-label">First Name</label>
                                <input type="text" className="form-control" 
                                    onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className="col-6 mb-3">
                                <label className="form-label">Last Name</label>
                                <input type="text" className="form-control" 
                                    onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                    value={this.state.lastName}
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder=""
                                    onChange = {(event)=>{this.handleOnChangeInput(event, "email")}}
                                    value = {this.state.email}
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" 
                                    onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                    value={this.state.password}
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <label className="form-label">Address</label>
                                <input type="text" className="form-control" placeholder="123 Main St"
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    value={this.state.address}
                                />
                            </div>
                            <div className="col-4 mb-3">
                                <label className="form-label">Phone Number</label>
                                <input type="text" className="form-control" 
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    value={this.state.phoneNumber}
                                />
                            </div>
                            <div className="col-4 mb-3">
                                <label className="form-label">Gender</label>
                                <select className="form-select" 
                                    onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                    value={this.state.gender}
                                >
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </div>
                            <div className="col-4 mb-3">
                                <label className="form-label">Role</label>
                                <select className="form-select" 
                                    onChange={(event) => this.handleOnChangeInput(event, 'roleId')}
                                    value={this.state.roleId}
                                >
                                    <option value="0">Admin</option>
                                    <option value="1">Doctor</option>
                                    <option value="2">Patient</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button  className='px-3' color="primary" onClick={() =>(this.handleAddNewUser())}>
                    Add new
                </Button>{' '}
                <Button className='px-3' color="secondary" onClick={() =>(this.toggle())}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);








