import React, { useEffect, useState , history} from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { 
  Button, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Typography,
  Box
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from 'axios';
import app from "../base";

const db = getFirestore(app);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  addButton: {
    margin: theme.spacing(2),
  },
}));

function Projects() {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const projectsCollectionRef = collection(db, "projects");
      await addDoc(projectsCollectionRef, newProject);
      setNewProject({ name: "", description: "" });
      history.push("/epics");
      fetchProjects();
      
  
      const response = await axios.post(
        'https://redbird-clever-annually.ngrok-free.app/myapp/process/',
        { text: newProject.name }, // Sending data as JSON object
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Response from endpoint:', response.data);
  
      handleClose();
      
    } catch (error) {
        history.push("/epics");
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No Response:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Request Error:", error.message);
      }
      // Display error message or handle the error as needed
      // Example: set an error state to display a message to the user
      // setError("Failed to submit project. Please try again later.");
    }
  };
  
  
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box className={classes.header}>
        <Typography variant="h4">Projects</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add New Project
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Project Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Project Description</TableCell>
              <TableCell className={classes.tableHeaderCell}>Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.progress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <TextField
            label="Project Name"
            name="name"
            value={newProject.name}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Project Description"
            name="description"
            value={newProject.description}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Projects;
