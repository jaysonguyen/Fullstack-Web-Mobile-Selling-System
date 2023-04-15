import React, { useEffect, useState } from "react";
import { Link, NavLink, json, useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { Hidden } from "@mui/material";
import { BsFilter } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import "../Home.css";

//  product list taken from api
const lists = [
  {
    id: "123",
    title: "Iphone 14 pro max",
    genre: "Dien thoai nha tao",
    type: "Apple",
  },
];
//  using material  data grid to show list products in to table
const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "title", headerName: "title", flex: 1 },
  { field: "genre", headerName: "Genre", flex: 1 },
  { field: "type", headerName: "type", flex: 1 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          {/* // the first link using for show detail products */}
          <Link
            to={{ pathname: "/list/" + params.row.id }}
            state={{ list: params.row }}
          >
            <button className="productListEdit">Edit</button>
          </Link>
          {/* // the second link using for delete product , other function */}
          <MdDeleteOutline
            className="productListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      );
    },
  },
];
const OrderManage = (props) => {
  return (
 
      <div className="order_container">
        <div className="order_body">
          <div className="order_header">
            <h2 className="order_title">Order Detail</h2>
            <div className="order_header_function">
              <button className=" btn btn_open_doc">Open Document</button>
              <button className="btn btn_setup_details">Setup Details</button>
            </div>
          </div>

          <p className="order_desc">
            Here is the order details page of my last project, users can list
            all order on this page, make notes on them and print these lists in
            the format they want. At the same time, they can easily access the
            order they want by making a detailed search.
          </p>
          <ul className="order_body_nav">
            <li>
              <NavLink to="/all_order" className="active">
                All Order
              </NavLink>
            </li>
            <li>
              <NavLink to="/complated">Complated</NavLink>
            </li>
            <li>
              <NavLink to="/continuing">Continuing</NavLink>
            </li>
            <li>
              <NavLink to="/Restitute">Restitue</NavLink>
            </li>
            <li>
              <NavLink to="/canceled">Canceled</NavLink>
            </li>
          </ul>
          <div className="order_body_func">
            <div className="order_body_func_search">
              {/* icons */}
              <input
                type="text"
                placeholder="Search for order ID , customer, order status or something"
              />
            </div>
            <div className="order_body_func_buttons">
              <button className="btn btn_filters">
                <i>
                  <BsFilter />
                </i>

                <NavLink to="/filters">Filters</NavLink>
              </button>
              <button className="btn btn_attachment">
                <i>
                  <MdAttachFile />
                </i>

                <NavLink to="/attachment">Attachment</NavLink>
              </button>
              <button className=" btn btn_export">
                <i>
                  <TbFileExport />
                </i>

                <NavLink to="/export">Exports</NavLink>
              </button>
            </div>
          </div>
          <div className="order_body_table">
            <DataGrid
              rows={lists} //  the data you want to show on the table
              disableSelectionOnClick
              columns={columns}
              pageSize={6}
              checkboxSelection
              getRowId={(r) => r.id} // get row id  for call api or maybe show the different of each item
            />
          </div>
        </div>
      </div>
    
  );
};

export default OrderManage;
