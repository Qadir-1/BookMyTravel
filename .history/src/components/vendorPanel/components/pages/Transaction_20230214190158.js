import React from 'react'
import HOC from '../layout/HOC'
import { Table, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Transaction = () => {
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
  
  
  
    return (
      <>
    
  
        <section>
          <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
            <span className="tracking-widest text-slate-900 font-semibold uppercase ">
              All Transactions
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


export default HOC(Transaction)