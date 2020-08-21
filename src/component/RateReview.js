import React, { useState } from "react";
import Modal from "./Modal";
import ReactStars from "react-rating-stars-component";
import { v4 as uuidv4 } from "uuid";
import { Button, TextField } from "@material-ui/core/";
import { RateStars } from "../styled";

function RateReview({ sendReview, id, setOpenReview }) {
  const [userName, setUserName] = useState({ firstName: "", lastName: "" });
  const [newStar, newSetStar] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const ratingChanged = (newRating) => {
    newSetStar(newRating);
  };
  const createReview = () => {
    const newReview = {
      reviewId: uuidv4(),
      productId: +id,
      name: `${userName.firstName} ${userName.lastName}`,
      comment: newComment,
      star: newStar,
      time: new Date(),
    };
    if (
      userName.firstName.length < 1 ||
      userName.lastName.length < 1 ||
      newReview.comment.length === 0
    ) {
      setMessage(
        "To rate to this product, please be sure provide your first name, last name and review."
      );
      setOpen(true);
      return;
    } else if (newReview.star === 0) {
      setMessage("Oops, You should rate at least half star .");
      setOpen(true);
      return;
    }
    sendReview(newReview);
    setOpenReview(false);
    setNewComment("");
    setUserName({ firstName: "", lastName: "" });
    newSetStar(0);
  };
  return (
    <>
      <Modal open={open} setOpen={setOpen} message={message} />
      <div>
        <RateStars>
          <ReactStars
            count={5}
            value={newStar}
            isHalf={true}
            onChange={ratingChanged}
            size={70}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </RateStars>
        <TextField
          id="firstName"
          label="First name"
          size="small"
          margin="dense"
          required
          fullWidth
          variant="outlined"
          value={userName.firstName}
          onChange={(e) => {
            setUserName({ ...userName, firstName: e.target.value });
          }}
        />
        <TextField
          id="lastName"
          label="Last name"
          required
          size="small"
          margin="dense"
          fullWidth
          variant="outlined"
          value={userName.lastName}
          onChange={(e) => {
            setUserName({ ...userName, lastName: e.target.value });
          }}
        />
        <TextField
          id="outlined-full-width"
          label="Write a Costumer Review"
          fullWidth
          required
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
          onClick={createReview}
        >
          Send Review
        </Button>
      </div>
    </>
  );
}

export default RateReview;
