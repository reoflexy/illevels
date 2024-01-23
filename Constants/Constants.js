import {v4 as uuid} from 'uuid';
import {Image} from 'react-native';

// const iconColor = 'rgb(7,24,16)';
const APP_NAME = 'ILLevels';

const categories = [
  {id: 1, name:'Menu',icon: 'food',link: 'Menu'},
  {id: 2, name:'Orders',icon: 'history',link: 'History'},
  {id: 3, name:'Profile',icon: 'account',link: 'Profile'},
  {id: 4, name:'Contact',icon: 'information-outline',link: 'Contact'},

]
const contactData =[
  {id: 1, txt:'Instagram',icon: 'instagram',link: 'https://instagram.com/illevels'},
  {id: 2, txt:'FaceBook',icon: 'facebook',link: 'https://facebook.com/illevels'},
  {id: 3, txt:'Mobile',icon: 'phone',link: '+44099999999'},
  {id: 4, txt:'Email',icon: 'email',link: 'illevels@gmail.com'},
]

export {
   APP_NAME,
   categories,
   contactData
};
