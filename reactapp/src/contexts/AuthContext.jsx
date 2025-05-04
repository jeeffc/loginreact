import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";
import { auth, db } from "../firebase/Config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para cadastrar um novo usuário
  async function cadastrarUsuario(email, senha, nome, sobrenome, dataNascimento) {
    try {
      // Criar usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      
      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nome: nome,
        sobrenome: sobrenome,
        dataNascimento: dataNascimento,
        email: email,
        dataCadastro: new Date()
      });
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Função para fazer login
  function login(email, senha) {
    return signInWithEmailAndPassword(auth, email, senha);
  }

  // Função para fazer logout
  function logout() {
    return signOut(auth);
  }

  // Função para buscar dados do usuário no Firestore
  async function buscarDadosUsuario(uid) {
    try {
      const docRef = doc(db, "usuarios", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        return docSnap.data();
      } else {
        console.log("Nenhum documento encontrado!");
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      return null;
    }
  }

  // Observador de mudança de estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await buscarDadosUsuario(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    cadastrarUsuario,
    login,
    logout,
    buscarDadosUsuario
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}