/** @format */

import HOC from "../../layout/HOC";
import { Table, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Users = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://oyi65hi3pd.execute-api.ap-south-1.amazonaws.com/development/vendorRouter/allusersVendor1"
      );
      setData(data.Users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://oyi65hi3pd.execute-api.ap-south-1.amazonaws.com/development/vendorRouter/signupVendor1",
          { name, email, phone, password, confirmPassword }
        );
        toast.success(data.msg)
        props.onHide()
        fetchData()
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Vendor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="tel" patter="[0-9]{10}" onChange={(e) => setMo(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Vendors
          </span>
          <Button variant="outline-success" onClick={() => setModalShow(true)}>
            Add
          </Button>
        </div>

        <div style={{ maxWidth: "100%", overflow: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Name</th>
                <th> Mobile Number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td> {i.name} </td>
                  <td> {i.phone} </td>
                  <td> {i.email} </td>
                  <td>
                    <i
                      class="fa-sharp fa-solid fa-trash"
                      style={{ color: "red", cursor: "pointer" }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Users);
