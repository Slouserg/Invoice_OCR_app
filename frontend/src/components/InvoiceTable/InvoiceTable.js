import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import TableSortLabel from "@mui/material/TableSortLabel";

const columns = [
  { id: "inv_number", label: "Invoice Number", minWidth: 170 },
  { id: "supplier", label: "Supplier", minWidth: 100 },
  { id: "buyer", label: "Buyer", minWidth: 100 },
  { id: "due_date", label: "Due Date", minWidth: 100 },
  { id: "amount", label: "Amount", minWidth: 100 },
];

const InvoiceTable = ({ invoiceData, openSummary }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");

  const rows = [];
  const dataToSearch = [];
  invoiceData.forEach((invoice) => {
    rows.push({
      inv_number: invoice.invoice_number,
      supplier: invoice.supplier_data.Name,
      buyer: invoice.buyer_data.Name,
      due_date: invoice.due_date,
      amount: invoice.total_price,
    });

    dataToSearch.push({
      inv_number: invoice.invoice_number,
      due_date: invoice.due_date,
      amount: invoice.total_price,
      bank: invoice.bank,
      iban: invoice.iban,
      var_symbol: invoice.var_symbol,
      supplier: invoice.supplier_data.Name,
      buyer: invoice.buyer_data.Name,
      supplier_ico: invoice.supplier_data.ICO,
      supplier_city: invoice.supplier_data.City,
      supplier_dic: invoice.supplier_data.DIC,
      supplier_PSC: invoice.supplier_data.PSC,
      supplier_street: invoice.supplier_data.Street,
      buyer_ico: invoice.buyer_data.ICO,
      buyer_city: invoice.buyer_data.City,
      buyer_dic: invoice.buyer_data.DIC,
      buyer_PSC: invoice.buyer_data.PSC,
      buyer_street: invoice.buyer_data.Street,
    });
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const openInvoiceSummary = (invoiceRowData) => {
    const invoiceDataSelected = invoiceData.filter(
      (invoice) => invoice.invoice_number === invoiceRowData.inv_number,
    );
    openSummary(invoiceDataSelected[0]);
  };

  const filteredRows = dataToSearch.filter((row) => {
    return Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase()),
    );
  });

  const filteredInvoiceData = filteredRows.map((row) => {
    return {
      inv_number: row.inv_number,
      supplier: row.supplier,
      buyer: row.buyer,
      due_date: row.due_date,
      amount: row.amount,
    };
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 5 }}>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={search}
        onChange={handleSearch}
        sx={{ m: 1, width: "25ch" }}
      />
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleSortRequest(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(filteredInvoiceData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    onClick={() => openInvoiceSummary(row)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredInvoiceData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default InvoiceTable;
