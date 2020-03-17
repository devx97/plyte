import {ToggleButton} from '@material-ui/lab'
import {updateMaster} from '../../actions'
import {Typography} from '@material-ui/core'
import {CheckBox, CheckBoxOutlineBlank} from '@material-ui/icons'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

export default () => {
  const master = useSelector(state => state.client.master)
  const dispatch = useDispatch()

  return (
      <ToggleButton
          value="check"
          selected={master}
          size={'small'}
          onChange={() => dispatch(updateMaster())}
      >
        <Typography variant="subtitle2">
          Host
        </Typography>
        {master
            ? <CheckBox fontSize="small" color="primary"/>
            : <CheckBoxOutlineBlank fontSize="small"/>}
      </ToggleButton>
  )
}