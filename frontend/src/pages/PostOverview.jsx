import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Card from "../Components/Card";
import cimg1 from "../images/cimg1.jpg";
import cimg2 from "../images/img1.png";

const PostOverview = () => {
  const [allposts, setAllposts] = useState([]);

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const getAllPosts = async () => {
    const response = await axios.get(`http://localhost:5000/allposts`);

    if (response.status === 200) {
      setAllposts(response.data.posts);
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occurred while getting all posts",
      });
    }
  };

  const deletePost = async (postId) => {
    const response = await axios.delete(
      `http://localhost:5000/deletepost/${postId}`,
      CONFIG_OBJ
    );
    if (response.status === 200) {
      getAllPosts();
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <>

      <div className="container">
      <div id="carouselExampleIndicators" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={cimg1} style={{height: "400px"}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={cimg2} style={{height: "400px"}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={cimg2} style={{height: "400px"}} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      </div>
      <div className="container mt-md-5 mt-3">
        <div className="row">
          {allposts.map((post) => {
            return (
              <div className="col-md-6 col-lg-4 mb-2" key={post._id}>
                <Card
                  postData={post}
                  deletePost={deletePost}
                  getAllPosts={getAllPosts}
                />
              </div>
            );
          })}
        </div>
      </div>

    </>
  );
};

export default PostOverview;
