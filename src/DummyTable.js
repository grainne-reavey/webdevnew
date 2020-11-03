import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Create dummy data
function createData( dir, sym, closeprice, openprice, max, maxtime, min, mintime) {
  return { dir, sym, closeprice, openprice, max, maxtime, min, mintime };
}

// Dummy data input
const rows = [
  createData(' ', 'APPL', 41.49, 43.98, 132.97, 17.00, 41.18, 15.23),
  createData(' ', 'AIG', 7.47, 8.94, 22.57, 16.56, 6.91, 15.11),
  createData(' ', 'AMD', 19.79, 15.87, 20.09, 13.45, 7.45, 16.43),
  createData(' ', 'DELL', 29.93, 34.88, 52.80, 15.00, 21.3, 17.00),
  createData(' ', 'DOW', 28.28, 15.66, 81, 16.23, 27.57, 16.33),
  createData(' ', 'GOOG', 192.91, 200, 202, 12.00, 69.83, 15.55),
  createData(' ', 'HPQ', 5.62, 13.5, 11.44, 16.25, 4.76, 14.09),
  createData(' ', 'IBM', 116.99, 120.56, 144.11, 15.22, 70.16, 16.55),
  createData(' ', 'INTC', 32.94, 27.56, 71.2, 17.00, 25.13, 16.32),
  createData(' ', 'MSFT', 20.91, 24.7, 31.96, 15.34, 18.95, 15.33),
];

// Potential dummy data for yesterday and ereyesterday 
const rows2 = [
  createData('APPL', 200, 200, 200, 200, 200, 200),
  createData('AIG', 200, 200, 200, 200, 200, 200),
  createData('AMD', 200, 200, 200, 200, 200, 200),
  createData('DELL', 200, 200, 200, 200, 200, 200),
  createData('DOW', 200, 200, 200, 200, 200, 200),
  createData('GOOG', 1200, 200, 200, 200, 200, 200),
  createData('HPQ', 200, 200, 200, 200, 200, 200),
  createData('IBM', 200, 200, 200, 200, 200, 200),
  createData('INTC', 200, 200, 200, 200, 200, 200),
  createData('MSFT', 200, 200, 200, 200, 200, 200),
];

const rows3 = [
  createData('APPL', 400, 400, 400, 400, 400, 400),
  createData('AIG', 400, 400, 400, 400, 400, 400),
  createData('AMD', 400, 400, 400, 400, 400, 400),
  createData('DELL', 400, 400, 400, 400, 400, 400),
  createData('DOW', 400, 400, 400, 400, 400, 400),
  createData('GOOG', 400, 400, 400, 400, 400, 400),
  createData('HPQ', 400, 400, 400, 400, 400, 400),
  createData('IBM', 400, 400, 400, 400, 400, 400),
  createData('INTC', 400, 400, 400, 400, 400, 400),
  createData('MSFT', 400, 400, 400, 400, 400, 400),
];

// Lots of ordering functions
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

// Setting column (headCells) constants and ids
const headCells = [
  { id: 'dir', numeric: false, label: ' ' },
  { id: 'sym', numeric: false, label: 'SYM' },
  { id: 'closeprice', numeric: true, label: 'Close Price' },
  { id: 'openprice', numeric: true, label: 'Open Price' },
  { id: 'max', numeric: true, label: 'Max' },
  { id: 'maxtime', numeric: true, label: 'Max Time' },
  { id: 'min', numeric: true, label: 'Min' },
  { id: 'mintime', numeric: true, label: 'Min Time' },
];

// Setting ordering buttons within headCell headings
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

// Implement this
EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

// Formatting table header
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

// Collecting dates for dropdown menu
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();
var yesterday  = new Date(today);
yesterday.setDate(yesterday.getDate() - 1)
var ereyesterday  = new Date(yesterday);
ereyesterday.setDate(ereyesterday.getDate() - 1)

// Implementing the header including dropdown 
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Instument Data
      </Typography>
        
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-toggle-second="tooltip" data-placement="right" title="Tooltip on right">
          Choose Date
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Today </a>
          <a class="dropdown-item" href="#">{ yesterday.toLocaleDateString(options) } </a>
          <a class="dropdown-item" href="#">{ ereyesterday.toLocaleDateString(options) }</a>
        </div>
      </div>
    </Toolbar>
  );
};

// Formatting table dimentions 
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

// Exporting everything
export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('sym');
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  // Sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Rows per page feature
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table 
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                
                  return (
                    <TableRow>
                      <TableCell class="bg-success text-center"> <svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                        </svg></TableCell>
                      <TableCell align="right">{row.sym}</TableCell>
                      <TableCell align="right">{row.closeprice}</TableCell>
                      <TableCell align="right">{row.openprice}</TableCell>
                      <TableCell align="right">{row.max}</TableCell>
                      <TableCell align="right">{row.maxtime}</TableCell>
                      <TableCell align="right">{row.min}</TableCell>
                      <TableCell align="right">{row.mintime}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}