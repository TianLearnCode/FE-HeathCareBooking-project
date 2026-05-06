import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from '../../../services/userService'
import { LANGUAGES, CRUD_ACTION, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import './UserRedux.scss'
import TableManageUser from './TableManageUser';
import {toast} from 'react-toastify'
class UserRedux extends Component {
    constructor(props){
        super(props);
        this.state = {
            genderArr:[],
            positionArr:[],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''
        }
    }
    state = {

    }
    componentDidUpdate(prevProps, prevState, snapshot){
        //hàm này sẽ check hiện tại và quá khứ
        //hàm này sẽ chạy mỗi khi hàm render được render thì sẽ gọi đến didupdate
        //so sánh quá khứ là prevProps và hiện tại this.prop  
        //   []                           [1...n]
        if(prevProps.genderRedux !== this.props.genderRedux){
            //ban đầu khi chạy thì quá khứ prevProps.genderRedux (genderRedux lúc đầu rỗng) rỗng 
            //nó so sánh xem có bằng với hiện tại hay không this.props.genderRedux (lúc này this.props.genderRedux đã lấy được API nên không rỗng)
            //vì thế điều khiện !== là đúng => chạy tiếp vào cập nhật state
            let arrGender = this.props.genderRedux
            this.setState({ 
                genderArr: arrGender, //chạy vào setState nạp phần tử vào genderArr
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : ''

            })
        } 
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''

            })

        }
        //sau đó vì hiện tại đã có số phần tử = quá khứ nên hàm didupdate sẽ không chạy nữa 

        if(prevProps.listUsers !== this.props.listUsers){
            let arrGender = this.props.genderRedux;
            let arrPosition = this.props.positionRedux;
            let arrRole = this.props.roleRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: this.state.genderArr && this.state.genderArr.length > 0 ? this.state.genderArr[0].key : '',
                role: this.state.roleArr && this.state.roleArr.length > 0 ? this.state.roleArr[0].key : '',
                position: this.state.positionArr && this.state.positionArr.length > 0 ? this.state.positionArr[0].key : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: ''


            })
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();//fire action
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    handleOnChangeImg = async(event) =>{
        let data = event.target.files;
        let file = data[0]
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64

            })
        }
    }
    openPreviewImg = () => {
        if(!this.state.previewImgUrl){
            return
        }
        this.setState({
            isOpen: true
        })
    }
    
    checkValidateInput = () =>{
        let isValid = true

        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for(let i = 0; i < arrCheck.length;i++){
            if(!this.state[arrCheck[i]]){
                isValid = false
                toast.error("Missing required ", arrCheck[i])
                break;
            }
        }
        return {
            isValid
        }
    }
    onChangeInput = (event, id) =>{
        let copyState = {...this.state} 
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleSaveUser = () =>{
        let  check = this.checkValidateInput()
        // console.log('valid: ', check.isValid)
        let {action} = this.state
        if(check.isValid === false){
            return 
        }
        //fire action redux
        if(action === CRUD_ACTIONS.CREATE){
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.avatar,
            
            })
        // this.props.getFetchUserData();
        }
        //fire redux edit user

        if(action === CRUD_ACTIONS.EDIT){
            this.props.editUserData({
                id: this.state.userEditId,
                // email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.avatar
            })
        }
        
    }
    handleEditUserFromParent = (user) =>{
        let imageBase64 = ''
        if(user.image){
            // const imageBuffer = Buffer.from(JSON.stringify(user.image))
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        
        this.setState({
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                address: user.address,
                gender: user.gender,
                position: user.positionId,
                role: user.roleId,
                avatar: '',
                previewImgUrl: imageBase64,
                action: CRUD_ACTIONS.EDIT,
                userEditId: user.id


                

            })
    }
    render() {
        // console.log('Check state genderArr', this.state.genderArr)
        // console.log('Check state positionArr', this.state.positionArr)
        let genders = this.state.genderArr;
        let isLoadingGender = this.props.isLoadingGender
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        console.log('check role: ',roles)
        let language = this.props.language;
        // console.log('Check redux state mapped to props of react(gender): ', this.props.genderRedux)
        // console.log('Check redux state mapped to props of react(position): ', this.props.positionRedux)
        // console.log('Check redux state mapped to props of react(role): ', this.props.roleRedux)

        let {email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar} = this.state



        return (
            <div className='user-redux-container'>
                <div className="title" >User Redux</div>
                <div className='user-redux-body'>
                    
                    <div className='container'>
                        <div className='row border bg-light.bg-gradient'>
                            <div className='col-12 my-3 title'><FormattedMessage id='manage-user.add'/></div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.firstName'/></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => {this.onChangeInput(event, 'firstName')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.lastName'/></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => {this.onChangeInput(event, 'lastName')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email'/></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => {this.onChangeInput(event, 'email')}}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password'/></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => {this.onChangeInput(event, 'password')}}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phoneNumber'/></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => {this.onChangeInput(event, 'phoneNumber')}}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address'/></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => {this.onChangeInput(event, 'address')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label className="form-label"><FormattedMessage id='manage-user.gender'/></label>
                                <select className="form-select" onChange = {(event) => {this.onChangeInput(event, 'gender')}} value={gender}>
                                    {
                                        genders && genders.length > 0 && genders.map((item, index) =>{
                                            return(
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                            )
                                        })
                                    
                                    }
                                    
                                </select>
                            </div>
                            <div className='col-3'>
                                <label className="form-label"><FormattedMessage id='manage-user.role'/></label>
                                <select className="form-select" onChange = {(event) => {this.onChangeInput(event, 'role')}} value={role}>
                                    {roles && roles.length > 0 && roles.map((item, index) =>{
                                        return(
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label className="form-label"><FormattedMessage id='manage-user.position'/></label>
                                <select className="form-select" onChange = {(event) => {this.onChangeInput(event, 'position')}} value={position}
                                    disabled={this.state.role !== 'R2' ? true : false}
                                    >
                                    {positions && positions.length > 0 && positions.map((item, index) =>{
                                        return(
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            
                            <div className='col-3'>
                                <label className='form-label'><FormattedMessage id='manage-user.image'/></label>
                                <div className='preview-img-container '>
                                    <input id='previewImg' type='file' hidden
                                        
                                        onChange={(event) => this.handleOnChangeImg(event)}
                                    />
                                    <label className='label-upload form-control' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image' style={{backgroundImage: `url(${this.state.previewImgUrl})`}}
                                        onClick={() => this.openPreviewImg()}
                                    >
                                        
                                    </div>
                                </div>
                            </div>

                            <div className='col-12 my-5'>
                                <button className= {this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning form-control' : 'btn btn-primary form-control'} onClick={() => this.handleSaveUser()}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id='manage-user.edit'/> : <FormattedMessage id='manage-user.save'/>}
                                    
                                    
                                </button>

                            </div>  
                            <div className='col-12'>
                                <TableManageUser
                                    handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                    action = {this.state.ac}
                                />
                                
                            </div>
                        </div>
                        
                    </div>
                    
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                            
                        />
                    }

                
                </div>
                    
            </div>
        )
    }

}

// mapStateToProps : map state của redux vào trong props của react
const mapStateToProps = state => {// đưa dữ liệu từ store reducer vào trong component để hiển thị
    return {
        language: state.app.language, //state của app (appReducer) được định nghĩa trong rootReducer
        genderRedux: state.admin.genders, //state của admin (adminReducer) được định nghĩa trong rootReducer và lấy ra dữ liệu của genders
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users

        
    };
};

const mapDispatchToProps = dispatch => {//khai báo hàm dispatch
    return {

        getGenderStart:() => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch (actions.createNewUser(data)),
        getFetchUserData: () => dispatch(actions.fetchAllUserStart()),
        editUserData: (data) => dispatch(actions.editUsersStart(data))
        
        // fetchGenderStartAppRedux:(gender) => dispatch(actions.fetchGenderStart(gender))//fire event
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
