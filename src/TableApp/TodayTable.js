// import React from 'react'
// import PropTypes from 'prop-types';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   { id: 'colourarrow', numeric: false, lable: 'ca' },
//   { id: 'sym', numeric: false, label: 'SYM' },
//   { id: 'price', numeric: true, label: 'Price' },
//   { id: 'diff', numeric: true, label: 'Differ- ence' },
//   { id: 'maxp', numeric: true, label: 'Max Price' },
//   { id: 'maxt', numeric: true, label: 'Time for Max Price' },
//   { id: 'minp', numeric: true, label: 'Min Price' },
//   { id: 'mint', numeric: true, label: 'Time for Min Price' },
//   { id: 'volume', numeric: true, label: 'Volume' },
// ];

// function EnhancedTableHead(props) {
//   const { classes, order, orderBy, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={'right'}
//             padding={'default'}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}

//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   paper: {
//     width: '100%',
//     marginBottom: theme.spacing(4),
//   },
//   table: {
//     minWidth: 750,
//   },
//   cell_short: {
//     width: 50,
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: 'rect(0 0 0 0)',
//     height: 1,
//     margin: -1,
//     overflow: 'hidden',
//     padding: 0,
//     position: 'absolute',
//     top: 20,
//     width: 1,
//   },
// }));

// function nFormatter(num, digits) {
//   var si = [
//     { value: 1, symbol: "" },
//     { value: 1E3, symbol: "k" },
//     { value: 1E6, symbol: "Million" },
//     { value: 1E9, symbol: "G" },
//     { value: 1E12, symbol: "Trillion" },
//     { value: 1E15, symbol: "P" },
//     { value: 1E18, symbol: "E" }
//   ];
//   var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
//   var i;
//   for (i = si.length - 1; i > 0; i--) {
//     if (num >= si[i].value) {
//       break;
//     }
//   }
//   return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
// }


// export default function TodayEnhancedTable({ data }) {
//   const classes = useStyles();
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('sym');
//   const [selected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const currentDate = Date().slice(0, 28);

//   return (
//     <div className={classes.root}>
//       <hr />
//       <Paper className={classes.paper} ></Paper>
//       <TableContainer>
//         <Table className={classes.table} aria-labelledby="tableTitle" size={'medium'} aria-label="caption table">
//           <caption>Last Updated:{currentDate}</caption>
//           <EnhancedTableHead classes={classes} numSelected={selected.length} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={data.length} />
//           {(data.length > 0) ? (
//             <TableBody >
//               {stableSort(data, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
//                 return (
//                   <TableRow>
//                     {row.diff < 0 ? (
//                       <TableCell class="bg-danger text-center">
//                         <svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
//                         </svg></TableCell>
//                     ) : null}
//                     {row.diff > 0 ? (
//                       <TableCell class="bg-success text-center">
//                         <svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
//                         </svg></TableCell>
//                     ) : null}
//                     {row.diff == 0 ? (
//                       <TableCell fill="#F5F5F5">
//                         <svg width="30" height="30" viewBox="0 0 16 16" class="bi bi-dash" fill="grey" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
//                         </svg></TableCell>
//                     ) : null}
//                     <TableCell className={classes.cell_short} align="right">{row.sym}</TableCell>
//                     <TableCell align="right">${row.price.toFixed(2)}</TableCell>
//                     <TableCell className={classes.cell_short} align="right">{row.diff.toFixed(2)}%</TableCell>
//                     <TableCell align="right">${row.maxp.toFixed(2)}</TableCell>
//                     <TableCell align="right">{row.maxt.slice(11, 19)}</TableCell>
//                     <TableCell align="right">${row.minp.toFixed(2)}</TableCell>
//                     <TableCell align="right">{row.mint.slice(11, 19)}</TableCell>
//                     <TableCell align="right">{nFormatter(row.volume, 2)} </TableCell>

//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           ) : (
//             <TableBody>
//               <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell><h5>Loading...</h5></TableCell>
//                     <TableCell> </TableCell>
//                     <TableCell> </TableCell>
//                     <TableCell></TableCell>
//             </TableBody>
//             )}
//         </Table>
//       </TableContainer>
//       <TablePagination rowsPerPageOptions={[5, 10]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
//     </div>
//   );
// }

import React from 'react'
import './index.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { borders } from '@material-ui/system'
import moment from 'moment';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: " k" },
    { value: 1E6, symbol: " " },
    { value: 1E9, symbol: " G" },
    { value: 1E12, symbol: " T" },
    { value: 1E15, symbol: " P" },
    { value: 1E18, symbol: " E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}


const headCells = [
  { id: 'colourarrow', numeric: false, lable: 'ca' },
  { id: 'sym', numeric: false, label: 'SYM' },
  { id: 'price', numeric: true, label: 'Price ($)' },
  { id: 'diff', numeric: true, label: 'Change (%)' },
  { id: 'maxp', numeric: true, label: 'High ($)' },
  { id: 'maxt', numeric: true, label: 'Max Price Time' },
  { id: 'minp', numeric: true, label: 'Low ($)' },
  { id: 'mint', numeric: true, label: 'Min Price Time' },
  { id: 'volume', numeric: true, label: 'Volume (Mill) ' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'right'}
            padding={'default'}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '135%',
  },
  paper: {
    width: '135%',
    marginBottom: theme.spacing(4),
  },
  table: {
    minWidth: 750,
  },
  typography: {
    fontSize: 12,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function TodayEnhancedTable({ data }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('sym');
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

  var d = new moment();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}></Paper>
      <TableContainer>
        <Table className={classes.table} aria-labelledby="tableTitle" size={'large'} aria-label="caption table">
          <caption color="black">Last Updated:{d.format("HH:mm:ss")}</caption>
          <EnhancedTableHead classes={classes} numSelected={selected.length} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={data.length} />
          {(data.length > 0) ? (
            <TableBody>
              {stableSort(data, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow>
                    {row.diff < 0 ? (
                      <TableCell class="bg-danger text-center">
                        <svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg></TableCell>
                    ) : null}
                    {row.diff > 0 ? (
                      <TableCell class="bg-success text-center">
                        <svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                        </svg></TableCell>
                    ) : null}
                    {row.diff == 0 ? (
                      <TableCell class=" text-center">
                        <svg width="30" height="30" viewBox="0 0 16 16" class="bi bi-dash" fill="grey" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                        </svg></TableCell>
                    ) : null}
                    <TableCell align="right">{row.sym}</TableCell>
                    <TableCell align="right">{row.price.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.diff.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.maxp.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.maxt.slice(11, 19)}</TableCell>
                    <TableCell align="right">{row.minp.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.mint.slice(11, 19)}</TableCell>
                    <TableCell align="right">{nFormatter(row.volume, 2)} </TableCell>
                    <TableCell>   </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
              <TableBody>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell><h5>Loading...</h5></TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableBody>
            )}
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
    </div>
  );
}
