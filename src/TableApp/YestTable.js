// import React from 'react'
// import PropTypes from 'prop-types';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper } from '@material-ui/core';
// import { lighten, makeStyles } from '@material-ui/core/styles';

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
//   { id: 'sym', numeric: false, label: 'SYM' },
//   { id: 'yoprice', numeric: true, label: 'Open Price' },
//   { id: 'ycprice', numeric: true, label: 'Close Price' },
//   { id: 'ymaxp', numeric: true, label: 'Max Price' },
//   { id: 'yminp', numeric: true, label: 'Min Price' },
//   { id: 'ydayc', numeric: false, label: 'Daily Change' },
// ];

// const headCellSort = [
//   { id: 'sym', numeric: false, label: 'SYM' },
//   { id: 'yoprice', numeric: true, label: 'Open Price' },
//   { id: 'ycprice', numeric: true, label: 'Close Price' },
//   { id: 'ymaxp', numeric: true, label: 'Max Price' },
//   { id: 'yminp', numeric: true, label: 'Min Price' },
// ]

// const headCellOne = [
//   { id: 'ydayc', numeric: false, label: 'Daily Change in Open and Close' },
// ]

// function EnhancedTableHead(props) {
//   const { classes, order, orderBy, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };


//   return (
//     <TableHead>
//       <TableRow>
//         {headCellSort.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={'right'}
//             padding={'default'}
//           // className={'DailyChange'}
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

//         {headCellOne.map(headCells => <TableCell className="DailyChange" align="right">{headCells.label}</TableCell>)}
//         <TableCell className="ExtraColumn"></TableCell>
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

// export default function YestEnhancedTable({ data }) {
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

//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper} variant="outlined"></Paper>
//       <TableContainer>
//         <Table className={classes.table} aria-labelledby="tableTitle" size={'medium'} aria-label="enhanced table">
//           <EnhancedTableHead classes={classes} numSelected={selected.length} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={data.length} />
//           {(data.length > 0) ? (
//             <TableBody>{stableSort(data, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
//               return (
//                 <TableRow>
//                   <TableCell align="right">{row.sym}</TableCell>
//                   <TableCell align="right">${row.yoprice.toFixed(2)}</TableCell>
//                   <TableCell align="right">${row.ycprice.toFixed(2)}</TableCell>
//                   <TableCell align="right">${row.ymaxp.toFixed(2)}</TableCell>
//                   <TableCell align="right">${row.yminp.toFixed(2)}</TableCell>
//                   <TableCell className="Arrows" align="right">
//                     {(row.yoprice - row.ycprice) < 0 ? (

//                       <svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="red" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
//                       </svg>
//                     ) : (

//                         <svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="green" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
//                         </svg>
//                       )}
//                   </TableCell>
//                   <TableCell />
//                 </TableRow>
//               );
//             })}</TableBody>
//           ) : (
//               <TableBody>
//                 <TableCell></TableCell>
//                 <TableCell></TableCell>
//                 <TableCell></TableCell>
//                 <TableCell><h5>Loading...</h5></TableCell>
//                 <TableCell> </TableCell>
//                 <TableCell> </TableCell>
//                 <TableCell></TableCell>
//               </TableBody>
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
import { TextField } from '@material-ui/core';

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

const headCellSort = [
  { id: 'sym', numeric: false, label: 'SYM' },
  { id: 'yoprice', numeric: true, label: 'Open ($)' },
  { id: 'ycprice', numeric: true, label: 'Close ($)' },
  { id: 'ymaxp', numeric: true, label: 'High ($)' },
  { id: 'yminp', numeric: true, label: 'Low ($)' },
];

const headCellOne = [
  { id: 'ydayc', numeric: true, label: 'Daily Change' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="table2">
      <TableRow>
        {headCellSort.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'right'}
            padding={'default'}
            className={"table2"}
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

        {headCellOne.map(headCells => <TableCell className="DailyChange" align="right">{headCells.label}</TableCell>)}
        <TableCell className="ExtraColumn"></TableCell>
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
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
  table: {
    minWidth: 750,
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

export default function YestEnhancedTable({ data }) {
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

  const [q, setQ] = React.useState("");

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function search(rows) {
    return rows.filter((row) => row.sym.toLowerCase().indexOf(q.toLowerCase())>-1)
}

  const filteredData = search(data)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}></Paper>
      <TextField id="filled-basic" variant="filled" label="Search Sym" value={q} onChange={(e) => setQ(e.target.value)}/>
      <TableContainer>
        <Table className={classes.table} aria-labelledby="tableTitle" size={'medium'} aria-label="enhanced table">
          <EnhancedTableHead classes={classes} numSelected={selected.length} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={data.length} />
          {(data.length > 0) ? (
            <TableBody>{stableSort(filteredData, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow>
                  <TableCell align="right">{row.sym}</TableCell>
                  <TableCell align="right">{row.yoprice.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.ycprice.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.ymaxp.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.yminp.toFixed(2)}</TableCell>
                  {(row.yoprice - row.ycprice) > 0 ? (
                    <TableCell align="right">
                      <svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="red" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                      </svg></TableCell>
                  ) : null}
                  {(row.yoprice - row.ycprice) < 0 ? (
                    <TableCell align="right">
                      <svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="green" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                      </svg></TableCell>
                  ) : null}
                  {(row.yoprice - row.ycprice) == 0 ? (
                    <TableCell align="right">
                      <svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-dash" fill="grey" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                      </svg></TableCell>
                  ) : null}
                  <TableCell></TableCell>
                </TableRow>
              );
            })}</TableBody>
          ) : (
              <TableBody>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell><h5>Loading...</h5></TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell></TableCell>
              </TableBody>
            )}
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
    </div>
  );
}