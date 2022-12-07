import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";

const UserTable = ({
  user,
  handleCheckBox,
  handleEdit,
  handleDelete,
  handleSave
}) => {
  return (
    <tbody
      key={user.id}
      {...(user.Checkbox
        ? { className: "selected" }
        : { className: "unSelected" })}
    >
      <tr>
        <th scope="row">
          <input
            type="checkbox"
            name={user.name}
            checked={user.Checkbox}
            className="checkbox"
            onChange={handleCheckBox}
          />
        </th>
        <td>
          {user.isEdit ? (
            <input
              name="name"
              defaultValue={user.name}
              onKeyUp={(e) => handleEdit(e, user.name, "name")}
            />
          ) : (
            user.name
          )}
        </td>
        <td>
          {user.isEdit ? (
            <input
              name="email"
              defaultValue={user.email}
              onKeyUp={(e) => handleEdit(e, user.email, "email")}
            />
          ) : (
            user.email
          )}
        </td>
        <td>
          {user.isEdit ? (
            <input
              name="role"
              defaultValue={user.role}
              onKeyUp={(e) => handleEdit(e, user.role, "role")}
            />
          ) : (
            user.role
          )}
        </td>
        <td>
          <Button
            name={user.name}
            aria-label="delete"
            onClick={(e) => handleDelete(e, user.name)}
            size="large"
          >
            <DeleteOutlineIcon fontSize="small" />
          </Button>

          {!user.isEdit ? (
            <Button
              editrowname="editButtonForRow"
              onClick={(e) => handleEdit(e, { editButtonForRow: user.name })}
            >
              <EditIcon />
            </Button>
          ) : (
            <Button name="save" onClick={(e) => handleSave(e, user.id)}>
              <SaveIcon />
            </Button>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default UserTable;
