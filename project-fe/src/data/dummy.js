import React from 'react';
import { FiMap, FiBarChart, FiCreditCard } from 'react-icons/fi';
import { BsBoxSeam, BsCurrencyDollar, BsShield } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GrLocation } from 'react-icons/gr';
import avatar from './avatar.jpg';
import avatar2 from './avatar2.jpg';
import avatar3 from './avatar3.png';
import avatar4 from './avatar4.jpg';

const gridEmployeeProfile = (props) => (
  <div className="flex items-center gap-2">
    <img
      className="rounded-full w-10 h-10"
      src={props.EmployeeImage}
      alt="employee"
    />
    <p>{props.Name}</p>
  </div>
);

const gridEmployeeCountry = (props) => (
  <div className="flex items-center justify-center gap-2">
    <GrLocation />
    <span>{props.Country}</span>
  </div>
);
export const EditorData = () => (
  <div>
    <h3>
      Try React
      React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app, the links in this section will help you get started.

      Online Playgrounds
      If you’re interested in playing around with React, you can use an online code playground. Try a Hello World template on CodePen, CodeSandbox, or Stackblitz.

      If you prefer to use your own text editor, you can also download this HTML file, edit it, and open it from the local filesystem in your browser. It does a slow runtime code transformation, so we’d only recommend using this for simple demos.

      Add React to a Website
      You can add React to an HTML page in one minute. You can then either gradually expand its presence, or keep it contained to a few dynamic widgets.

      Create a New React App
      When starting a React project, a simple HTML page with script tags might still be the best option. It only takes a minute to set up!

      As your application grows, you might want to consider a more integrated setup. There are several JavaScript toolchains we recommend for larger applications. Each of them can work with little to no configuration and lets you take full advantage of the rich React ecosystem. Learn how.

      Learn React
      People come to React from different backgrounds and with different learning styles. Whether you prefer a more theoretical or a practical approach, we hope you’ll find this section helpful.

      If you prefer to learn by doing, start with our practical tutorial.
      If you prefer to learn concepts step by step, start with our guide to main concepts.
      Like any unfamiliar technology, React does have a learning curve. With practice and some patience, you will get the hang of it.

      First Examples
      The React homepage contains a few small React examples with a live editor. Even if you don’t know anything about React yet, try changing their code and see how it affects the result.

      React for Beginners
      If you feel that the React documentation goes at a faster pace than you’re comfortable with, check out this overview of React by Tania Rascia. It introduces the most important React concepts in a detailed, beginner-friendly way. Once you’re done, give the documentation another try!

      React for Designers
      If you’re coming from a design background, these resources are a great place to get started.

      JavaScript Resources
      The React documentation assumes some familiarity with programming in the JavaScript language. You don’t have to be an expert, but it’s harder to learn both React and JavaScript at the same time.

      We recommend going through this JavaScript overview to check your knowledge level. It will take you between 30 minutes and an hour but you will feel more confident learning React.
    </h3>
  </div>
);
const customerGridImage = (props) => (
  <div className="image flex gap-4">
    <img
      className="rounded-full w-10 h-10"
      src={props.CustomerImage}
      alt="employee"
    />
    <div>
      <p>{props.CustomerName}</p>
      <p>{props.CustomerEmail}</p>
    </div>
  </div>
);

const customerGridStatus = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
    <p>{props.Status}</p>
  </div>
);

export const colorMappingData = [
  [
    { x: 'Jan', y: 6.96 },
    { x: 'Feb', y: 8.9 },
    { x: 'Mar', y: 12 },
    { x: 'Apr', y: 17.5 },
    { x: 'May', y: 22.1 },
    { x: 'June', y: 25 },
    { x: 'July', y: 29.4 },
    { x: 'Aug', y: 29.6 },
    { x: 'Sep', y: 25.8 },
    { x: 'Oct', y: 21.1 },
    { x: 'Nov', y: 15.5 },
    { x: 'Dec', y: 9.9 },
  ],
  ['#FFFF99'],
  ['#FFA500'],
  ['#FF4040'],
];

