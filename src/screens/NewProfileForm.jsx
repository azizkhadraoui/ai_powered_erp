import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../base"; // Import Firebase app instance

const db = getFirestore(app);
console.log(db); // Get Firestore instance from Firebase app

const useStyles = makeStyles((theme) => ({
  // Your styles here
}));

function NewProfileForm({ open, handleClose }) {
  const classes = useStyles();
  const [profileData, setProfileData] = useState({
    name: "",
    position: "",
    pastProjects: "",
    expertiseYears: "",
    technicalSkills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const profilesCollectionRef = collection(db, "profiles");
      await addDoc(profilesCollectionRef, profileData);
      handleClose();
    } catch (error) {
      console.error("Error adding profile: ", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Profile</DialogTitle>
      <DialogContent>
        <form>
          <TextField label="Name" name="name" value={profileData.name} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }}/>
          <TextField label="Position" name="position" value={profileData.position} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }}/>
          <TextField label="Past Projects" name="pastProjects" value={profileData.pastProjects} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }}/>
          <TextField label="Years of Expertise" name="expertiseYears" value={profileData.expertiseYears} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }}/>
          <TextField label="Technical Skills" name="technicalSkills" value={profileData.technicalSkills} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }}/>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewProfileForm;
