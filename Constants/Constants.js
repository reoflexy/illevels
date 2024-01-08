import {v4 as uuid} from 'uuid';
import {Image} from 'react-native';

// const iconColor = 'rgb(7,24,16)';
const APP_NAME = 'TradePapi';

const assetServices = [
  {
    id: 1,
    name: 'Bitcoin',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/bitcoin.png')).uri,
    status: 'available',
  },
  {
    id: 2,
    name: 'Ethereum',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/ethereum.png')).uri,
    status: 'available',
  },
  {
    id: 3,
    name: 'Bitcoin cash',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/bitcoincash.png'))
      .uri,
    status: 'available',
  },
  {
    id: 4,
    name: 'USDTether',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/usdtether.png')).uri,
    status: 'available',
  },
  {
    id: 5,
    name: 'BNB',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/bnb.png')).uri,
    status: 'available',
  },
  {
    id: 6,
    name: 'Apple Pay and giftcards',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/applepay.png')).uri,
    status: 'available',
  },
  {
    id: 7,
    name: 'Albert',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/albert.png')).uri,
    status: 'available',
  },
  {
    id: 8,
    name: 'American Express',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/amex.png')).uri,
    status: 'available',
  },
  {
    id: 9,
    name: 'Cash App',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/cashapp.png')).uri,
    status: 'available',
  },
  {
    id: 10,
    name: 'GoBank',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/gobank.jpg')).uri,
    status: 'available',
  },
  {
    id: 11,
    name: 'Go2Bank',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/go2bank.jpg')).uri,
    status: 'available',
  },
  {
    id: 12,
    name: 'Google Pay',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/googlepay.png')).uri,
    status: 'available',
  },
  {
    id: 13,
    name: 'Green dot',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/greendot.png')).uri,
    status: 'available',
  },
  {
    id: 14,
    name: 'Paypal',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/paypal.png')).uri,
    status: 'available',
  },
  {
    id: 15,
    name: 'Zelle',
    rate: '',
    image: Image.resolveAssetSource(require('../assets/img/zelle.png')).uri,
    status: 'available',
  },
];

const utilityServices = [
  {
    id: 1,
    name: 'Airtime purchase',
    subtext: 'All networks',
    link: '',
    icon: 'mobile-alt',
    status: 'available',
  },
  {
    id: 2,
    name: 'Cable Tv subscription',
    subtext: 'All vendors',
    link: '',
    icon: 'tv',
    status: 'available',
  },
  {
    id: 3,
    name: 'Electricity Payment',
    subtext: 'All billers',
    link: '',
    icon: 'lightbulb',
    status: 'available',
  },
  {
    id: 4,
    name: 'Data Bundles',
    subtext: 'All billers',
    link: '',
    icon: 'wifi',
    status: 'available',
  },
  {
    id: 5,
    name: 'Internet',
    subtext: 'All billers',
    link: '',
    icon: 'laptop',
    status: 'available',
  },
  {
    id: 6,
    name: 'Toll',
    subtext: 'All billers',
    link: '',
    icon: 'car-alt',
    status: 'available',
  },
  
];

export {
   APP_NAME,
   assetServices,
   utilityServices

};
