import { useState } from "react";
import { Card, Form, Input, Button, Avatar, message } from "antd";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contact: Yup.string().required("Contact is required"),
});

const ParticipantProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "123-456-7890",
    image: "https://i.pravatar.cc/150?img=3",
  });

  const handleUpdate = (values) => {
    setProfileData({ ...profileData, ...values });
    message.success("Profile updated successfully!");
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 p-10 min-h-screen text-white">
      <h1 className="mb-5 font-bold text-3xl text-center">Participant Profile</h1>
      <Card className="bg-white bg-opacity-90 shadow-xl mx-auto w-full max-w-3xl">
        <div className="flex flex-col items-center">
          <Avatar size={120} src={profileData.image} />
          <h2 className="mt-4 font-semibold text-xl">{profileData.name}</h2>
          <p>{profileData.email}</p>
          <p>{profileData.contact}</p>
        </div>

        <Formik
          initialValues={{
            name: profileData.name,
            email: profileData.email,
            contact: profileData.contact,
          }}
          validationSchema={ProfileSchema}
          onSubmit={handleUpdate}
        >
          {({ errors, touched }) => (
            <FormikForm className="space-y-4 mt-5">
              <Form.Item label="Name" validateStatus={errors.name && touched.name ? "error" : ""}>
                <Field name="name" as={Input} placeholder="Enter your name" />
                {errors.name && touched.name && <div className="text-red-500">{errors.name}</div>}
              </Form.Item>

              <Form.Item label="Email" validateStatus={errors.email && touched.email ? "error" : ""}>
                <Field name="email" as={Input} placeholder="Enter your email" />
                {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
              </Form.Item>

              <Form.Item label="Contact" validateStatus={errors.contact && touched.contact ? "error" : ""}>
                <Field name="contact" as={Input} placeholder="Enter your contact" />
                {errors.contact && touched.contact && <div className="text-red-500">{errors.contact}</div>}
              </Form.Item>

              <div className="flex justify-center mt-5">
                <Button type="primary" htmlType="submit" className="btn btn-wide">
                  Update Profile
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ParticipantProfile;
