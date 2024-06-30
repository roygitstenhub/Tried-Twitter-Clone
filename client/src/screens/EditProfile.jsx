import React, { useEffect, useState } from 'react'
import { MdCancel } from "react-icons/md";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../src/firebase"
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { changeProfile } from "../../redux/userSlice.js"
import { logoutUser } from "../../redux/userSlice.js"
import axios from 'axios'


const EditProfile = ({ setData }) => {

  const [img, setImg] = useState(null)
  const [imgUpLoadProgress, setimgUpLoadProgress] = useState(0)

  const { userInfo } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const uploadImage = (file) => {
    const storage = getStorage(app)
    const filename = new Date().getTime() + file.name

    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimgUpLoadProgress(Math.round(progress))
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => { },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const updateProfile = await axios.put(`http://localhost:3000/api/user/update/${userInfo._id}`, {
              profilePicture: downloadURL,
            })
            dispatch(changeProfile(downloadURL))
          } catch (error) {
            console.log("error is: ", error)
          }
          console.log('File available at', downloadURL);
        });
      }
    );
  }//end uploadImage

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/user/${userInfo._id}`)
      dispatch(logoutUser())
      navigate("/login")
    } catch (err) {
      console.log("error is ", err)
    }
  }

  useEffect(() => {
    img && uploadImage(img)
  }, [img])

  return (
    <div className=' absolute left-0 top-0 w-full h-full flex justify-center items-center bg-transparent ' >
      <div className='relative  w-[400px] bg-blue-200 rounded-lg p-6  flex flex-col gap-4 '>
        <button
          className=' absolute top-4 right-4 '
          onClick={() => setData(false)}
        >
          <MdCancel fontSize={'24px'} className='text-blue-500' />
        </button>
        <h2 className="font-bold text-xl">Edit Profile</h2>
        <p>Choose a new profile picture</p>
        {
          imgUpLoadProgress > 0 ? (
            "uploading..." + imgUpLoadProgress + "%"
          ) : (
            <input
              type="file"
              className="bg-transparent border border-blue-500 rounded p-2 "
              accept="image/*"
              onChange={(e) => { setImg(e.target.files[0]) }}
            />
          )
        }

        <button
          className=' px-4 py-2 rounded-full bg-red-500 text-white border-none outline-none '
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  )
}

export default EditProfile