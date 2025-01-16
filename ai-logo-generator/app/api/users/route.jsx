

// import {db} from "@/configs/FirebaseConfig"
// import {doc , getDoc,setDoc } from "firebase/firestore"
// import { NextResponse } from "next/server";



// export async function POST(req){
//     const {userEmail,userName} = await req.json()
//     try{
//         //if user already exists
//         const docRef=doc(db,"users",userEmail);
//         const docSnap=await getDoc(docRef);
//         if(docSnap.exists())
//         {
//             return NextResponse.json(docSnap.data())
//         }
//         else{
//             //insert new user
//             const data={
//                 name:userName,
//                 email:userEmail,
//                 credits:5
//             }

//             await setDoc(doc(db,"users",userEmail),{
//                 ...data
//             })

//            return NextResponse.json(data)
//         }
        


//     }catch(e){

//     }
// }


import { db } from "@/configs/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userEmail, userName } = await req.json();

    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      const data = {
        name: userName,
        email: userEmail,
        credits: 5,
      };

      await setDoc(doc(db, "users", userEmail), data);

      return NextResponse.json(data);
    }
  } catch (error) {
    if (error.code === 'permission-denied') {
      console.error('Firestore permission error:', error.message);
      return NextResponse.json(
        { error: "Missing or insufficient permissions", details: error.message },
        { status: 403 }
      );
    }
    console.error('Error in POST /api/users:', error.message);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
