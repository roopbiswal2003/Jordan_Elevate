import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import prologo from "../images/img1.png";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.userReducer);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({ preview: "", data: "" });
  const [myallposts, setMyAllposts] = useState([]);
  const [postDetail, setPostDetail] = useState({});

  const [caption, setCaption] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  //  ================= frontend state variables =================
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPost, setShowPost] = useState(false);
  const handlePostClose = () => setShowPost(false);
  const handlePostShow = () => setShowPost(true);
  //  ================= frontend state variables =================

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const deletePost = async (postId) => {
    const response = await axios.delete(
      `http://localhost:5000/deletepost/${postId}`,
      CONFIG_OBJ
    );
    if (response.status === 200) {
      getMyPosts();
    }
    setShow(false);
  };
  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setImage(img);
  };

  // Function that will upload our image to the server
  const handleImageUpload = async () => {
    let formData = new FormData();
    formData.append("file", image.data);
    const response = axios.post("http://localhost:5000/uploadFile", formData);
    return response;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMyPosts = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:5000/myallposts`,
      CONFIG_OBJ
    );

    if (response.status === 200) {
      setMyAllposts(response.data.posts);
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occurred while getting all your posts",
      });
    }
  });

  const showDetail = (mypost) => {
    setPostDetail(mypost);
  };

  const addPost = async () => {
    if (image.preview === "") {
      Swal.fire({
        icon: "error",
        title: "Post image is mandatory!",
      });
    } else if (caption === "") {
      Swal.fire({
        icon: "error",
        title: "Post caption is mandatory!",
      });
    } else if (phone === "") {
      Swal.fire({
        icon: "error",
        title: "Post phone is mandatory!",
      });
    } else if (location === "") {
      Swal.fire({
        icon: "error",
        title: "Location is mandatory!",
      });
    } else {
      setLoading(true);
      const imgRes = await handleImageUpload();
      const request = {
        description: caption,
        phone: phone,
        location: location,
        image: `http://localhost:5000/files/${imgRes.data.fileName}`,
      };
      // write api call to create post
      const postResponse = await axios.post(
        `http://localhost:5000/createpost`,
        request,
        CONFIG_OBJ
      );
      setLoading(false);
      if (postResponse.status === 201) {
        navigate("/posts");
      } else {
        Swal.fire({
          icon: "error",
          title: "Some error occurred while creating post",
        });
      }
    }
  };
  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);
  return (
    <div className="container shadow mt-3 p-5">
      <div style={{color: "white"}} className="row">
        <div className="col-md-6 d-flex flex-column">
          <img
            className="profile-image p-1 border"
            src="https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg"
            alt="profile-pic"
          />



          <div className="ms-3 fs-5 fw-bold">{user.user.email}</div>
          <div className="ms-3 fs-5">{user.user.fullName}</div>
          <div className="ms-3 fs-6">
            {/* Products | <Link>@{user.user.fullName}</Link> */}
            All products are in nice condition
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between mb-2">
          <div className="col stats d-flex justify-content-center gap-4">
            <div className="count-section fs-2 fw-bold">
              <img src={prologo} alt="" />
            </div>

            <div style={{height: "10px", marginTop: "5rem"}} className="count-section fs-6 fw-bold">
              <h4>{myallposts.length}</h4>
              <p>Products</p>
            </div>

          </div>
          <div className="buttons mx-auto mt-md-0 d-flex justify-content-center gap-5">
            
            <button type="button" class="btn btn-outline-danger">
            <span className="fw-semibold fs-6">Edit Profile</span>
            </button>
             
            <button type="button" class="btn btn-outline-danger" onClick={handlePostShow}>
            <span className="fw-semibold fs-6">Add Product</span>
            </button>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-12">
          <hr />
        </div>
      </div>

      <div className="row mb-4">
        {myallposts.map((mypost) => {
          return (
            <div className="col-lg-4 col-md-6 col-sm-12 " key={mypost._id}>
              <div onClick={handleShow} className="">
                <img
                  onClick={() => showDetail(mypost)}
                  src={mypost.image}
                  alt={mypost.description}
                  className="mypost-image p-2 rounded"
                />
              </div>
            </div>
          );
        })}
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row ">
            <div className="col-lg-6 mb-2 d-flex justify-content-center">
              <img
                src={postDetail.image}
                className="d-block delete-modal-image"
                alt="Uploaded post"
              />

            </div>
            <div className="col-lg-6 mb-2">
              <div className="card shadow-sm">
                <div className="card-body px-2">
                  <div className="row">
                    <div
                      className="col-12 d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div className="d-flex ">
                        <img
                          className="profile-pic p-1"
                          src= {prologo}                          alt="profile-pic"
                        />
                        <div className="mt-2 ms-2">
                          <p className="fs-6 fw-bold">{user.user.fullName}</p>
                          <p className="location">{postDetail.location}</p>
                        </div>
                      </div>
                      <div>
                        <Link
                          className="btn btn-danger px-2"
                          onClick={() => deletePost(postDetail._id)}
                        >
                          <i className="fa-solid fa-trash me-2 "></i>
                          Delete Post
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 ms-2 mt-2">
                      <p>{postDetail.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal for uploading an image */}
      <Modal
        show={showPost}
        onHide={handlePostClose}
        size="lg"
        centered
        className="uploadModal"
      >
        <Modal.Header closeButton>
          <span className="fw-bold fs-6"></span>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="upload-box">
                <div className="dropzoneContainer">
                  <input
                    name="file"
                    type="file"
                    id="drop_zone"
                    className="FileUpload"
                    accept=".jpg,.png,.gif"
                    onChange={handleFileSelect}
                  />

                  <div className="dropzoneOverlay text-muted">
                    {image.preview && (
                      <img
                        src={image.preview}
                        width="150px"
                        height="150px"
                        alt="uploaded file"
                      />
                    )}
                    <i className="fa-solid fa-cloud-arrow-up fs-2 "></i>
                    <br />
                    <br />
                    <p
                      className="fs-5 fw-semibold"
                      style={{ color: "red" }}
                    >
                      Upload your Product
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12  col-sm-12 d-flex flex-column justify-content-between">
              <div className="row">
                <div className="col-sm-12 mb-3">
                  <div className="form-floating">
                    <textarea
                      type="text"
                      className="form-control uploadInputs"
                      id="floatingInput"
                      placeholder="Add Caption"
                      onChange={(e) => setCaption(e.target.value)}
                    />
                    <label htmlFor="floatingInput">condition</label>
                  </div>
                </div>
                <div className="col-sm-12 mb-3">
                  <div className="form-floating">
                    <textarea
                      type="text"
                      className="form-control uploadInputs"
                      id="floatingInput"
                      placeholder="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Phone</label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control uploadInputs"
                      id="floatingInput"
                      placeholder="Add Location"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <label htmlFor="floatingInput">
                      <i className="fa-solid fa-location-pin pe-2"></i>Add
                      Location
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  {loading ? (
                    <div className="col-md-12 mt-3 text-center">
                      <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <button type="button" class="btn btn-outline-danger custom-btn-pink" onClick={() => {
                      addPost();
                    }}>Add</button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Profile;
