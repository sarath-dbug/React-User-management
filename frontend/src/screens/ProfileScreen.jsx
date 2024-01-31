import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
const PROFILE_IMAGE_DIR_PATH = 'http://localhost:5000/UserProfileImages/'

const ProfileScreen = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [profileImageName, setProfileImageName] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateUserProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
    setProfileImageName(userInfo.profileImageName)
  }, [userInfo.name, userInfo.email, userInfo.profileImageName]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[A-Za-z\s'-]+$/;

    if (!nameRegex.test(name)) {
      toast.error('Name is not valid');
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Email Not Valid");
      return;
    }
    if (password !== confPassword) {
      toast.error('Password Do Not Match');
    } else {
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profileImageName', profileImageName);
        const responseFromApiCall = await updateUserProfile(formData).unwrap();
        dispatch(setCredentials({ ...responseFromApiCall }));
        toast.success('Profile Updated Successfully');
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={9}>
        <FormContainer>
          {userInfo.profileImageName && (
            <img
              src={`${PROFILE_IMAGE_DIR_PATH}${userInfo.profileImageName}`}
              alt={userInfo.name}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                margin: "5px auto 10px", // Add margin to center the image
              }}
            />
          )}
          <h1 className="text-center">Update Details</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="profileImage" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setProfileImageName(e.target.files[0])}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
            {isLoading && <Loader />}
          </Form>
        </FormContainer>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
