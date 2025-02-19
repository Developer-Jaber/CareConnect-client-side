import { useContext, useState } from 'react'
import { Card, Form, Input, Button, Avatar, message } from 'antd'
import { Formik, Form as FormikForm, Field } from 'formik'
import * as Yup from 'yup'
import { EditOutlined } from '@ant-design/icons'
import { AuthContext } from '../../../Provider/AuthProvider'

// const ProfileSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   contact: Yup.string().required('Contact is required')
// })

const ParticipantProfile = () => {
  const {user} = useContext(AuthContext);
  // const [profileData, setProfileData] = useState({
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   contact: "123-456-7890",
  //   image: "https://i.pravatar.cc/150?img=3",
  // });

  // const handleUpdate = (values) => {
  //   setProfileData({ ...profileData, ...values });
  //   message.success("Profile updated successfully!");
  // };

  return (
    <div>
      <section className='relative shadow-xl m-16 p-2 rounded-lg'>
        <button>
          <EditOutlined className='top-0 right-0 absolute m-4 border-4 text-3xl' />
        </button>
        <div className='bg-white text-center'>
          <img
            className='shadow-lg mx-auto border-2 border-gray-300 rounded-full w-40 h-40 object-cover'
            src={user.photoURL}
            alt=''
          />
          <h1 className='mt-4 font-bold text-3xl'>{user?.displayName}</h1>
          <p className='font-semibold text-gray-500'>{user?.email}</p>
        </div>

        <div className='shadow-xl m-10 rounded-md'>
          <h1 className='p-4 font-bold text-[#1A8A83] text-2xl'>About</h1>
          <p className='p-4 text-gray-500 italic'>
            please write aboute yourself
          </p>
        </div>

        <div className='shadow-xl m-10 rounded-md'>
          <h1 className='p-4 font-bold text-[#1A8A83] text-2xl'>
            Personal Infomation
          </h1>

          <div>
            <p className='p-4 text-gray-500 italic'>
              please update your information !
            </p>
          </div>
        </div>

        <div className='shadow-xl m-10 rounded-md'>
          <h1 className='p-4 font-bold text-[#1A8A83] text-2xl'>Soial Link</h1>

          <div>
            <p className='p-4 text-gray-500 italic'>
              please update your information !
            </p>
          </div>
        </div>
      </section>
      {/* <Card className="bg-white bg-opacity-90 shadow-xl mx-auto w-full max-w-3xl">
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
      </Card> */}
    </div>
  )
}

export default ParticipantProfile
