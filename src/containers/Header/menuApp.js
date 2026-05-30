export const adminMenu = [
    { // 1. Quản lý người dùng
        name: 'menu.admin.user-manage', 
        menus: [
            {
                name: 'menu.admin.crud', 
                link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', 
                link: '/system/user-redux'
            },
            {
                name: 'menu.admin.doctor-manage', 
                link: '/system/manage-doctor'
            },
            {
                name: 'menu.doctor.schedule', 
                link: '/system/schedule-manage'
            }
        ]
    },
    { // 2. Quản lý phòng khám
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.clinic-manage', 
                link: '/system/clinic-manage'
            }
        ]
    },
    { // 3. Quản lý chuyên khoa
        name: 'menu.admin.specialty', 
        menus: [
            {
                name: 'menu.admin.manage-specialty', 
                link: '/system/manage-specialty'
            }
        ]
    },
    { // 4. Quản lý cẩm nang
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook', 
                link: '/system/manage-handbook'
            }
        ]
    }
];

export const doctorMenu = [
    { // Quản lý lịch khám bệnh dành riêng cho Doctor
        name: 'menu.doctor.manage-schedule', 
        menus: [
            {
                name: 'menu.doctor.schedule', 
                link: '/system/schedule-manage' // Sửa lại đúng đường dẫn quản lý lịch
            }
        ]
    }
];
    


// export const adminMenu = [
//     { //quản lý người dùng
//         name: 'menu.admin.user-manage', 
//         menus: [
           
//              {
//                 name: 'menu.admin.crud', link: '/system/user-manage'
                
//             },
//             {
//                 name: 'menu.admin.crud-redux', link: '/system/user-redux'
                
//             },
//             {
//                 name: 'menu.admin.doctor-manage', link: '/system/manage-doctor'
                
//             },
//             // {
//             //     name: 'menu.admin.admin-manage', link: '/system/user-admin'
                
//             // },
//             {
//                 name: 'menu.doctor.manage-schedule', 
//                 menus: [
//                     { 
//                         name: 'menu.doctor.schedule', link: '/system/schedule-manage',
//                         link: '/system/manage-doctor'
//                     },
//                 ]
//             }
           

//              // {
//             //     name: 'menu.system.system-administrator.header',
//             //     // subMenus: [
//             //     //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
//             //     //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
//             //     // ]
//             // },
//         ]
//     },
//     { //quản lý phòng khám
//         name: 'menu.admin.clinic', 
//         menus: [
           
//              {
//                 name: 'menu.admin.clinic-manage', link: '/system/clinic-manage'
                
//             },

//              // {
//             //     name: 'menu.system.system-administrator.header',
//             //     // subMenus: [
//             //     //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
//             //     //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
//             //     // ]
//             // },
//         ]
//     },
//     { //quản lý chuyên khoa
//         name: 'menu.admin.specialty', 
//         menus: [
           
//              {
//                 name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
                
//             },
            
           

//              // {
//             //     name: 'menu.system.system-administrator.header',
//             //     // subMenus: [
//             //     //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
//             //     //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
//             //     // ]
//             // },
//         ]
//     },

//     { //quản lý cẩm nang
//         name: 'menu.admin.handbook', 
//         menus: [
           
//              {
//                 name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
                
//             },
            
           

//              // {
//             //     name: 'menu.system.system-administrator.header',
//             //     // subMenus: [
//             //     //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
//             //     //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
//             //     // ]
//             // },
//         ]
//     },
// ];

// export const doctorMenu = [
//     { //quản lý lịch khám bệnh
//         name: 'menu.doctor.manage-schedule', 
//         menus: [
           
//              {
//                 name: 'menu.doctor.schedule', link: '/system/user-manage'
                
//             },
            
//         ]
//     },
    
// ];