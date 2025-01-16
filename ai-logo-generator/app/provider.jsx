// 'use client'
// import React, { useEffect } from 'react'
// import Header from './_components/Header'
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import { useUser } from '@clerk/nextjs'; 

// function Provider({children}) {

//   const {user}=useUser();


//   useEffect(()=>{
//     user&&CheckUserAuth();
//   },[user])

//   //save user data



//   const CheckUserAuth=async()=>{
//     //save user to database

//     // const result=await axios.post('/api/users/route.jsx',{
//     //   userName:user?.fullName,
//     //   userEmail:user?.primaryEmailAddress?.emailAddress
//     // })

//     const result = await axios.post('/api/users', {
//       userName: user?.fullName,
//       userEmail: user?.primaryEmailAddress?.emailAddress
//     });
    

//     console.log(result.data);
//    //console.log('Request body:', await request.json());






//   }




//   return (
//     <div>
//       <Header/>
//       <div className='px-10 lg:px-32 xl:px-48 2xl:px-56'>
//         {children}
//       </div>
     
//     </div>
//   )
// }

// export default Provider




'use client';
import React, { useEffect, useState } from 'react';
import Header from './_components/Header';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from './_context/UserDetailContext';

function Provider({ children }) {

  const { user } = useUser();
  const [userDetail,setUserDetail] = useState();

  useEffect(() => {
    if (user) {
      CheckUserAuth();
    }
  }, [user]);

  const CheckUserAuth = async () => {
    try {
      // Save user to database
      const result = await axios.post('/api/users', {
        userName: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      console.log('User saved:', result.data);
      setUserDetail(result.data);


    } catch (error) {
      console.error('Error in CheckUserAuth:', error.response?.data || error.message);
    }
  };

  return (
    <div>

      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>

      <Header />
      <div className="px-10 lg:px-32 xl:px-48 2xl:px-56">
        {children}
      </div>
      </UserDetailContext.Provider>

    </div>
  );
}

export default Provider;
