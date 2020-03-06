import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {requestUpdateRooms} from '../actions'
import {
  Container,
  Table,
  TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import FilterListIcon from '@material-ui/icons/FilterList'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import ButtonBase from '@material-ui/core/ButtonBase'

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
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export default () => {
  const rooms = useSelector(state => state.client.rooms) || []
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch()

  const headCells = [
    {id: 'name', numeric: false, label: 'Room Name'},
    {id: 'currentVideo', numeric: false, label: 'Current Video'},
    {id: 'password', numeric: true, label: 'Pass'},
    {id: 'users', numeric: true, label: 'Users'},
  ]

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  useEffect(() => {
    dispatch(requestUpdateRooms())
  })

  return (
      <Container maxWidth={'sm'} style={{padding: 0}}>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Rooms
          </Typography>
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon/>
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={event => handleRequestSort(event, headCell.id)}
                      >
                        {headCell.label}
                        {orderBy === headCell.id && (
                            <span
                                style={{
                                  border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1,
                                  overflow: 'hidden', padding: 0, position: 'absolute', top: 20,
                                  width: 1,
                                }}>
                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        )}
                      </TableSortLabel>
                    </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(rooms, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(room => <TableRow
                      hover
                      onClick={() => console.log('XDD')}
                      key={room.name}
                  >
                    <TableCell>{room.name}</TableCell>
                    <TableCell>{room.currentVideo}</TableCell>
                    <TableCell align="right">{(!!room.password).toString()}</TableCell>
                    <TableCell align="right">{room.users.length} / {room.maxUsers}</TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
  )
}
