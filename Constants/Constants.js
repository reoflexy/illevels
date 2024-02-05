import {v4 as uuid} from 'uuid';
import {Image} from 'react-native';

// const iconColor = 'rgb(7,24,16)';
const APP_NAME = 'I-Levels';

const categories = [
  {id: 1, name:'Menu',icon: 'food',link: 'Menu'},
  {id: 2, name:'Orders',icon: 'history',link: 'History'},
  {id: 3, name:'Profile',icon: 'account',link: 'Profile'},
  {id: 4, name:'Contact',icon: 'information-outline',link: 'Contact'},

]
const categoriesAdmin = [
  {id: 1, name:'Menu',icon: 'food',link: 'AdminMenuPage'},
  {id: 2, name:'Add Item',icon: 'plus',link: 'AddMenu'},
  {id: 3, name:'Orders',icon: 'history',link: 'AdminOrdersPage'},
  // {id: 4, name:'Profiles',icon: 'account',link: 'Profiles'},
  {id: 4, name:'Statistics',icon: 'information-outline',link: 'AdminStats'},

]
const contactData =[
  {id: 1, txt:'Instagram',icon: 'instagram',link: 'https://instagram.com/ilevels'},
  {id: 2, txt:'FaceBook',icon: 'facebook',link: 'https://facebook.com/ilevels'},
  {id: 3, txt:'Mobile',icon: 'phone',link: '+44099999999'},
  {id: 4, txt:'Email',icon: 'email',link: 'sales@ilevelsinstant.com'},
]

export {
   APP_NAME,
   categories,
   contactData,
   categoriesAdmin
};
