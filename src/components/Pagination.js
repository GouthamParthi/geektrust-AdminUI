import React from "react";

import { Fab } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./Pagination.css";
import { Button, Stack } from "@mui/material";

const Pagination = ({
  paginationArray,
  handleDelete,
  pagenumber,
  handlePagination
}) => {
  return (
    <Stack direction="row" spacing={5}>
      <Button
        variant="contained"
        name="deleteButtonForAll"
        className="del-button"
        onClick={(e) => handleDelete(e, "deleteButtonForAll")}
      >
        Delete Selected
      </Button>
      <Stack direction="row" className="jump-buttons" spacing={2}>
        <Fab
          xs={1}
          md={2}
          lg={3}
          name="firstPage"
          size="small"
          onClick={(e) => handlePagination(e, "firstPage")}
        >
          <KeyboardDoubleArrowLeftIcon />
        </Fab>
        <Fab
          xs={1}
          md={2}
          lg={3}
          name="previous"
          size="small"
          onClick={(e) => handlePagination(e, "previous")}
        >
          <KeyboardArrowLeftIcon />
        </Fab>

        {paginationArray.map((page) => {
          return (
            <Fab
              key={page}
              name={page}
              style={
                page == pagenumber
                  ? { backgroundColor: "rgb(45, 221, 204)" }
                  : null
              }
              xs={1}
              md={2}
              lg={3}
              size="small"
              value={page}
              onClick={(e) => handlePagination(e, page)}
            >
              {page}
            </Fab>
          );
        })}
        <Fab
          xs={1}
          md={2}
          lg={3}
          name="next"
          size="small"
          onClick={(e) => handlePagination(e, "next")}
        >
          <KeyboardArrowRightIcon />
        </Fab>
        <Fab
          xs={1}
          md={2}
          lg={3}
          name="lastPage"
          size="small"
          onClick={(e) => handlePagination(e, "lastPage")}
        >
          <KeyboardDoubleArrowRightIcon />
        </Fab>
      </Stack>
    </Stack>
  );
};
export default Pagination;
