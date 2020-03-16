import React, {Fragment, useEffect, forwardRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {requestUpdateRooms, updateCurrentRoom} from '../actions'
import {Container, useTheme} from '@material-ui/core'
import MaterialTable from 'material-table'
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Lock,
  LockOpen,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from '@material-ui/icons'
import {useNavigate} from 'react-router-dom'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
}

export default () => {
  const rooms = useSelector(state => state.client.rooms) || []
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const columns = [
    {
      title: "ID", field: "id", width: 1, type: 'numeric',
    }, {
      title: "Current Video", field: "currentVideo"
    }, {
      title: "Pass", field: "password", type: 'numeric', width: 1,
      render: rowData => rowData.password ? <Lock/> : <LockOpen/>
    }, {
      title: "Users", field: "users", width: 1, type: 'numeric',
      render: rowData => <Fragment>{rowData.users} / {rowData.maxUsers}</Fragment>
    },
  ]

  useEffect(() => {
    dispatch(requestUpdateRooms())
  }, [dispatch])

  return (
      <Container maxWidth={'md'} style={{padding: 0}}>
        <MaterialTable
            title="Rooms"
            columns={columns}
            data={rooms}
            icons={tableIcons}
            onRowClick={(event, rowData) => {
              if (rowData.password) {
                console.log('PASS')
              } else {
                dispatch(updateCurrentRoom(rowData.id))
                navigate(`/room/${rowData.id}`)
              }
            }}
            options={{
              emptyRowsWhenPaging: false,
              cellStyle: {padding: theme.spacing(0.5)},
              headerStyle: {padding: theme.spacing(0.5)},
              searchFieldStyle: {maxWidth: 200}
            }}
        />
      </Container>
  )
}
