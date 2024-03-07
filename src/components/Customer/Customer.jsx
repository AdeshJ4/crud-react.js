// import _ from "lodash";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  deleteCustomer,
  getCustomers,
  saveCustomer,
} from "../../services/customerService";
import { Link } from "react-router-dom";
import CustomerTable from "./CustomerTable";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [count, setTotalCount] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersData = await getCustomers();
        setCustomers(customersData.data.customers);
        setTotalCount(customersData.data.count);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.log(err.message);
      }
    };
    fetchCustomers();
  }, []);

  const addCustomerHandler = async (customer) => {
    const originalCustomers = [...customers];
    try {
      setCustomers([...customers, customer]);
      await saveCustomer(customer);
    } catch (err) {
      console.log(err.response);
      setCustomers(originalCustomers);
    }
  };

  const updateCustomerHandler = async (customer) => {
    const originalCustomers = [...customers];
    try {
      setCustomers(
        customers.map((c) => (c._id === customer._id ? { ...customer } : c))
      );
      await saveCustomer(customer);
    } catch (err) {
      console.log(err.response);
      setCustomers(originalCustomers);
    }
  };

  const handleDelete = useCallback(
    async (customer) => {
      const originalCustomers = [...customers];
      try {
        setCustomers(customers.filter((c) => c._id !== customer._id));
        await deleteCustomer(customer._id);
      } catch (err) {
        console.log(err.response);
        if (err.response && err.response.status === 404) {
          console.log("This customer has already been deleted.");
        }
        setCustomers(originalCustomers);
      }
    },
    [customers]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (count === 0) <p>There are no customers in the database.</p>;

  return (
    <div className="row">
      <div className="col-md-9">
        <Link
          to="/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Customer
        </Link>
        <p className="text-muted">
          Showing <span className="text-primary">{count}</span> Customers in the
          database.
        </p>
        <CustomerTable
          customers={customers}
          onDelete={handleDelete}
          onAdd={addCustomerHandler}
          onUpdate={updateCustomerHandler}
        />
      </div>
    </div>
  );
};

export default Customer;
