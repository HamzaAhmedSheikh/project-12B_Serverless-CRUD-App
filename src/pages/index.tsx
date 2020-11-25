import React, { useEffect, useState } from "react";
import { Form, Formik, Field } from "formik";
import { TextField, Modal, AppBar, Toolbar, Typography } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./index.css";

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
  const [updatingData, setUpdatingData] = useState(undefined);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [loading, setLoading] = useState(false);

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

  // step-4 delete the messages

  const deleteMessage = async (message) => {
    setLoading(true);
    await fetch("/.netlify/functions/delete", {
      method: "post",
      body: JSON.stringify({ id: message.ref["@ref"].id }),      
    });
    setFetchData(true);
  }

  // step-3 update the retrieve message

   const updateMessage = (id: string) => {
     let updateData = data.find((mes) => mes.ref["@ref"].id === id);
     setUpdatingData(updateData);
   }

  // step-2 read retrieve message

   useEffect(() => {
    (async () => {
      await fetch("/.netlify/functions/read")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    })();
   }, [fetchData])

  // step-1 create message
  //  body of create modal
  const bodyCreate = (
    <div style={modalStyle} className={classes.paper}>
      <Formik onSubmit={(value, actions) => {
        fetch("/.netlify/functions/create", {
          method: "post",
          body: JSON.stringify(value),
        });
        setFetchData(true);
          actions.resetForm({
            values: {
              message: "",
            },
          });
          setFetchData(false);
          handleCloseCreate();
        }}
        initialValues={{
          message: "",
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Field
              as={TextField}
              variant="outlined"
              rowsMax={4}
              multiline
              type="text"
              name="message"
              label="Message"
              id="message"
              required
            />

            <div className="btn-form">
              <button type="submit">add</button>
              <button type="button" onClick={handleCloseCreate}>
                close
              </button>
            </div>
            
                   
          </Form>
        )}
      </Formik>             
    </div>    
  );

  // body of update modal

  const bodyUpdate = (
    <div style={modalStyle} className={classes.paper}>
      <Formik
        onSubmit={(value, actions) => {
          fetch("/.netlify/functions/update", {
            method: "put",
            body: JSON.stringify({
              message: value.message,
              id: updatingData.ref["@ref"].id,
            }),
          });
          setFetchData(true);
          actions.resetForm({
            values: {
              message: "",
            },
          });
          setFetchData(false);
          handleCloseUpdated();
        }}
        initialValues={{
          message: updatingData !== undefined ? updatingData.data.message : "",
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className="form">
            <Field
              as={TextField}
              multiline
              rowMax={4}
              type="text"
              name="message"
              id="message"
              className="field"
            />

            <div className="btn-form">
              <button type="submit"> update </button>
              <button type="button" onClick={handleCloseUpdated}>
                close
              </button>
            </div>
          </Form>
        )}
      </Formik>      
    </div>
  )

  return (
   <div className='main'>
    <AppBar position="static" color='secondary'>
     <Toolbar> 
      <Typography variant="h6" className={classes.title}>
        Serverless C.R.U.D App
      </Typography>          
     </Toolbar>
    </AppBar>
      
      <div className="head">
        <h3> CRUD </h3> 
        <p className="heading"> Create Read Update Delete </p>
      </div>

      <div className="create-btn">
        <button onClick={handleOpenCreate}>Create Message</button>
      </div>
       
      <div>
        <Modal
          open={openCreate}
          onClose={handleCloseCreate}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          { bodyCreate }
        </Modal>
      </div>

      <div>
        <Modal
          open={openUpdate}
          onClose={handleCloseUpdated}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        > 
          { bodyUpdate }      
        </Modal>     
      </div>

      {data === null || data === undefined ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : data.length >= 1 ? (
        <div className="data-display">
          <div className="data-div">
            {data.map((mes, i) => (
              <div key={i}>
                <p> {mes.data.message} </p>
                <button
                  onClick={() => {
                    handleOpenUpdated();
                    updateMessage(mes.ref["@ref"].id);
                  }}
                > update </button>

                <button
                  onClick={() => {
                    deleteMessage(mes);
                  }}
                > delete </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-task">
          <h4>No Task for today</h4>
        </div>
      )}      
   </div>    
  )  
}
