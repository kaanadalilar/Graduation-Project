import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { GrLocation } from 'react-icons/gr';
import { Header } from '../components';

const Employees = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const gridEmployeeProfile = (props) => (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full w-10 h-10"
        src={props.picture}
        alt="employee"
      />
      <p>{props.name}</p>
    </div>
  );

  const gridEmployeeCountry = (props) => (
    <div className="flex items-center justify-center gap-2">
      <GrLocation />
      <span>{props.country}</span>
    </div>
  );

  const employeesGrid = [
    {
      headerText: 'Employee',
      width: '150',
      template: gridEmployeeProfile,
      textAlign: 'Center',
    },
    {
      field: 'designation',
      headerText: 'Designation',
      width: '170',
      textAlign: 'Center',
    },
    {
      headerText: 'Country',
      width: '120',
      textAlign: 'Center',
      template: gridEmployeeCountry,
    },

    {
      field: 'hireDate',
      headerText: 'Hire Date',
      width: '135',
      format: 'yMd',
      textAlign: 'Center',
    },

    {
      field: 'reportsTo',
      headerText: 'Reports To',
      width: '120',
      textAlign: 'Center',
    },
    {
      field: 'id',
      headerText: 'Employee ID',
      width: '125',
      textAlign: 'Center',
    },
  ];

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employees/get_employees`, config);
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const toolbarOptions = ['Search'];

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {loading ? (
        <div className="loading-bar">Loading...</div>
      ) : (
        <>
          <Header category="Page" designation="Employees" />
          <GridComponent
            dataSource={employees}
            width="auto"
            allowPaging
            allowSorting
            pageSettings={{ pageCount: 5 }}
            editSettings={editing}
            toolbar={toolbarOptions}
          >
            <ColumnsDirective>
              {employeesGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject services={[Search, Page]} />
          </GridComponent>
        </>
      )}
    </div>
  );
};
export default Employees;
