const config = {
    /* Images's web url */
    imgDefault:   'https://image.ibb.co/cZqhtc/Lab_Default.png',
    imgDefaultC:  'https://image.ibb.co/cajLeH/Lab_Default_C.png',
    imgLabLogo:   'https://image.ibb.co/dMt79H/Lab_Cln_logo.jpg',
    imagAvatar:   'https://image.ibb.co/iznNnm/Avatar.png',
    imgDragDrop:   'https://image.ibb.co/gaED1L/symbol-Camera.png',
    /* webPage's Routes */
    webRoot:   'https://alejandro-loaiza.herokuapp.com',
    //apiUrl:    'https://alejandro-loaiza.herokuapp.com',
    apiUrl:    'http://localhost:5001',
    /* Api's Routes */
    apiPathPostUser: '/api/v1/users',
    apiPathLoginUser: '/api/v1/user/login',
    emailRegistrationPath: '/auth',
    apiPathProductsAll: '/api/v1/products',
    apiPathCartGetAll: '/api/v1/cart',
    apiPathCartPost: '/api/v1/cart',
    apiPathOrderPost: '/api/v1/orders',
    apiPathOrderGetAll: '/api/v1/orders',
    apiPathNotificationGetAll: '/api/v1/notifications',
  
    text:''
  
  };
  
  //module.exports = config;
  export default config;