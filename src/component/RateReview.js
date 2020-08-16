import React, { useState } from "react";
import Modal from "./Modal";

import ReactStars from "react-rating-stars-component";
import { v4 as uuidv4 } from "uuid";
import { Button, TextField } from "@material-ui/core/";

function RateReview({ selectedShoe, sendReview }) {
  const [userName, setUserName] = useState("");
  const [newStar, newSetStar] = useState("");
  const [newComment, setNewComment] = useState("");
  const [open, setOpen] = React.useState(false);

  const ratingChanged = (newRating) => {
    newSetStar(newRating);
  };
  const editReview = () => {
    const newReview = {
      id: uuidv4(),
      name: userName,
      comment: newComment,
      star: newStar,
      time: new Date(),
    };
    if (newReview.name.length === 0 && newReview.comment.length === 0) {
      setOpen(true);
      return;
    }
    sendReview(newReview);
    setNewComment("");
    setUserName("");
  };
  return (
    <>
      <Modal open={open} setOpen={setOpen} setUserName={setUserName} />
      <div style={{ width: "90%", paddingRight: "50px" }}>
        <ReactStars
          count={5}
          value={0}
          onChange={ratingChanged}
          size={70}
          emptyIcon={<i className="far fa-star"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
        <TextField
          id="name"
          label="Name and Surname"
          fullWidth
          variant="outlined"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <TextField
          id="outlined-full-width"
          label="Write a Costumer Review"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
        <Button
          fullWidth
          variant="contained"
          size="medium"
          color="primary"
          onClick={editReview}
        >
          Send Review
        </Button>
      </div>
    </>
  );
}

export default RateReview;
