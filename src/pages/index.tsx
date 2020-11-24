import React, { useEffect, useState } from "react";
import { Form, Formik, Field } from "formik";
import { TextField, Modal, AppBar, Toolbar, Typography } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,            
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center', 
        fontSize: "30px",        
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export default function Home() {
  const classes = useStyles();
  
  return (
   <div className='main'>
    <AppBar position="static" color='secondary'>
     <Toolbar> 
      <Typography variant="h6" className={classes.title}>
        Serverless C.R.U.D App
      </Typography>          
     </Toolbar>
    </AppBar>
   </div>    
  )  
}
