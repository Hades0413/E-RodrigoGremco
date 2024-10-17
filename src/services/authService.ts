import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { db } from "../firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { format } from "date-fns";

// Función para iniciar sesión con correo y contraseña
export const loginWithEmail = async (correo: string, contrasena: string) => {
  const auth = getAuth();
  return await signInWithEmailAndPassword(auth, correo, contrasena);
};

// Función para iniciar sesión con Google
export const loginWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  // Obtener el usuario registrado
  const user = result.user;

  // Registrar el usuario en la base de datos
  await registerUserWithGoogle(user);

  return result;
};

// Función para iniciar sesión con GitHub
export const loginWithGitHub = async () => {
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  const result = await signInWithPopup(auth, provider);

  // Obtener el usuario registrado
  const user = result.user;

  // Registrar el usuario en la base de datos
  await registerUserWithGitHub(user);

  return result;
};

// Función para cerrar sesión
export const logout = async () => {
  const auth = getAuth();
  return await signOut(auth);
};

// Función para registrar un nuevo usuario
export const registerUser = async (
  nombre: string,
  correo: string,
  contrasena: string,
  direccionEnvio: string,
  esAdmin: boolean = false
) => {
  const usuarioRef = collection(db, "usuarios");

  // Aquí se puede implementar una solución de hash de contraseñas si lo necesitas
  // const saltRounds = 10;
  // const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

  const fechaRegistro = format(new Date(), "dd/MM/yy"); // Formato de fecha deseado

  return await addDoc(usuarioRef, {
    nombre,
    correo_electronico: correo,
    contrasena, // Guarda la contraseña tal cual o utiliza un hash si es necesario
    direccion_envio: direccionEnvio,
    es_admin: esAdmin,
    fecha_registro: fechaRegistro, // Usa la fecha formateada
  });
};

// Función para registrar usuario con Google
export const registerUserWithGoogle = async (user: any) => {
  const usuarioRef = collection(db, "usuarios");
  const fechaRegistro = format(new Date(), "dd/MM/yy"); // Formato de fecha deseado

  return await addDoc(usuarioRef, {
    nombre: user.displayName,
    correo_electronico: user.email,
    direccion_envio: "",
    es_admin: false,
    fecha_registro: fechaRegistro, // Usa la fecha formateada
  });
};

// Función para registrar usuario con GitHub
export const registerUserWithGitHub = async (user: any) => {
  const usuarioRef = collection(db, "usuarios");
  const fechaRegistro = format(new Date(), "dd/MM/yy"); // Formato de fecha deseado

  return await addDoc(usuarioRef, {
    nombre: user.displayName || user.email,
    correo_electronico: user.email,
    direccion_envio: "",
    es_admin: false,
    fecha_registro: fechaRegistro, // Usa la fecha formateada
  });
};
