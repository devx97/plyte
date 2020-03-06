import React, {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {requestUpdateRooms} from '../actions'
import {
  Container, useTheme,
} from '@material-ui/core'
import MaterialTable, {MTableCell, MTableHeader} from 'material-table'
import {forwardRef} from 'react';
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

import _ from 'lodash'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

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

  const columns = [
    {
      title: "ID", field: "name",
      icon: {},
      width: 50,
      render: rowData =>
          <Typography variant="subtitle1" style={{overflow: 'hidden'}}>
            {rowData.name}
          </Typography>
    },
    {
      title: "Current Video", field: "currentVideo",
      render: rowData =>
          <Typography variant="subtitle1" style={{overflow: 'hidden'}}>
            {rowData.currentVideo}
          </Typography>
    },
    {
      title: "Pass", field: "password", type: 'numeric',
      width: 50,
      render: rowData => rowData.password ? <Lock/> : <LockOpen/>
    },
    {
      title: "Users", field: "users",
      size: 'small',
      width: 50,
      type: 'numeric',
      render: rowData => <Fragment>{rowData.users} / {rowData.maxUsers}</Fragment>
    },
  ]

  useEffect(() => {
    dispatch(requestUpdateRooms())
  }, [])

  return (
      <Container maxWidth={'md'} style={{padding: 0}}>
        <MaterialTable
            title="Rooms"
            columns={columns}
            data={rooms}
            icons={tableIcons}
            fixedHeader={false}
            options={{
              emptyRowsWhenPaging: false,
              cellStyle: {
                padding: theme.spacing(0.5)
              },
              headerStyle: {
                padding: theme.spacing(0.5),
              },
              searchFieldStyle: {maxWidth: 200}
            }}
        />
      </Container>
  )
}
