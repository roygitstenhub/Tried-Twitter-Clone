import React, { useEffect, useState } from 'react'
import TimelineTweet from './TimelineTweet'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../src/firebase"
import { IoMdPhotos } from "react-icons/io";

const Maintweet = () => {
    const [tweetText, settweetText] = useState("")
    const [img, setImg] = useState(null)
    const [imgurl, setImgUrl] = useState(null)

    const { userInfo } = useSelector((state) => state.user)

    //upload function
    const uploadImage = (file) => {
        const storage = getStorage(app)
        const filename = new Date().getTime() + file.name

        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file)

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // setimgUpLoadProgress(Math.round(progress))
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
                    setImgUrl(downloadURL)
                });
            }
        );
    }//end uploadImage


    useEffect(() => {
        img && uploadImage(img)
    }, [img])


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("out")
        try {
            const tweetData = await axios.post(`http://localhost:3000/api/tweet`, {
                userId: userInfo._id,
                description: tweetText,
                pic: imgurl
            })
            console.log("In")
            settweetText(tweetData.data)
            window.location.reload(false)
        } catch (err) {
            console.log("error is : ", err)
        }
        console.log("end")
    }

    return (
        userInfo &&
        <div>
            <p className='font-bold py-2'>{userInfo.username}</p>
            <form className='border-b-2 pb-2'>
                <textarea
                    type='text'
                    maxLength={280}
                    placeholder="What's happening...."
                    className='w-full bg-blue-100 p-2 outline-none'
                    onChange={(e) => { settweetText(e.target.value) }}
                ></textarea>

                <div className='flex justify-between items-center mt-2 relative ' >
                    <div className=' w-[50px] '>
                        <input type="file"
                            onChange={(e) => { setImg(e.target.files[0]) }}
                            id="file_upload"
                            className=' opacity-0 z-10 absolute top-1 w-[50px] cursor-pointer  '
                        />
                        <IoMdPhotos className=' span z-0 absolute top-1 left-1 text-blue-500 cursor-pointer ' fontSize={'28px'} />
                    </div>

                    <button
                        className='px-4 py-1.5 right-0 bg-blue-500 text-white  rounded-full ml-auto  '
                        onClick={handleSubmit}
                    >Tweet</button>

                </div>

            </form>
            <div className='overflow-auto w-full h-screen'>
                <TimelineTweet />
            </div>
        </div>
    )
}

export default Maintweet