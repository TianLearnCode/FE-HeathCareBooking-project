import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            isFavorite: false,
            isBookingOpen: true,
            selectedDateIndex: 0,
        };
        // Tạo ref để tham chiếu đến khung cuộn các tab ngày
        this.dateTabsRef = React.createRef();
    }

    async componentDidMount() {
        // window.scrollTo(0, 0);
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            if (prevProps.match.params.id !== id) {
                let res = await getDetailInforDoctor(id);
                if (res && res.errCode === 0) {
                    this.setState({
                        detailDoctor: res.data,
                    });
                }
            }
        }
    }

    toggleFavorite = () => {
        this.setState({ isFavorite: !this.state.isFavorite });
    }

    toggleBooking = () => {
        this.setState({ isBookingOpen: !this.state.isBookingOpen });
    }

    selectDate = (index) => {
        this.setState({ selectedDateIndex: index });
    }

    // Xử lý khi nhấn nút mũi tên TRÁI: Cuộn slide sang trái
    handleDatePrev = () => {
        if (this.dateTabsRef.current) {
            this.dateTabsRef.current.scrollBy({
                left: -200, // Khoảng cách cuộn ngược lại (px), thay đổi tùy CSS của bạn
                behavior: 'smooth'
            });
        }
        // Giữ lại logic cập nhật index nếu bạn vẫn cần quản lý active tab
        this.setState(prevState => ({
            selectedDateIndex: Math.max(prevState.selectedDateIndex - 1, 0)
        }));
    }

    // Xử lý khi nhấn nút mũi tên PHẢI: Cuộn slide sang phải
    handleDateNext = () => {
        if (this.dateTabsRef.current) {
            this.dateTabsRef.current.scrollBy({
                left: 200, // Khoảng cách cuộn tiến lên (px), thay đổi tùy CSS của bạn
                behavior: 'smooth'
            });
        }
        // Giữ lại logic cập nhật index (giới hạn theo chiều dài của mảng scheduleDates trừ 1)
        this.setState(prevState => ({
            selectedDateIndex: Math.min(prevState.selectedDateIndex + 1, 13) // Mảng của bạn hiện có 14 phần tử
        }));
    }

    render() {
        let { language } = this.props;
        let { detailDoctor, isFavorite, isBookingOpen, selectedDateIndex } = this.state;

        let nameVi = '', nameEn = '';
        let imageBase64 = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        if (detailDoctor && detailDoctor.image) {
            imageBase64 = new Buffer(detailDoctor.image, 'base64').toString('binary');
        }

        // Sample schedule data
        const scheduleDates = [
            { day: 'Thứ 4', date: '10-06', slots: '10 khung giờ' },
            { day: 'Thứ 6', date: '12-06', slots: '10 khung giờ' },
            { day: 'Thứ 2', date: '15-06', slots: '10 khung giờ' },
            { day: 'Thứ 4', date: '17-06', slots: '9 khung giờ' },
            { day: 'Thứ 6', date: '19-06', slots: '9 khung giờ' },
            { day: 'Thứ 2', date: '22-06', slots: '10 khung giờ' },
            { day: 'Thứ 2', date: '22-06', slots: '10 khung giờ' },
            { day: 'Thứ 2', date: '22-06', slots: '10 khung giờ' },
            { day: 'Thứ 2', date: '22-06', slots: '10 khung giờ' },
            { day: 'Thứ 2', date: '22-06', slots: '10 khung giờ' },
            { day: 'Thứ 2', date: '22-06', slots: '10 khung giờ' },
            { day: 'Thứ 2', date: '22-06', slots: '10 khung giờ' },
            { day: 'Thứ 2', date: '22-06', slots: '10 khung giờ' },
            { day: 'Thứ 2', date: '22-06', slots: '10 khung giờ' },
        ];

        const timeSlots = [
            '18:15 - 18:30',
            '18:30 - 18:45',
            '18:45 - 19:00',
            '18:45 - 19:00',
            '18:45 - 19:00',
            '18:45 - 19:00',
        ];

        const specialties = [
            'Viêm dạ dày',
            'Bệnh lý Hậu môn',
            'Ung thư đại trực tràng',
            'Bệnh lý Thực quản',
            'Bệnh lý về Dạ dày',
        ];

        const education = [
            '1994 - Tốt nghiệp Đại học y dược TP. Hồ Chí Minh',
            '1998 - Thạc sĩ chuyên ngành Ngoại tổng quát - Tốt nghiệp Đại học y dược TP. Hồ Chí Minh',
            '2008 - Tiến sĩ chuyên ngành Ngoại tổng quát - Tốt nghiệp Đại học y dược TP. Hồ Chí Minh',
        ];

        const experience = [
            '1995 - nay: Bệnh viện Chợ Rẫy',
            '2013 - nay: Trưởng khoa ngoại niệu tiêu hóa Bệnh viện Chợ Rẫy.',
            '2022 - nay: Phó giám đốc Bệnh viện Chợ Rẫy',
        ];

        let contentHtml = '';
        if (detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML) {
            contentHtml = detailDoctor.Markdown.contentHTML;
        }

        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='detail-doctor-container'>
                    {/* Breadcrumb */}
                    <div className='breadcrumb'>
                        <span className='breadcrumb-link'>Trang chủ</span>
                        <span className='breadcrumb-separator'>/</span>
                        <span className='breadcrumb-current'>Bác sĩ</span>
                    </div>

                    {/* Doctor Intro Section */}
                    <div className='doctor-intro-section'>
                        <div className='doctor-intro-content'>
                            <div className='doctor-avatar'>
                                <div className='avatar-image'
                                    style={{
                                        backgroundImage: imageBase64
                                            ? `url(${imageBase64})`
                                            : `url(https://via.placeholder.com/120)`
                                    }}
                                />
                            </div>
                            <div className='doctor-info'>
                                <div className='doctor-name-row'>
                                    <h1 className='doctor-name'>
                                        {language === LANGUAGES.VI ? nameVi : nameEn}
                                    </h1>
                                    <div className='favorite-btn' onClick={this.toggleFavorite}>
                                        <i className={isFavorite ? 'fas fa-heart' : 'far fa-heart'}></i>
                                        <span>Yêu thích</span>
                                    </div>
                                </div>
                                <div className='doctor-badge'>
                                    <span className='badge-icon'><i className='fas fa-check-circle'></i></span>
                                    <span className='badge-text'>Bác sĩ</span>
                                    <span className='experience-text'>32 năm kinh nghiệm</span>
                                </div>
                                <div className='doctor-details'>
                                    <div className='detail-row'>
                                        <span className='detail-label'>Chuyên khoa</span>
                                        <span className='detail-value specialty-tags'>
                                            <span className='tag-link'>Tiêu hoá</span>
                                            <span className='tag-link'>Ngoại tiết niệu</span>
                                        </span>
                                    </div>
                                    <div className='detail-row'>
                                        <span className='detail-label'>Chức vụ</span>
                                        <span className='detail-value'>Phó Giám Đốc Bệnh Viện Chợ Rẫy</span>
                                    </div>
                                    <div className='detail-row'>
                                        <span className='detail-label'>Nơi công tác</span>
                                        <span className='detail-value'>Bệnh viện Chợ Rẫy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notice Section */}
                    <div className='notice-section'>
                        <div className='notice-content'>
                            <div className='notice-icon'>
                                <i className='fas fa-exclamation-circle'></i>
                            </div>
                            <div className='notice-text'>
                                <div className='notice-title'>Lưu ý</div>
                                <p>PK BS Lâm Việt Trung nghỉ ngày 20/10 đến 26/10; 27/10 làm lại bình thường.</p>
                                <p>* Nếu bệnh nhân bận việc không đến khám được vui lòng hủy lịch khám đã đặt và đặt lại ngày khác. Xin cảm ơn!</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Booking Section */}
                    <div className='booking-section'>
                        <div className='booking-header' onClick={this.toggleBooking}>
                            <h2 className='booking-title'>Đặt khám nhanh</h2>
                            <div className={`booking-toggle ${isBookingOpen ? 'open' : ''}`}>
                                <i className='fas fa-chevron-down'></i>
                            </div>
                        </div>
                        {isBookingOpen && (
                            <div className='booking-body'>
                                {/* Date Tabs */}
                                <div className='date-tabs-wrapper'>
                                    <button className='date-nav-btn prev' onClick={this.handleDatePrev}>
                                        <i className='fas fa-chevron-left'></i>
                                    </button>
                                    {/* Gắn ref vào div chứa danh sách các tab ngày ở đây */}
                                    <div className='date-tabs' ref={this.dateTabsRef}>
                                        {scheduleDates.map((item, index) => (
                                            <div
                                                className={`date-tab ${selectedDateIndex === index ? 'active' : ''}`}
                                                key={index}
                                                onClick={() => this.selectDate(index)}
                                            >
                                                <div className='date-day'>{item.day}, {item.date}</div>
                                                <div className='date-slots'>{item.slots}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className='date-nav-btn next' onClick={this.handleDateNext}>
                                        <i className='fas fa-chevron-right'></i>
                                    </button>
                                </div>

                                {/* Time Slots */}
                                <div className='time-section'>
                                    <div className='time-label'>
                                        <i className='far fa-clock'></i>
                                        <span>Buổi chiều</span>
                                    </div>
                                    <div className='time-slots'>
                                        {timeSlots.map((slot, index) => (
                                            <div className='time-slot' key={index}>
                                                {slot}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sticky Bottom Bar */}
                    <div className='support-booking-bar'>
                        <div className='support-phone'>
                            <span className='phone-label'>Hỗ trợ đặt khám</span>
                            <span className='phone-number'>1900-2805</span>
                        </div>
                        <button className='btn-book-now'>ĐẶT KHÁM NGAY</button>
                    </div>

                    {/* Introduction Section */}
                    <div className='intro-section'>
                        <h2 className='section-title'>Giới thiệu</h2>
                        {contentHtml ? (
                            <div className='intro-content' dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
                        ) : (
                            <div className='intro-content'>
                                {detailDoctor.MarkDown && detailDoctor.MarkDown.description
                                    ? <span dangerouslySetInnerHTML={{ __html: detailDoctor.MarkDown.description }} />
                                    : 'Không có thông tin giới thiệu về bác sĩ này.'}
                            </div>
                        )}
                    </div>

                    {/* Specialties Section */}
                    <div className='specialties-section'>
                        <h2 className='section-title'>Chuyên khám</h2>
                        <div className='specialties-grid'>
                            {specialties.map((item, index) => (
                                <div className='specialty-tag' key={index}>
                                    <i className='fas fa-check-circle'></i>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className='address-section'>
                        <div className='address-card'>
                            <h3 className='address-title'>Địa chỉ</h3>
                            <p className='address-text'>
                                Phòng mạch: 53 Phạm Hữu Chí, Phường 12,<br />
                                Quận 5, Hồ Chí Minh
                            </p>
                            <div className='open-map-btn'>
                                <i className='fas fa-map-marker-alt'></i>
                                <span>Mở bản đồ</span>
                            </div>
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className='education-section'>
                        {detailDoctor.MarkDown && detailDoctor.MarkDown.contentHTML ? (
                            <div className='education-content' dangerouslySetInnerHTML={{ __html: detailDoctor.MarkDown.contentHTML }}></div>
                        ) : (
                            <div className='education-content'>
                                <p>Không có thông tin học vấn về bác sĩ này.</p>
                            </div>
                        )}
                    </div>





                    {/* Sticky Bottom Support Bar */}
                    <div className='support-booking-bar bottom-sticky'>
                        <div className='support-phone'>
                            <span className='phone-label'>Hỗ trợ đặt khám</span>
                            <span className='phone-number'>1900-2805</span>
                        </div>
                        <button className='btn-book-now'>ĐẶT KHÁM NGAY</button>
                    </div>
                </div>
                <HomeFooter />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);