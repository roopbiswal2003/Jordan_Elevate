import React, { useState } from "react";
import "./Card.css";
import axios from "axios";

const Card = (props) => {
  // const [allposts, setAllposts] = useState([]);

  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const submitComment = async (postId) => {
    setCommentBox(false);
    const request = { postId: postId, commentText: comment };
    const response = await axios.put(
      `http://localhost:5000/comment`,
      request,
      CONFIG_OBJ
    );
    if (response.status === 200) {
      props.getAllPosts(); //refreshing the API request
    }
  };

  // const likeDislikePost = async (postId, type) => {
  //   const request = { postId: postId };
  //   const response = await axios.put(
  //     `http://localhost:5000/${type}`,
  //     request,
  //     CONFIG_OBJ
  //   );
  //   if (response.status === 200) {
  //     props.getAllPosts();
  //   }
  //   // return response;
  // };
  return (

    <div className="product">
      <div className="card">
        <div className="card-body px-2">

          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <img
                className="post-img "
                src={props.postData.image}
                alt="Post Pic"
              />
            </div>
          </div>


          <div className="row">
            <div className="col d-flex">
              <img
                className="profile-pic p-1"
                src="https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg"
                alt="profile-pic"
              />
              <div className="mt-1 ms-2">
                <p className="fs-6 fw-semibold">
                  {props.postData.author.fullName}
                </p>
                <p className="location mb-2">{props.postData.location}</p>
              </div>
              <div className="row mx-5">
                <div className="col-12">
                  <span className="location fs-10 text-muted">2 Hours Ago</span>
                </div>
                <i
                  onClick={() => setCommentBox(true)}
                  className="ps-2 fs-10 fa-regular fa-comment"
                ></i>
              </div>

            </div>
          </div>
          <div className="row">
            {/* <div className="col-6 d-flex">
              <i
                onClick={() => likeDislikePost(props.postData._id, "like")}
                className="ps-2 fs-10 fa-regular fa-thumbs-up"
              ></i>
              <i
                onClick={() => likeDislikePost(props.postData._id, "unlike")}
                className="ps-2 fs-10 fa-regular fa-thumbs-down"
              ></i>
              <i
                onClick={() => setCommentBox(true)}
                className="ps-2 fs-10 fa-regular fa-comment"
              ></i>
              <i className="fa-light fa-thumbs-down"></i>
            </div>
            <div className="col-6">
              <span className="pe-2 fs-10 fw-bold float-end">
                {props.postData.likes.length} likes
              </span>
              <br />
            </div> */}

            <div className="col-12">
              <hr />
              <p className="ps-3 mt-2 fw-semibold">
                {props.postData.description}
              </p>
              <p className="ps-3 mt-2 fw-semibold">
                {props.postData.phone}
              </p>
            </div>
            {commentBox ? (
              <div className="row align-items-center justify-content-center ps-3 pe-3">
                <div className="col-10 ">
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="col-2">
                  <i
                    onClick={() => submitComment(props.postData._id)}
                    className=" btn ps-2 fs-10 fa-regular fa-paper-plane"
                  ></i>
                </div>
              </div>
            ) : (
              ""
            )}

            {props.postData.comments.map((comment) => {
              return (
                <div className="row" key={comment._id}>
                  <div className="col-12 d-flex justify-content-between">
                    <p className="fw-semibold">{comment.commentText}</p>
                    <p
                      className="text-muted fst-italic"
                      style={{ fontSize: "14px" }}
                    >
                      {" "}
                      - {comment.commentedBy.fullName}
                    </p>
                  </div>
                </div>
              );
            })}
            {/* <div className="row">
              <div className="col-12">
                <span className="ps-3 text-muted">2 Hours Ago</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>


  );
};

export default Card;
