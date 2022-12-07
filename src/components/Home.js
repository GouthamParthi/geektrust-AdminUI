import Search from "./Search";
import Pagination from "./Pagination";
import UserDetails from "./userdetails";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import "./Home.css";
import axios from "axios";
export default function Home({ endpoint }) {
  const [editSelected, setEditSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUserData] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [pagenumber, setpagenumber] = useState(1);

  const rowPerpage = 10;
  const endDataIndex = pagenumber * rowPerpage;
  const startDataIndex = endDataIndex - rowPerpage;
  const jumpButtonscount = Math.ceil(filteredUserList.length / rowPerpage);
  const paginationArray = Array(jumpButtonscount)
    .fill(0)
    .map((e, i) => i + 1);

  const fetchApi = async () => {
    setIsLoading(true);
    try {
      const Url = `${endpoint}`;
      const res = await axios.get(Url);
      setIsLoading(false);

      const addingCheckbox = res.data.map((user) => {
        return { ...user, Checkbox: false };
      });
      setUserData(addingCheckbox);
      setFilteredUserList(addingCheckbox);
    } catch (e) {
      alert("error");
    }
  };
  
  const handleSearch = (e) => {
  
    const searchresults = usersData.filter((item) => {
      const propertyName = item.name.toLowerCase();
      const propertyEmail = item.email.toLowerCase();
      const propertyRole = item.role.toLowerCase();
      const searchingName = e.target.value.toLowerCase();
      
      return (
        propertyName.includes(searchingName) ||
        propertyEmail.includes(searchingName) ||
        propertyRole.includes(searchingName)
      );
    });

    setFilteredUserList(searchresults);
    setpagenumber(1)
  };
  const handleCheckBox = (e, rowName) => {
    const { name, checked } = e.target;

    if (name == "selectAll") {
      const allSelected = filteredUserList.map((users, i) => {
        if (i >= startDataIndex && i < endDataIndex) {
          return { ...users, Checkbox: checked };
        } else {
          return users;
        }
      });
      setFilteredUserList(allSelected);
    } else {
      const individualSelected = filteredUserList.map((user) => {
        return user.name == name ? { ...user, Checkbox: checked } : user;
      });
      setFilteredUserList(individualSelected);
    }
  };
  const handleDelete = (e, rowName) => {
    if (rowName == "deleteButtonForAll") {
      const deleteAll = filteredUserList.filter((users) => {
        return users.Checkbox !== true;
      });
      setFilteredUserList(deleteAll);
    } else {
    
      const deleteRowFilter = filteredUserList.filter((user) => {
        return user.name !== rowName;
      });
      setUserData(deleteRowFilter);
      setFilteredUserList(deleteRowFilter);
    }
  };
  const handleEdit = (e, nameOfClicked, inputOfEditRowName) => {
    if (nameOfClicked.editButtonForRow) {
      const individualEdit = filteredUserList.map((user) => {
        if (user.name == nameOfClicked.editButtonForRow) {
          setEditSelected(user);
          return { ...user, isEdit: true };
        }
        return user;
      });

      setFilteredUserList(individualEdit);
    } else {
      setEditSelected((state) => {
        return { ...state, [inputOfEditRowName]: e.target.value };
      });
    }
  };
  const handleSave = (e, id) => {
    const individualSave = filteredUserList.map((user) => {
      if (id == user.id) {
        return editSelected;
      } else {
        return user;
      }
    });
    
    setFilteredUserList([...individualSave]);
  };
  const handlePagination = (e, value) => {
    if (value == "previous") {
      if (pagenumber > paginationArray[0]) {
        setpagenumber(pagenumber - 1);
      }
    } else if (value == "next") {
      if (pagenumber < paginationArray[paginationArray.length - 1]) {
        setpagenumber(pagenumber + 1);
      }
    } else if (value == "firstPage") {
      setpagenumber(1);
    } else if (value == "lastPage") {
      setpagenumber(paginationArray.length);
    } else {
      setpagenumber(e.target.value);
    }
  };

  useEffect(() => {
    const handleapi = async () => {
      await fetchApi();
    };
    handleapi();
  }, []);

  return (
    <div className="App">
      <Search handleSearch={handleSearch} />
      {isLoading ? (
        <CircularProgress
          variant="plain"
          sx={{
            "--CircularProgress-size": "70px"
          }}
        />
      ) : (
        <UserDetails
          filteredUserList={filteredUserList}
          startDataIndex={startDataIndex}
          endDataIndex={endDataIndex}
          handleDelete={handleDelete}
          handleCheckBox={handleCheckBox}
          handleEdit={handleEdit}
          handleSave={handleSave}
        />
      )}

      <Pagination
        pagenumber={pagenumber}
        handlePagination={handlePagination}
        paginationArray={paginationArray}
        handleDelete={handleDelete}
      />
    </div>
  );
}
