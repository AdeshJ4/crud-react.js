import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomer, saveCustomer } from "../../services/customerService";

const CustomerForm = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    membership: "",
  });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const populateCustomer = async () => {
      const customerId = id;
      if (customerId === "new") return;
      try {
        const { data: customer } = await getCustomer(customerId);
        setData(mapToViewModel(customer));
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.log(err.message);
          navigate("*");
        }
      }
    };
    populateCustomer();
  }, [id, navigate]);

  const mapToViewModel = (customer) => {
    return {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      membership: customer.membership,
    };
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (id === "new") {
          await saveCustomer(data);
        } else {
          await saveCustomer({ _id: id, ...data });
        }
        navigate("/");
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/i.test(values.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Customer Name
        </label>
        <input
          name="name"
          type="text"
          value={data["name"]}
          onChange={handleChange}
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone No
        </label>
        <input
          name="phone"
          type="text"
          value={data["phone"]}
          onChange={handleChange}
          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          name="email"
          id="email"
          type="email"
          value={data["email"]}
          onChange={handleChange}
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Membership</label>
        <select
          name="membership"
          value={data["membership"]}
          onChange={handleChange}
          className="form-control"
        >
          <option value=""> -- Want Membership -- </option>
          <option value={"normal"}>No</option>
          <option value={"bronze"}>Bronze</option>
          <option value={"silver"}>Silver</option>
          <option value={"gold"}>Gold</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CustomerForm;
