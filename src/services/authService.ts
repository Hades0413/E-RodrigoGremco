import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { db } from "../firebase/firebase.config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { format } from "date-fns";
import bcrypt from "bcryptjs";

interface Usuario {
  id: number;
  nombre: string;
  correo_electronico: string;
  contrasena: string;
  direccion_envio: string;
  es_admin: boolean;
  fecha_registro: string;
}

// Función para registrar un nuevo usuario con ID incremental
export const registerUser = async (
  nombre: string,
  correo: string,
  contrasena: string,
  direccionEnvio: string,
  esAdmin: boolean = false
) => {
  try {
    const usuarioRef = collection(db, "usuarios");
    const fechaRegistro = format(new Date(), "dd/MM/yyyy");

    const newUserId = await getNextUserId(usuarioRef);
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = {
      id: newUserId,
      nombre,
      correo_electronico: correo,
      contrasena: hashedPassword,
      direccion_envio: direccionEnvio,
      es_admin: esAdmin,
      fecha_registro: fechaRegistro,
    };

    return await addDoc(usuarioRef, nuevoUsuario);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

// Función genérica para iniciar sesión con un proveedor de autenticación
const loginWithProvider = async (provider: any) => {
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await checkAndRegisterUser(user);
    return result;
  } catch (error) {
    console.error("Error al iniciar sesión con proveedor:", error);
    throw error;
  }
};

// Función para iniciar sesión con correo y contraseña
export const loginWithEmail = async (correo: string, contrasena: string) => {
  try {
    // Verificar si el usuario existe en la base de datos Firestore
    const usuarioRef = collection(db, "usuarios");
    const userQuery = query(
      usuarioRef,
      where("correo_electronico", "==", correo)
    );
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      throw new Error("Usuario no encontrado");
    }

    // Obtener los datos del usuario
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data() as Usuario;

    // Comparar la contraseña ingresada con la contraseña encriptada en la base de datos
    const isPasswordValid = await bcrypt.compare(
      contrasena,
      userData.contrasena
    );

    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    console.log("Inicio de sesión exitoso:", userData);
    // Retorna el usuario o lo que necesites
    return userData;
  } catch (error) {
    console.error("Error al iniciar sesión con correo y contraseña:", error);
    throw error;
  }
};

// Función para iniciar sesión con Google
export const loginWithGoogle = () =>
  loginWithProvider(new GoogleAuthProvider());

// Función para iniciar sesión con GitHub
export const loginWithGitHub = () =>
  loginWithProvider(new GithubAuthProvider());

// Función para cerrar sesión
export const logout = async () => {
  const auth = getAuth();
  try {
    return await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

// Función para verificar y registrar el usuario
const checkAndRegisterUser = async (user: any) => {
  const usuarioRef = collection(db, "usuarios");

  //const para datos predeterminados
  const direccionEnvioPredeterminada = "Sin datos de dirección";
  const passwordPredeterminado =
    "$2a$10$rEfXZL2hp3ESC8PVjw4tu.VSoJXErdamdTYqpLhREEtqSIAtxB9bG";
  const emailPredeterminada = "El Usuario no cuenta con Email Público";

  try {
    const userQuery = query(
      usuarioRef,
      where("correo_electronico", "==", user.email)
    );
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      const newUserId = await getNextUserId(usuarioRef);
      const fechaRegistro = format(new Date(), "dd/MM/yyyy");

      const nuevoUsuario: Usuario = {
        id: newUserId,
        nombre: user.displayName || user.email,
        correo_electronico: user.email || emailPredeterminada,
        contrasena: passwordPredeterminado,
        direccion_envio: direccionEnvioPredeterminada /* "" */,
        es_admin: false,
        fecha_registro: fechaRegistro,
      };

      await addDoc(usuarioRef, nuevoUsuario);
    }
  } catch (error) {
    console.error("Error al verificar o registrar el usuario:", error);
    throw error;
  }
};

// Función para obtener el próximo ID de usuario
const getNextUserId = async (usuarioRef: any): Promise<number> => {
  try {
    const querySnapshot = await getDocs(usuarioRef);
    const userIds: number[] = querySnapshot.docs.map(
      (doc) => (doc.data() as Usuario).id || 0
    );
    return Math.max(...userIds, 0) + 1;
  } catch (error) {
    console.error("Error al obtener el próximo ID de usuario:", error);
    throw error;
  }
};
