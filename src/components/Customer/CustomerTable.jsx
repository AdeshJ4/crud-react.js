import React, { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import Table from "../common/Table";

const CustomerTable = ({ customers, onDelete, onUpdate }) => {
  const columns = [
    {
      path: "name",
      label: "Name",
      content: (customer) => (
        <Link to={`/${customer._id}`}>{customer.name}</Link>
      ),
    },
    { path: "phone", label: "Phone" },
    { path: "email", label: "Email" },
    { path: "membership", label: "Membership" },
    {
      key: "update",
      content: (customer) => (
        <NavLink className="btn btn-primary btn-sm" to={`/${customer._id}`}>
          Update
        </NavLink>
      ),
    },
    {
      key: "delete",
      content: (customer) => (
        <button
          onClick={() => onDelete(customer)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} data={customers} />
    </>
  );
};

export default memo(CustomerTable);
// import React, { memo } from "react";
// import { Link } from "react-router-dom";
// // import _ from "lodash";
// import Table from "../common/Table";

// const CustomerTable = ({ customers, onDelete }) => {
//   const columns = [
//     {
//       path: "name",
//       label: "Name",
//       content: (customer) => (
//         <Link to={`/${customer._id}`}>{customer.name}</Link>
//       ),
//     },
//     { path: "phone", label: "Phone" },
//     { path: "email", label: "Email" },
//     { path: "membership", label: "Membership" },
//     {
//       key: "delete",
//       content: (customer) => (
//         <button
//           onClick={() => onDelete(customer)}
//           className="btn btn-danger btn-sm"
//         >
//           Delete
//         </button>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Table columns={columns} data={customers} />
//     </>
//   );
// };

// export default memo(CustomerTable);
