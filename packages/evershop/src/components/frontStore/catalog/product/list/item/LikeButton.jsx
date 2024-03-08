import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";

function LikeButton() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0px", // Adjust the bottom position as needed
        right: "-17px", // Adjust the right position as needed
        zIndex: 1 // To make sure it appears above other elements
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorderIcon 
               style={{
                  color: "black",
                  fontSize: "28px",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderRadius: "10%", // Set to 50% for a circular background
                  padding: "6px" // Adjust padding to increase background size
                }} />}
            checkedIcon={<FavoriteIcon 
               style={{
               color: 'var(--primary)',
               fontSize: "28px",
               backgroundColor: "rgba(255, 255, 255, 1)",
               borderRadius: "10%", // Set to 50% for a circular background
               padding: "6px" // Adjust padding to increase background size
             }} />}
            sx={{
               "&.Mui-checked": {
                 color: 'var(--primary)' // Customize the background color when checked
               }
             }}
          />
        }  
      />
    </div>
  );
}

export default LikeButton;
