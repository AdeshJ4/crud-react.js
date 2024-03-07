import axios from "axios";


export async function getCustomer(customerId) {
  return await axios.get(`http://localhost:5000/api/customers/${customerId}`);
}

export async function getCustomers() {
  return await axios.get(`http://localhost:5000/api/customers`);
}


export async function saveCustomer(customer) {
  if (customer._id) {
    // update customer
    const body = { ...customer };
    delete body._id;
    return await axios.put(`http://localhost:5000/api/customers/${customer._id}`, body);
  } else {
    // new customer
    return await axios.post(`http://localhost:5000/api/customers`, customer);
  }
}

export async function deleteCustomer(customerId) {
  return await axios.delete(`http://localhost:5000/api/customers/${customerId}`);
}
