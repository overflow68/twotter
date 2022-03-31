import React from "react"
import { Navigate } from "react-router"
import { useUserAuth } from "../AuthProvider"

export default function ProtectedRoute({children}) {
  const { user } = useUserAuth()
  if (!user){
    return <Navigate to ='/'/>;
  }
  return children
}
