import '../styles/AddStory.css';
import { useState, react, useEffect } from 'react';
import adminloginimg from '../images/Anxiety.gif';
import { Button, Row, Col, Image } from 'react-bootstrap';
import { TextField, MenuItem, Card, Typography, Box } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useUserAuth } from '../../context/UserAuthContext';
import { addUserPostDetails } from "../../api/UserAPI";
import { storage } from '../../service/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from 'react-router-dom';

let IMG_URL;
const AddStory = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [place, setPlace] = useState('');
  const [disasterType, setDisasterType] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [amountNeeded, setAmountNeeded] = useState('');
  const [upiId, setUpiId] = useState('');
  const [date, setDate] = useState('');
  const [blog, setBlog] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const {user} = useUserAuth();
  const navigate = useNavigate();

  const uploadImage = async () => {
    console.log(imageUpload);
    if (imageUpload == null) return;
    const metadata = {
      contentType: "image/jpeg",
    };
    console.log("HEREEEEE");
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    await uploadBytes(imageRef, imageUpload, metadata)
      .then(() => {
        // alert("Image Uploaded");
        console.log("HERE 2");
      })
      .then(async () => {
        await getDownloadURL(imageRef).then((downloadURL) => {
          // console.log("File available at  ", downloadURL);
          // setUser({ ...user, photo:downloadURL });
          IMG_URL = downloadURL;
          // setUser({ ...user, photo: downloadURL });
        });
      });

    // await getPhoto(imageRef);
  };

  const handlePhoto = (e) => {
    setImageUpload(e.target.files[0]);
  };

  const { token } = useUserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await uploadImage();
    console.log("NBVC");
    const data = {
      email:user.email,
      name: name,
      age: age,
      place: place,
      disasterType: "Earthquake",
      aadharNo: aadharNo,
      phoneNo: phoneNo,
      amountNeeded: amountNeeded,
      upiId: upiId,
      date: date,
      blog: blog,
      photo: IMG_URL,
      statusCode:0,
    };
    const packet = {
      token: token,
      data: data,
    };
    console.log("INSIDE ADD STORY", packet);
    await addUserPostDetails(packet);
    navigate('/home');
  };

  const disasters = [
    {
      label: 'Earthquakes',
      value: 'Earthquakes'
    },
    {
      label: 'Volcanoes',
      value: 'Volcanoes'
    },
    {
      label: 'Hurricanes',
      value: 'Hurricanes'
    },
    {
      label: 'Typhoons',
      value: 'Typhoons'
    },
    {
      label: 'Tsunamis',
      value: 'Tsunamis'
    },
    {
      label: 'Floods',
      value: 'Floods'
    },
    {
      label: 'Cloud Bursts',
      value: 'Cloud Bursts'
    },
    {
      label: 'Landslides',
      value: 'Landslides'
    },
    {
      label: ' Avalanches',
      value: ' Avalanches'
    },
    {
      label: 'Wildfires',
      value: 'Wildfires'
    },

  ];




  return (
    <>
      <div className="maincontainer" style={{ boxSizing: "border-box" }}>
        <div class="container-fluid">
          <div class="row no-gutter">
            <div class="col-md-6 d-none d-md-flex bg-image">
              <img
                src={adminloginimg}
                alt=""
                style={{
                  border: "none",
                  width: "80%",
                  marginTop: "110px",
                  marginLeft: "60px",
                  height:"80%"
                }}
              />
            </div>
            <div
              class="col-md-6 "
              style={{ overflow: "auto", maxHeight: "890px",marginBottom:"20px"}}
            >
              <div class="login d-flex align-items-center py-9">
                <div class="container mt-5">
                  <div class="row">
                    <div class="col-lg-10 col-xl-7 mx-auto mt-5">
                      <h3
                        class="text-center display-4"
                        style={{ color: "#0095b6", fontWeight: "600" }}
                      >
                        Fill Details
                      </h3>

                      <form onSubmit={handleSubmit}>
                        <TextField
                          style={{ color: "#cf92c4" }}
                          fullWidth
                          margin="normal"
                          required
                          color="primary"
                          name="Full Name"
                          label="Full Name"
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="age"
                          label="Age"
                          type="text"
                          id="age"
                          value={age}
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="curAdd"
                          label="Place of Disaster/Misfortune"
                          type="text"
                          id="curAdd"
                          helperText=" "
                          value={place}
                          onChange={(e) => {
                            setPlace(e.target.value);
                          }}
                        />

                        <Row>
                          <Col>
                          <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="disasterType"
                          label="Disaster type"
                          type="text"
                          id="disasterType"
                          value={disasterType}
                          onChange={(e) => {
                            setDisasterType(e.target.value);
                          }}
                        />
                          </Col>
                          <Col>
                            <TextField
                              style={{ marginTop: 10 }}
                              name="date"
                              format="MM/dd/yyyy"
                              label="Date of Disaster"
                              type="date"
                              variant="outlined"
                              value={date}
                              onChange={(e) => {
                                setDate(e.target.value);
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Col>
                        </Row>

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="aadhar"
                          label="AADHAR Card Number"
                          type="text"
                          id="aadhar"
                          value={aadharNo}
                          onChange={(e) => {
                            setAadharNo(e.target.value);
                          }}
                        />

                        <TextField
                          margin="normal"
                          fullWidth
                          name="phone"
                          label="Phone Number"
                          // type="tel"
                          id="phoneNo"
                          value={phoneNo}
                          onChange={(e) => {
                            setPhoneNo(e.target.value);
                          }}
                          // inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="upi"
                          label="UPI/Blockchain ID Number"
                          type="text"
                          id="upi"
                          value={upiId}
                          onChange={(e) => {
                            setUpiId(e.target.value);
                          }}
                        />
                        {/* <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="upi"
                          label="Blockchain ID Number"
                          type="text".
                          id="upi"
                          value={upiId}
                          onChange={(e) => {
                            setUpiId(e.target.value);
                          }}
                        /> */}
                        {/* <TextField
                          margin="normal"
                          required
                          fullWidth
                          prefix="₹"
                          name="amount"
                          label="Amount Needed to resettle"
                          type="text"
                          id="amount"
                          value={amountNeeded}
                          onChange={(e) => {
                            setAmountNeeded(e.target.value);
                          }}
                        /> */}
                          

                        

                        <div>Your Image</div>
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          name="photo"
                          onChange={handlePhoto}
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          multiline
                          name="BLOG"
                          label="Tell the world your survival story"
                          type="text"
                          id="blog"
                          rows={5}
                          maxRows={50}
                          value={blog}
                          onChange={(e) => {
                            setBlog(e.target.value);
                          }}
                        />

                        {/* <div class="form-group mb-3 mt-3">
                                            <input id="aadharNo" type="text" placeholder="AADHAR Card Number" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div> */}

                        {/* <div class="form-group mb-3 mt-3">
                                            <input id="phoneNo" type="text" placeholder="Phone Number" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div>
                                        <div class="form-group mb-3 mt-3">
                                            <input id="upiId" type="text" placeholder="UPI ID Number" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div> */}
                        {/* <div class="form-group mb-3 mt-3">
                                            <input id="amountNeeded" type="text" placeholder="Amount Needed to Re-settle" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div>
                                        
                                        <div class="form-group mb-3 mt-3">
                                            <input id="upiId" type="text" placeholder="UPI ID Number" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div> */}

                        <div class="text-center">
                          <button
                            type="submit"
                            class="btn  btn-block text-uppercase mb-2  shadow-sm"
                            style={{ background: "#0095b6", color: "white" }}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default AddStory;