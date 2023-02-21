/** @format */

import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import HOC from "../../layout/HOC";

const Product = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://oyi65hi3pd.execute-api.ap-south-1.amazonaws.com/development/packagesRouter/getallpackagesByAdmin"
      );
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const deleteData = async (id) => {
    try{
      const { data } = await axios.delete(`https://oyi65hi3pd.execute-api.ap-south-1.amazonaws.com/development`)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
 

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Packages
          </span>
        </div>

        <div style={{ maxWidth: "100%", overflow: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Location  </th>
                <th> Tourist Destination </th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td style={{width : '200px' , height : '200px'}} > {i.location} </td>
                  <td style={{width : '200px'}}> {i.touristDestination} </td>
                  <td style={{width : '200px'}}> {i.price} </td>
                  <td style={{width : '200px'}}> {i.discount} </td>
                  <td style={{width : '200px'}}> {i.DiscountedPrice} </td>
                  <td style={{width : '200px'}}> {i.Type} </td>
                  <td style={{width : '200px'}}> 
                  <ul>
                  {i.Activity?.map((i , index) => (
                      <li key={index}  style={{listStyleType : 'disc'}}> {i} </li>
                  ))}
                  </ul>
                  </td>
                  <td style={{width : '200px'}}> {i.vendorId} </td>
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


export default HOC(Product);