export const rangeColorMapping = [
  {
    label: '1°C to 10°C',
    start: '1',
    end: '10',
    colors: colorMappingData[1]
  },

  {
    label: '11°C to 20°C',
    start: '11',
    end: '20',
    colors: colorMappingData[2]
  },

  {
    label: '21°C to 30°C',
    start: '21',
    end: '30',
    colors: colorMappingData[3]
  },

];

export const ColorMappingPrimaryXAxis = {
  valueType: 'Category',
  majorGridLines: { width: 0 },
  title: 'Months',
};

export const ColorMappingPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}°C',
  title: 'Temperature',
};

export const FinancialPrimaryXAxis = {
  valueType: 'DateTime',
  minimum: new Date('2016, 12, 31'),
  maximum: new Date('2017, 9, 30'),
  crosshairTooltip: { enable: true },
  majorGridLines: { width: 0 },
};

export const FinancialPrimaryYAxis = {
  title: 'Price',
  minimum: 100,
  maximum: 180,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
};

export const LinePrimaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'y',
  intervalType: 'Years',
  edgeLabelPlacement: 'Shift',
  majorGridLines: { width: 0 },
  background: 'white',
};

export const LinePrimaryYAxis = {
  labelFormat: '{value}%',
  rangePadding: 'None',
  minimum: 0,
  maximum: 100,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};

export const customersGrid = [
  { type: 'checkbox', width: '50' },
  {
    headerText: 'Name',
    width: '150',
    template: customerGridImage,
    textAlign: 'Center'
  },
  {
    field: 'ProjectName',
    headerText: 'Project Name',
    width: '150',
    textAlign: 'Center'
  },
  {
    field: 'Status',
    headerText: 'Status',
    width: '130',
    format: 'yMd',
    textAlign: 'Center',
    template: customerGridStatus
  },
  {
    field: 'Weeks',
    headerText: 'Weeks',
    width: '100',
    format: 'C2',
    textAlign: 'Center'
  },
  {
    field: 'Budget',
    headerText: 'Budget',
    width: '100',
    format: 'yMd',
    textAlign: 'Center'
  },

  {
    field: 'Location',
    headerText: 'Location',
    width: '150',
    textAlign: 'Center'
  },

  {
    field: 'CustomerID',
    headerText: 'Customer ID',
    width: '120',
    textAlign: 'Center',
    isPrimaryKey: true,
  },

];

export const employeesGrid = [
  {
    headerText: 'Employee',
    width: '150',
    template: gridEmployeeProfile,
    textAlign: 'Center'
  },
  {
    field: 'Name',
    headerText: '',
    width: '0',
    textAlign: 'Center',
  },
  {
    field: 'Title',
    headerText: 'Designation',
    width: '170',
    textAlign: 'Center',
  },
  {
    headerText: 'Country',
    width: '120',
    textAlign: 'Center',
    template: gridEmployeeCountry
  },

  {
    field: 'HireDate',
    headerText: 'Hire Date',
    width: '135',
    format: 'yMd',
    textAlign: 'Center'
  },

  {
    field: 'ReportsTo',
    headerText: 'Reports To',
    width: '120',
    textAlign: 'Center'
  },
  {
    field: 'EmployeeID',
    headerText: 'Employee ID',
    width: '125',
    textAlign: 'Center'
  },
];

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'map',
        icon: <FiMap />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'employees',
        icon: <IoMdContacts />,
      },
      {
        name: 'customers',
        icon: <RiContactsLine />,
      },
    ],
  },
];

export const chatData = [
  {
    image: avatar,
    message: 'Midpoint Viaport is accessible now! We may go and try :)',
    desc: 'Kaan sent you new message',
    time: '9:08 AM',
  },
  {
    image: avatar2,
    message: 'I went to Tuzla Marina, it was a very bad experience. Don\'t go there',
    desc: 'Salma sent you new message',
    time: '11:56 AM',
  },
  {
    image: avatar3,
    message: 'All places are checked, you can go all of them.',
    desc: 'Admin sent you a message',
    time: '4:39 AM',
  },
];

