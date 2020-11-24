import React, { useEffect, useState } from "react";
import { Form, Formik, Field } from "formik";
import { TextField, Modal, AppBar, Toolbar, Typography } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

 function randomId() {
  return Math.round(Math.random() * 20) - 10;
 }

 function getModalStyle() {
  const top = 50 + randomId();
  const left = 50 + randomId();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


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
  const [data, setData] = useState<null | Data[]>();
  const [fetchData, setFetchData] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  interface Data {
    ref: object;
    ts: number;
    data: {
      message: string;
    };
  }

  // create modal functions

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  // updated modal functions
  
  const handleOpenUpdated = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdated = () => {
    setOpenUpdate(false);
  };

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
