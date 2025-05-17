// // src/context/AuthContext.tsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// interface AuthContextType {
//   user: any;
//   token: string | null;
//   login: (token: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   token: null,
//   login: () => {},
//   logout: () => {},
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (token) {
//       console.log("Token found, fetching user...");
//       axios
//         .get("http://localhost:5454/api/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => {
//           console.log("User fetched successfully:", res.data);
//           setUser(res.data);
//         })
//         .catch((err) => {
//           console.error("Failed to fetch user:", err);
//           logout();
//         });
//     }
//   }, [token]);

//   const login = (newToken: string) => {
//     console.log("Logging in, token:", newToken);
//     localStorage.setItem("token", newToken);
//     setToken(newToken);
//   };

//   const logout = () => {
//     console.log("Logging out...");
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