export const earningData = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: '39,354',
    percentage: '-4%',
    title: 'Customers',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
  {
    icon: <BsBoxSeam />,
    amount: '4,396',
    percentage: '+23%',
    title: 'Products',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
  },
  {
    icon: <FiBarChart />,
    amount: '423,39',
    percentage: '+38%',
    title: 'Sales',
    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',

    pcColor: 'green-600',
  },
  {
    icon: <HiOutlineRefresh />,
    amount: '39,354',
    percentage: '-12%',
    title: 'Refunds',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
];

export const recentTransactions = [
  {
    icon: <BsCurrencyDollar />,
    amount: '+$350',
    title: 'Paypal Transfer',
    desc: 'Money Added',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'green-600',
  },
  {
    icon: <BsShield />,
    amount: '-$560',
    desc: 'Bill Payment',
    title: 'Wallet',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
  {
    icon: <FiCreditCard />,
    amount: '+$350',
    title: 'Credit Card',
    desc: 'Money reversed',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',

    pcColor: 'green-600',
  },
  {
    icon: <TiTick />,
    amount: '+$350',
    title: 'Bank Transfer',
    desc: 'Money Added',

    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',
    pcColor: 'green-600',
  },
  {
    icon: <BsCurrencyDollar />,
    amount: '-$50',
    percentage: '+38%',
    title: 'Refund',
    desc: 'Payment Sent',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];

export const customersData = [
  {
    CustomerID: 1001,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerImage:
      avatar2,
    ProjectName: 'Hosting Press HTML',
    Status: 'Active',
    StatusBg: '#8BE78B',
    Weeks: '40',
    Budget: '$2.4k',
    Location: 'India',
  },
  {
    CustomerID: 1002,

    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    ProjectName: 'Elite Admin',
    Status: 'Active',
    CustomerImage:
      avatar3,

    StatusBg: '#8BE78B',
    Weeks: '11',
    Budget: '$3.9k',
    Location: 'India',
  },
  {
    CustomerID: 1003,

    CustomerName: 'Andrew McDownland',
    CustomerEmail: 'andrew@gmail.com',
    ProjectName: 'Real Homes WP Theme',
    Status: 'Pending',
    CustomerImage:
      avatar4,
    StatusBg: '#FEC90F',
    Weeks: '19',
    Budget: '$24.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1004,

    CustomerName: 'Christopher Jamil',
    CustomerEmail: 'jamil@gmail.com',
    ProjectName: 'MedicalPro WP Theme',
    Status: 'Completed',
    CustomerImage:
      avatar,
    StatusBg: '#8BE78B',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1005,

    CustomerName: 'Michael',
    CustomerEmail: 'michael@gmail.com',
    ProjectName: 'Weekly WP Theme',
    Status: 'Cancel',
    CustomerImage:
      avatar2,
    StatusBg: 'red',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1006,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerImage:
      avatar2,
    ProjectName: 'Hosting Press HTML',
    Status: 'Active',
    StatusBg: '#8BE78B',
    Weeks: '40',
    Budget: '$2.4k',
    Location: 'India',
  },
  {
    CustomerID: 1007,

    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    ProjectName: 'Elite Admin',
    Status: 'Active',
    CustomerImage:
      avatar3,

    StatusBg: '#8BE78B',
    Weeks: '11',
    Budget: '$3.9k',
    Location: 'India',
  },
  {
    CustomerID: 1008,

    CustomerName: 'Andrew McDownland',
    CustomerEmail: 'andrew@gmail.com',
    ProjectName: 'Real Homes WP Theme',
    Status: 'Pending',
    CustomerImage:
      avatar4,
    StatusBg: '#FEC90F',
    Weeks: '19',
    Budget: '$24.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1009,

    CustomerName: 'Christopher Jamil',
    CustomerEmail: 'jamil@gmail.com',
    ProjectName: 'MedicalPro WP Theme',
    Status: 'Completed',
    CustomerImage:
      avatar,
    StatusBg: '#8BE78B',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1010,

    CustomerName: 'Michael',
    CustomerEmail: 'michael@gmail.com',
    ProjectName: 'Weekly WP Theme',
    Status: 'Cancel',
    CustomerImage:
      avatar2,
    StatusBg: 'red',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1011,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerImage:
      avatar2,
    ProjectName: 'Hosting Press HTML',
    Status: 'Active',
    StatusBg: '#8BE78B',
    Weeks: '40',
    Budget: '$2.4k',
    Location: 'India',
  },
  {
    CustomerID: 1012,

    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    ProjectName: 'Elite Admin',
    Status: 'Active',
    CustomerImage:
      avatar3,

    StatusBg: '#8BE78B',
    Weeks: '11',
    Budget: '$3.9k',
    Location: 'India',
  },
  {
    CustomerID: 1013,

    CustomerName: 'Andrew McDownland',
    CustomerEmail: 'andrew@gmail.com',
    ProjectName: 'Real Homes WP Theme',
    Status: 'Pending',
    CustomerImage:
      avatar4,
    StatusBg: '#FEC90F',
    Weeks: '19',
    Budget: '$24.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1014,

    CustomerName: 'Christopher Jamil',
    CustomerEmail: 'jamil@gmail.com',
    ProjectName: 'MedicalPro WP Theme',
    Status: 'Completed',
    CustomerImage:
      avatar,
    StatusBg: '#8BE78B',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1015,

    CustomerName: 'Michael',
    CustomerEmail: 'michael@gmail.com',
    ProjectName: 'Weekly WP Theme',
    Status: 'Cancel',
    CustomerImage:
      avatar2,
    StatusBg: 'red',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1016,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerImage:
      avatar2,
    ProjectName: 'Hosting Press HTML',
    Status: 'Active',
    StatusBg: '#8BE78B',
    Weeks: '40',
    Budget: '$2.4k',
    Location: 'India',
  },
  {
    CustomerID: 1017,

    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    ProjectName: 'Elite Admin',
    Status: 'Active',
    CustomerImage:
      avatar3,

    StatusBg: '#8BE78B',
    Weeks: '11',
    Budget: '$3.9k',
    Location: 'India',
  },
  {
    CustomerID: 1018,

    CustomerName: 'Andrew McDownland',
    CustomerEmail: 'andrew@gmail.com',
    ProjectName: 'Real Homes WP Theme',
    Status: 'Pending',
    CustomerImage:
      avatar4,
    StatusBg: '#FEC90F',
    Weeks: '19',
    Budget: '$24.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1019,

    CustomerName: 'Christopher Jamil',
    CustomerEmail: 'jamil@gmail.com',
    ProjectName: 'MedicalPro WP Theme',
    Status: 'Completed',
    CustomerImage:
      avatar,
    StatusBg: '#8BE78B',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1020,

    CustomerName: 'Michael',
    CustomerEmail: 'michael@gmail.com',
    ProjectName: 'Weekly WP Theme',
    Status: 'Cancel',
    CustomerImage:
      avatar2,
    StatusBg: 'red',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1021,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerImage:
      avatar2,
    ProjectName: 'Hosting Press HTML',
    Status: 'Active',
    StatusBg: '#8BE78B',
    Weeks: '40',
    Budget: '$2.4k',
    Location: 'India',
  },
  {
    CustomerID: 1022,

    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    ProjectName: 'Elite Admin',
    Status: 'Active',
    CustomerImage:
      avatar3,

    StatusBg: '#8BE78B',
    Weeks: '11',
    Budget: '$3.9k',
    Location: 'India',
  },
  {
    CustomerID: 1023,

    CustomerName: 'Andrew McDownland',
    CustomerEmail: 'andrew@gmail.com',
    ProjectName: 'Real Homes WP Theme',
    Status: 'Pending',
    CustomerImage:
      avatar4,
    StatusBg: '#FEC90F',
    Weeks: '19',
    Budget: '$24.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1024,

    CustomerName: 'Christopher Jamil',
    CustomerEmail: 'jamil@gmail.com',
    ProjectName: 'MedicalPro WP Theme',
    Status: 'Completed',
    CustomerImage:
      avatar,
    StatusBg: '#8BE78B',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1025,

    CustomerName: 'Michael',
    CustomerEmail: 'michael@gmail.com',
    ProjectName: 'Weekly WP Theme',
    Status: 'Cancel',
    CustomerImage:
      avatar2,
    StatusBg: 'red',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1026,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerImage:
      avatar2,
    ProjectName: 'Hosting Press HTML',
    Status: 'Active',
    StatusBg: '#8BE78B',
    Weeks: '40',
    Budget: '$2.4k',
    Location: 'India',
  },
  {
    CustomerID: 1027,

    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    ProjectName: 'Elite Admin',
    Status: 'Active',
    CustomerImage:
      avatar3,

    StatusBg: '#8BE78B',
    Weeks: '11',
    Budget: '$3.9k',
    Location: 'India',
  },
  {
    CustomerID: 1028,

    CustomerName: 'Andrew McDownland',
    CustomerEmail: 'andrew@gmail.com',
    ProjectName: 'Real Homes WP Theme',
    Status: 'Pending',
    CustomerImage:
      avatar4,
    StatusBg: '#FEC90F',
    Weeks: '19',
    Budget: '$24.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1029,

    CustomerName: 'Christopher Jamil',
    CustomerEmail: 'jamil@gmail.com',
    ProjectName: 'MedicalPro WP Theme',
    Status: 'Completed',
    CustomerImage:
      avatar,
    StatusBg: '#8BE78B',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1030,

    CustomerName: 'Michael',
    CustomerEmail: 'michael@gmail.com',
    ProjectName: 'Weekly WP Theme',
    Status: 'Cancel',
    CustomerImage:
      avatar2,
    StatusBg: 'red',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1031,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerImage:
      avatar2,
    ProjectName: 'Hosting Press HTML',
    Status: 'Active',
    StatusBg: '#8BE78B',
    Weeks: '40',
    Budget: '$2.4k',
    Location: 'India',
  },
  {
    CustomerID: 1032,

    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    ProjectName: 'Elite Admin',
    Status: 'Active',
    CustomerImage:
      avatar3,

    StatusBg: '#8BE78B',
    Weeks: '11',
    Budget: '$3.9k',
    Location: 'India',
  },
  {
    CustomerID: 1033,

    CustomerName: 'Andrew McDownland',
    CustomerEmail: 'andrew@gmail.com',
    ProjectName: 'Real Homes WP Theme',
    Status: 'Pending',
    CustomerImage:
      avatar4,
    StatusBg: '#FEC90F',
    Weeks: '19',
    Budget: '$24.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1034,

    CustomerName: 'Christopher Jamil',
    CustomerEmail: 'jamil@gmail.com',
    ProjectName: 'MedicalPro WP Theme',
    Status: 'Completed',
    CustomerImage:
      avatar,
    StatusBg: '#8BE78B',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1035,

    CustomerName: 'Michael',
    CustomerEmail: 'michael@gmail.com',
    ProjectName: 'Weekly WP Theme',
    Status: 'Cancel',
    CustomerImage:
      avatar2,
    StatusBg: 'red',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1036,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerImage:
      avatar2,
    ProjectName: 'Hosting Press HTML',
    Status: 'Active',
    StatusBg: '#8BE78B',
    Weeks: '40',
    Budget: '$2.4k',
    Location: 'India',
  },
  {
    CustomerID: 1037,

    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    ProjectName: 'Elite Admin',
    Status: 'Active',
    CustomerImage:
      avatar3,

    StatusBg: '#8BE78B',
    Weeks: '11',
    Budget: '$3.9k',
    Location: 'India',
  },
  {
    CustomerID: 1038,

    CustomerName: 'Andrew McDownland',
    CustomerEmail: 'andrew@gmail.com',
    ProjectName: 'Real Homes WP Theme',
    Status: 'Pending',
    CustomerImage:
      avatar4,
    StatusBg: '#FEC90F',
    Weeks: '19',
    Budget: '$24.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1039,
    CustomerName: 'Christopher Jamil',
    CustomerEmail: 'jamil@gmail.com',
    ProjectName: 'MedicalPro WP Theme',
    Status: 'Completed',
    CustomerImage:
      avatar,
    StatusBg: '#8BE78B',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },
  {
    CustomerID: 1040,
    CustomerName: 'Michael',
    CustomerEmail: 'michael@gmail.com',
    ProjectName: 'Weekly WP Theme',
    Status: 'Cancel',
    CustomerImage:
      avatar2,
    StatusBg: 'red',
    Weeks: '34',
    Budget: '$16.5k',
    Location: 'USA',
  },

];

export const employeesData = [
  {
    EmployeeID: 28384,
    Name: 'Kaan Adalılar',
    Title: 'Software Engineer',
    HireDate: '01/10/2023',
    Country: 'Turkey',
    ReportsTo: 'Süha Orhun Mutluergil',
    EmployeeImage:
      avatar,
  },
  {
    EmployeeID: 28276,
    Name: 'Arda Baydar',
    Title: 'Software Engineer',
    HireDate: '01/10/2023',
    Country: 'Turkey',
    ReportsTo: 'Süha Orhun Mutluergil',
    EmployeeImage:
      avatar3,
  },
  {
    EmployeeID: 28263,
    Name: 'Buket Yurt',
    Title: 'Software Engineer',
    HireDate: '01/10/2023',
    Country: 'Turkey',
    ReportsTo: 'Süha Orhun Mutluergil',
    EmployeeImage:
      avatar2,
  },
  {
    EmployeeID: 28958,
    Name: 'Tuna Dağdanaş',
    Title: 'Software Engineer',
    HireDate: '01/10/2023',
    Country: 'Turkey',
    ReportsTo: 'Süha Orhun Mutluergil',
    EmployeeImage:
      avatar4,
  }
];

export const scheduleData = [
  {
    Id: 1,
    Subject: 'Explosion of Betelgeuse Star',
    Location: 'Space Center USA',
    StartTime: '2021-01-10T04:00:00.000Z',
    EndTime: '2021-01-10T05:30:00.000Z',
    CategoryColor: '#1aaa55',
  },
  {
    Id: 2,
    Subject: 'Thule Air Crash Report',
    Location: 'Newyork City',
    StartTime: '2021-01-11T06:30:00.000Z',
    EndTime: '2021-01-11T08:30:00.000Z',
    CategoryColor: '#357cd2',
  },
  {
    Id: 3,
    Subject: 'Blue Moon Eclipse',
    Location: 'Space Center USA',
    StartTime: '2021-01-12T04:00:00.000Z',
    EndTime: '2021-01-12T05:30:00.000Z',
    CategoryColor: '#7fa900',
  },
  {
    Id: 4,
    Subject: 'Meteor Showers in 2021',
    Location: 'Space Center USA',
    StartTime: '2021-01-13T07:30:00.000Z',
    EndTime: '2021-01-13T09:00:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 5,
    Subject: 'Milky Way as Melting pot',
    Location: 'Space Center USA',
    StartTime: '2021-01-14T06:30:00.000Z',
    EndTime: '2021-01-14T08:30:00.000Z',
    CategoryColor: '#00bdae',
  },
  {
    Id: 6,
    Subject: 'Mysteries of Bermuda Triangle',
    Location: 'Bermuda',
    StartTime: '2021-01-14T04:00:00.000Z',
    EndTime: '2021-01-14T05:30:00.000Z',
    CategoryColor: '#f57f17',
  },
  {
    Id: 7,
    Subject: 'Glaciers and Snowflakes',
    Location: 'Himalayas',
    StartTime: '2021-01-15T05:30:00.000Z',
    EndTime: '2021-01-15T07:00:00.000Z',
    CategoryColor: '#1aaa55',
  },
  {
    Id: 8,
    Subject: 'Life on Mars',
    Location: 'Space Center USA',
    StartTime: '2021-01-16T03:30:00.000Z',
    EndTime: '2021-01-16T04:30:00.000Z',
    CategoryColor: '#357cd2',
  },
  {
    Id: 9,
    Subject: 'Alien Civilization',
    Location: 'Space Center USA',
    StartTime: '2021-01-18T05:30:00.000Z',
    EndTime: '2021-01-18T07:30:00.000Z',
    CategoryColor: '#7fa900',
  },
  {
    Id: 10,
    Subject: 'Wildlife Galleries',
    Location: 'Africa',
    StartTime: '2021-01-20T05:30:00.000Z',
    EndTime: '2021-01-20T07:30:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 11,
    Subject: 'Best Photography 2021',
    Location: 'London',
    StartTime: '2021-01-21T04:00:00.000Z',
    EndTime: '2021-01-21T05:30:00.000Z',
    CategoryColor: '#00bdae',
  },
  {
    Id: 12,
    Subject: 'Smarter Puppies',
    Location: 'Sweden',
    StartTime: '2021-01-08T04:30:00.000Z',
    EndTime: '2021-01-08T06:00:00.000Z',
    CategoryColor: '#f57f17',
  },
  {
    Id: 13,
    Subject: 'Myths of Andromeda Galaxy',
    Location: 'Space Center USA',
    StartTime: '2021-01-06T05:00:00.000Z',
    EndTime: '2021-01-06T07:00:00.000Z',
    CategoryColor: '#1aaa55',
  },
  {
    Id: 14,
    Subject: 'Aliens vs Humans',
    Location: 'Research Center of USA',
    StartTime: '2021-01-05T04:30:00.000Z',
    EndTime: '2021-01-05T06:00:00.000Z',
    CategoryColor: '#357cd2',
  },
  {
    Id: 15,
    Subject: 'Facts of Humming Birds',
    Location: 'California',
    StartTime: '2021-01-19T04:00:00.000Z',
    EndTime: '2021-01-19T05:30:00.000Z',
    CategoryColor: '#7fa900',
  },
  {
    Id: 16,
    Subject: 'Sky Gazers',
    Location: 'Alaska',
    StartTime: '2021-01-22T05:30:00.000Z',
    EndTime: '2021-01-22T07:30:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 17,
    Subject: 'The Cycle of Seasons',
    Location: 'Research Center of USA',
    StartTime: '2021-01-11T00:00:00.000Z',
    EndTime: '2021-01-11T02:00:00.000Z',
    CategoryColor: '#00bdae',
  },
  {
    Id: 18,
    Subject: 'Space Galaxies and Planets',
    Location: 'Space Center USA',
    StartTime: '2021-01-11T11:30:00.000Z',
    EndTime: '2021-01-11T13:00:00.000Z',
    CategoryColor: '#f57f17',
  },
  {
    Id: 19,
    Subject: 'Lifecycle of Bumblebee',
    Location: 'San Fransisco',
    StartTime: '2021-01-14T00:30:00.000Z',
    EndTime: '2021-01-14T02:00:00.000Z',
    CategoryColor: '#7fa900',
  },
  {
    Id: 20,
    Subject: 'Alien Civilization',
    Location: 'Space Center USA',
    StartTime: '2021-01-14T10:30:00.000Z',
    EndTime: '2021-01-14T12:30:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 21,
    Subject: 'Alien Civilization',
    Location: 'Space Center USA',
    StartTime: '2021-01-10T08:30:00.000Z',
    EndTime: '2021-01-10T10:30:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 22,
    Subject: 'The Cycle of Seasons',
    Location: 'Research Center of USA',
    StartTime: '2021-01-12T09:00:00.000Z',
    EndTime: '2021-01-12T10:30:00.000Z',
    CategoryColor: '#00bdae',
  },
  {
    Id: 23,
    Subject: 'Sky Gazers',
    Location: 'Greenland',
    StartTime: '2021-01-15T09:00:00.000Z',
    EndTime: '2021-01-15T10:30:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 24,
    Subject: 'Facts of Humming Birds',
    Location: 'California',
    StartTime: '2021-01-16T07:00:00.000Z',
    EndTime: '2021-01-16T09:00:00.000Z',
    CategoryColor: '#7fa900',
  },
];