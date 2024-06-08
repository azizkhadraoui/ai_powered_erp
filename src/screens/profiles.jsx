import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import NewProfileForm from "./NewProfileForm";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../base"; // Import Firebase app instance

const db = getFirestore(app); // Get Firestore instance from Firebase app

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

function ProfilePage() {
  const classes = useStyles();
  const [openForm, setOpenForm] = useState(false);
  const [profilesData, setProfilesData] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profiles"));
        const profiles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProfilesData(profiles);
      } catch (error) {
        console.error("Error fetching profiles: ", error);
      }
    };

    fetchProfiles();
  }, []);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <div>
      <h1>Profiles</h1>
      <Button className={classes.addButton} variant="contained" color="primary" onClick={handleOpenForm}>Add New Profile</Button>
      <TableContainer component={Paper}>
      <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Position</TableCell>
              <TableCell className={classes.tableHeaderCell}>Past Projects</TableCell>
              <TableCell className={classes.tableHeaderCell}>Years of Expertise</TableCell>
              <TableCell className={classes.tableHeaderCell}>Technical Skills</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profilesData.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell>{profile.name}</TableCell>
                <TableCell>{profile.position}</TableCell>
                <TableCell>{profile.pastProjects}</TableCell>
                <TableCell>{profile.expertiseYears}</TableCell>
                <TableCell>{profile.technicalSkills}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NewProfileForm open={openForm} handleClose={handleCloseForm} />
    </div>
  );
}

export default ProfilePage;
