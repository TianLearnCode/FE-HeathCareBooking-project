import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import './UserRedux.scss'
class UserRedux extends Component {
    constructor(props){
        super(props);
        this.state = {
            genderArr:[],
            positionArr:[],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false
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
            this.setState({ 
                genderArr: this.props.genderRedux //chạy vào setState nạp phần tử vào genderArr
            })
        } 
        if(prevProps.positionRedux !== this.props.positionRedux){
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            this.setState({
                roleArr: this.props.roleRedux

            })

        }
        //sau đó vì hiện tại đã có số phần tử = quá khứ nên hàm didupdate sẽ không chạy nữa 

    }
    async componentDidMount() {
        this.props.getGenderStart();//fire action
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    handleOnChangeImg = (event) =>{
        let data = event.target.files;
        let file = data[0]
        if(file){
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl

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
    render() {
        // console.log('Check state genderArr', this.state.genderArr)
        // console.log('Check state positionArr', this.state.positionArr)
        let genders = this.state.genderArr;
        let isLoadingGender = this.props.isLoadingGender
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        console.log('Check redux state mapped to props of react(gender): ', this.props.genderRedux)
        console.log('Check redux state mapped to props of react(position): ', this.props.positionRedux)
        console.log('Check redux state mapped to props of react(role): ', this.props.roleRedux)




        return (
            <div className='user-redux-container'>
                <div className="title" >User Redux</div>
                <div className='user-redux-body'>
                    
                    <div className='container'>
                        <div className='row border bg-light.bg-gradient'>
                            <div className='col-12 my-3 title'><FormattedMessage id='manage-user.add'/></div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.firstName'/></label>
                                <input className='form-control' type='text'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.lastName'/></label>
                                <input className='form-control' type='text'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email'/></label>
                                <input className='form-control' type='email'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password'/></label>
                                <input className='form-control' type='password'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phoneNumber'/></label>
                                <input className='form-control' type='text'/>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address'/></label>
                                <input className='form-control' type='text'/>
                            </div>
                            <div className='col-3'>
                                <label className="form-label"><FormattedMessage id='manage-user.gender'/></label>
                                <select className="form-select">
                                    {
                                        genders && genders.length > 0 && genders.map((item, index) =>{
                                            return(
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                            )
                                        })
                                    
                                    }
                                    
                                </select>
                            </div>
                            <div className='col-3'>
                                <label className="form-label"><FormattedMessage id='manage-user.position'/></label>
                                <select className="form-select">
                                    {positions && positions.length > 0 && positions.map((item, index) =>{
                                        return(
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label className="form-label"><FormattedMessage id='manage-user.role'/></label>
                                <select className="form-select">
                                    {roles && roles.length > 0 && roles.map((item, index) =>{
                                        return(
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                        )
                                    })
                                    }
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
                                <button className='btn btn-primary form-control'><FormattedMessage id='manage-user.save'/></button>

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
        roleRedux: state.admin.roles
        
    };
};

const mapDispatchToProps = dispatch => {//khai báo hàm dispatch
    return {

        getGenderStart:() => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
        // fetchGenderStartAppRedux:(gender) => dispatch(actions.fetchGenderStart(gender))//fire event
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
