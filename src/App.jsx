import { Route, Routes } from "react-router-dom";

import Customer from "./components/Customer/Customer";
import CustomerForm from "./components/Customer/CustomerForm";
import NotFound from "./components/NotFound";


const App = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <main className="container">
              <Routes>
                <Route path="/" element={<Customer />} />
                <Route path="/:id" element={<CustomerForm />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
