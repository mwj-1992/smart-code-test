import "./App.css";
import Table from "@mui/material/Table";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Backdrop, CircularProgress } from "@mui/material";
import { ABSENCE_TYPPES } from "./helpers/enum";
import {
  insertUrlParam,
  getUrlParameters,
  debounce,
} from "./helpers";

export default function App() {
  const [records, setRecords] = useState([]),
    [total, setTotal] = useState(0),
    [isLoading, setIsLoading] = useState(false);

  /**
   * Object detructuring
   */

  const {
    page = 0,
    limit = 5,
    type = "",
    createdAt = "",
    confirmedAt = "",
    rejectedAt = "",
    name = "",
    admitterNote = "",
    memberNote = "",
  } = getUrlParameters();

  const [query, setQuery] = useState({
    page,
    limit,
    type,
    createdAt,
    confirmedAt,
    rejectedAt,
    name,
    admitterNote,
    memberNote,
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const apiResponse = await fetch(
        `https://k1bu2ybcgc.execute-api.ap-southeast-1.amazonaws.com/dev/absences${window.location.search}`
      );
      const response: any = await apiResponse.json();
      setIsLoading(false);
      console.log(response.rows);
      setRecords(response?.rows || []);
      setTotal(response?.count || 0);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    insertUrlParam("page", newPage);
    setQuery({ ...query, page: newPage });
  };

  /**
   * Handling input text components changes(Using Debounce)
   * @param event
   */
  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    insertUrlParam(event.target.name, event.target.value);
    insertUrlParam("page", 0);

    setQuery({ ...query, [event.target.name]: event.target.value, page: 0 });
  };

  /**
   *  Handling change limit per page change
   * @param event
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    insertUrlParam("limit", event.target.value);
    insertUrlParam("page", 0);

    setQuery({ ...query, limit: parseInt(event.target.value, 10), page: 0 });
  };

  /**
   * Hanlding select/datepicker changes
   * @param event
   */
  const handleChange = (event: any) => {
    event.preventDefault();
    insertUrlParam(event.target.name, event.target.value);
    insertUrlParam("page", 0);

    setQuery({ ...query, [event.target.name]: event.target.value });
  };

  /**
   * Watching query params changes and invoke API call to retrieve the filtered.
   */
  useEffect(() => {
    loadData();
  }, [query]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell size="medium" align="right" colSpan={2}>
                <TextField
                  label="Name"
                  id="outlined-size-small"
                  defaultValue={query.name}
                  size="small"
                  name="name"
                  onChange={debounce(handleTextInputChange)}
                />
              </TableCell>
              <TableCell align="right">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">Type</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    name="type"
                    value={query.type}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {Object.values(ABSENCE_TYPPES).map(
                      (absenceType: string, index: number) => (
                        <MenuItem
                          value={absenceType}
                          key={`${absenceType}`}
                        >
                          {" "}
                          {absenceType}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </TableCell>

              <TableCell align="right" colSpan={2}>
                <TextField
                  label="Admitter Note"
                  id="outlined-size-small"
                  size="small"
                  defaultValue={query.admitterNote}
                  name="admitterNote"
                  onChange={debounce(handleTextInputChange)}
                />
              </TableCell>
              <TableCell align="right" colSpan={1}>
                {" "}
                <TextField
                  label="Member Note"
                  id="outlined-size-small"
                  defaultValue={query.memberNote}
                  size="small"
                  name="memberNote"
                  onChange={debounce(handleTextInputChange)}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  id="date"
                  label="Confirmed At"
                  type="date"
                  size="small"
                  name="confirmedAt"
                  onChange={handleChange}
                  value={query.confirmedAt}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  id="date"
                  label="Rejected At"
                  type="date"
                  value={query.rejectedAt}
                  size="small"
                  name="rejectedAt"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  id="date"
                  label="Created At"
                  type="date"
                  // defaultValue=""
                  value={query.createdAt}
                  name="createdAt"
                  onChange={handleChange}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <TableCell><Button onClick={()=>window.location.search =''} size="small"> clear</Button></TableCell>

            </TableRow>
            <TableRow>
              <TableCell>.No</TableCell>
              <TableCell align="right">Image</TableCell>

              <TableCell size="medium" align="right">
                Name
              </TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Period</TableCell>

              <TableCell align="right">Admitter note</TableCell>
              <TableCell align="right">Member note</TableCell>
              <TableCell align="right">Confirmed At</TableCell>
              <TableCell align="right">Rejected At</TableCell>
              <TableCell align="right">Created At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {records?.length <= 0 ? (
              <TableRow className="no-data">
                <TableCell colSpan={10}> No data found</TableCell>
              </TableRow>
            ) : (
              records.map((record: any, index:number) => (
                <TableRow
                  key={record.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img className="member-image" src={record.member.image} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {record?.member.name || ""}
                  </TableCell>
                  <TableCell align="right">{record?.type || ""}</TableCell>
                  <TableCell align="right">
                    (
                    {moment(record?.endDate).diff(record?.startDate, "days") +
                      1 || 0}
                    ) Days
                  </TableCell>

                  <TableCell align="right">
                    {record.admitterNote || ""}
                  </TableCell>
                  <TableCell align="right">{record.memberNote || ""}</TableCell>
                  <TableCell align="right">
                    {record?.confirmedAt
                      ? moment(record.confirmedAt).format("DD-MM-YYYY hh:mm:ss")
                      : ""}
                  </TableCell>
                  <TableCell align="right">
                    {record?.rejectedAt
                      ? moment(record.rejectedAt).format("DD-MM-YYYY hh:mm:ss")
                      : ""}
                  </TableCell>
                  <TableCell align="right">
                    {record?.createdAt
                      ? moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")
                      : ""}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={10}
                count={total}
                rowsPerPage={query.limit}
                page={query.page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
