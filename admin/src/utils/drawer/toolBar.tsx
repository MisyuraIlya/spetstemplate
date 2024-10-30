import {SaveButton, Toolbar, useTranslate} from "react-admin";
import {Button} from "@mui/material";
import React from "react";
import { useCreateDrawer } from "./ DrawerButton";

export default () => {
  const {_close} = useCreateDrawer()
  const translate = useTranslate();
  return (
    <Toolbar sx={{justifyContent: 'space-between'}}>
      <SaveButton />
      <Button onClick={_close}>{translate('ra.action.cancel')}</Button>
    </Toolbar>
  )
}