import React , { useMemo, useState, useEffect } from 'react'
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
import './datatable/index.css';
import axios from 'axios'

/**
 * Make Axios based request.
 * @param method - defaults to 'get'
 * @param [data] - optional
 * @param url
 * @param additionalHeaders
 * @param rest - optional. Additional properties to pass into request config
 * @returns {Promise<any>}
 */
const makeRequest = ({
  data,
  method = 'get',
  url,
  headers = {},
  auth,
  ...rest
}) => {
  const config = {
    ...(data ? { data } : {}), // Do not add 'data' if undefined.
    method,
    url,
    headers,
    auth,
    ...rest,
  };
  return new Promise((resolve, reject) => {
    axios.request(config)
      .then(response => resolve(response))
      .catch(error => console.log(error));
  });
};


// Ording functions
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

// Setting column (headCells) constants
const headCells = [
  { id: 'sym', numeric: false, label: 'SYM' },
  { id: 'price', numeric: true, label: 'Price' },
  { id: 'diff', numeric: true, label: 'Difference' }
];

// Making function to set ordering buttons with in headCells 
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

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();
var yesterday  = new Date(today);
yesterday.setDate(yesterday.getDate() - 1)
var ereyesterday  = new Date(yesterday);
ereyesterday.setDate(ereyesterday.getDate() - 1)

// Implementing the header
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Instrument Data
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

// Exporting everthing
export default function EnhancedTable() {
  const [tableData, setTableData] = useState([]);
  //The q state allows us to filter with the search bar, I've given it a default value of an empty string
  const [q, setQ] = useState("");
 //Use effect allows us to map the results from our qRest query into our data state. The options constant parameter is defined at the top containing
 //all our qRest information. The p => p means that each member of our array is mapped to the state.
 const processRequest = async setTableData => {
  const { data } = await makeRequest({
    url: 'https://81.150.99.19:8037/executeQuery',
    method: 'POST',
    headers: {
      "Accept": "*/*",
      "Authorization": "BASIC dXNlcjpwYXNz"
    },
    auth: {
      username: 'user',
      password: 'pass'
    },
    data: {
      //Specify your query here
      "query": "select price:last price, diff:last(deltas(price)) by sym from trade where time.date =.z.d",
      "type": "sync",
      "response": true
    }
  });
  setTableData(data.result);
  console.log(data);
} 


  useEffect(() => {
    const timer = setInterval(() => {
      processRequest(setTableData)
    .catch(error => alert('Disconnected from API'))
    ;
  },1000);


  return () => clearInterval(timer);
  });

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

  // Constants for rows per page feature
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
              rowCount={tableData.length}
            />
            <TableBody>
              {stableSort(tableData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                
                  return (
                    <TableRow>
                      {/*<TableCell class="bg-success text-center"> <svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                  </svg></TableCell>*/}
                      <TableCell align="right">{row.sym}</TableCell>
                      <TableCell align="right">${row.price.toFixed(2)}</TableCell>
                      {/*change class to allow for text color change*/}
                      {row.diff < 0 ? ( 
                <TableCell  class = 'success' >{row.diff.toFixed(2)}%</TableCell>
                ) : (
                <TableCell class='fail'>{row.diff.toFixed(2)}%</TableCell>
                )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}