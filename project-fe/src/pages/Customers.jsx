import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

const Customers = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete', 'Add'];
  const editing = { allowAdding: false, allowDeleting: true, allowEditing: true };

  const customerGridImage = (props) => (
    <div className="image flex gap-4">
      <img
        className="rounded-full w-10 h-10"
        src={props.picture}
        alt="employee"
      />
      <div>
        <p>{props.name}</p>
        <p>{props.email}</p>
      </div>
    </div>
  );

  const customerGridStatus = (props) => {
    let statusBgColor;

    switch (props.status.toLowerCase()) {
      case 'active':
        statusBgColor = '#8BE78B';
        break;
      case 'pending':
        statusBgColor = '#FEC90F';
        break;
      case 'passive':
        statusBgColor = 'red';
        break;
      default:
        statusBgColor = 'transparent';
    }

    return (
      <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
        <p style={{ background: statusBgColor }} className="rounded-full h-3 w-3" />
        <p>{props.status}</p>
      </div>
    );
  };

  const customersGrid = [
    { type: 'checkbox', width: '50' },
    {
      field: "name",
      headerText: 'Name',
      width: '150',
      template: customerGridImage,
      textAlign: 'Center',
      allowSorting: true,
    },
    {
      field: 'disability',
      headerText: 'Disability',
      width: '150',
      textAlign: 'Center',
      allowSorting: true
    },
    {
      field: "status",
      headerText: 'Status',
      width: '130',
      textAlign: 'Center',
      template: customerGridStatus,
      allowSorting: true
    },
    {
      field: 'age',
      headerText: 'Age',
      width: '100',
      textAlign: 'Center',
      allowSorting: true
    },
    {
      field: 'location',
      headerText: 'Location',
      width: '150',
      textAlign: 'Center',
      allowSorting: true
    },
  ];

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/get_all_customers`, config);
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleActionComplete = async (args) => {
    if (args.requestType === 'delete') {
      const deletedRecord = args.promise;
      console.log(deletedRecord)
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customers}
        enableHover={true}
        allowPaging
        pageSettings={{ pageSize: 8, pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        actionComplete={handleActionComplete}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
