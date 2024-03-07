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
  }, [id]);

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
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone No
        </label>
        <input
          name="phone"
          type="number"
          value={data["phone"]}
          onChange={handleChange}
          className="form-control"
        />
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
          className="form-control"
        />
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
