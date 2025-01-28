import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import auth from '../Firebase/auth.init'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loder, setLoder] = useState(true)

  // Create User Using Email And Password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // update User profile
  const updateUserprofile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
  }

  // Login user with email & password
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Login user with google
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      console.log('state capture', currentUser)
      setLoder(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // user logout
  const userLogOut = () => {
    return signOut(auth)
  }

  const authInfo = {
    user,
    setUser,
    loder,
    setLoder,
    createUser,
    updateUserprofile,
    loginUser,
    loginWithGoogle,
    userLogOut
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
