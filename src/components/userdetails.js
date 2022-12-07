import React from "react";
import UserTable from "./usertable";
import { Box } from "@mui/material";

import "./userdetails.css";
const UserDetails = ({
  filteredUserList,
  startDataIndex,
  endDataIndex,
  handleDelete,
  handleEdit,
  handleCheckBox,

  handleSave
}) => {
  return (
    <Box className="table">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  filteredUserList
                    .slice(startDataIndex, endDataIndex)
                    .filter((user) => {
                      return user?.Checkbox === !true;
                    }).length < 1
                }
                name="selectAll"
                className="checkbox"
                onChange={handleCheckBox}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        {filteredUserList.length ? (
          filteredUserList.slice(startDataIndex, endDataIndex).map((user) => {
            return (
              <UserTable
                key={user.id}
                user={user}
                handleCheckBox={handleCheckBox}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleSave={handleSave}
              />
            );
          })
        ) : (
          <tbody style={{ fontSize: "40px", fontWeight: "20px" }}>
            <tr>
              <td> No users</td>
            </tr>
          </tbody>
        )}
      </table>
    </Box>
  );
};
export default UserDetails;
