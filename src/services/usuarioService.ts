import { db } from "../firebase/firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { format } from "date-fns";
import bcrypt from "bcryptjs";

export interface Usuario {
  id: number;
  nombre: string;
  correo_electronico: string;
  contrasena: string;
  direccion_envio: string;
  es_admin: boolean;
  fecha_registro: string;
  firebaseDocId?: string;
}

// Referencia a la colección "usuarios" en Firebase
const usuarioCollectionRef = collection(db, "usuarios");

// Obtener todos los usuarios
export const fetchUsuarios = async (): Promise<Usuario[]> => {
  const snapshot = await getDocs(usuarioCollectionRef);
  return snapshot.docs.map((doc) => ({
    firebaseDocId: doc.id,
    ...doc.data(),
  })) as Usuario[];
};

// Obtener un usuario por su firebaseDocId
export const fetchUsuarioByFirebaseDocId = async (
  firebaseDocId: string
): Promise<Usuario | null> => {
  const docRef = doc(db, "usuarios", firebaseDocId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      firebaseDocId: docSnap.id,
      ...docSnap.data(),
    } as Usuario;
  } else {
    return null;
  }
};

// Crear un nuevo usuario
export const createUsuario = async (
  nuevoUsuario: Usuario
): Promise<boolean> => {
  try {
    // Encriptar la contraseña
    const hashedPassword = bcrypt.hashSync(nuevoUsuario.contrasena, 10);
    const usuarioConContrasenaEncriptada = {
      ...nuevoUsuario,
      contrasena: hashedPassword,
    };

    await addDoc(usuarioCollectionRef, usuarioConContrasenaEncriptada);
    return true;
  } catch (err) {
    console.error("Error al añadir usuario: ", err);
    return false;
  }
};

export const fetchNextUserId = async (): Promise<number> => {
  try {
    const usuarios = await fetchUsuarios();
    const maxId = usuarios.reduce(
      (max, usuario) => Math.max(max, usuario.id),
      0
    );
    return maxId + 1;
  } catch (err) {
    console.error("Error al obtener el ID del usuario: ", err);
    throw new Error("Error al recuperar el ID del usuario.");
  }
};

// Formatear fecha en el formato deseado
export const formatFechaRegistro = (): string => {
  return format(new Date(), "dd/MM/yyyy");
};

// Actualizar un usuario existente (usando el firebaseDocId)
export const updateUsuario = async (
  firebaseDocId: string,
  usuario: Partial<Usuario>
): Promise<void> => {
  const usuarioDocRef = doc(db, "usuarios", firebaseDocId);
  await updateDoc(usuarioDocRef, usuario);
};

// Eliminar un usuario (usando el firebaseDocId)
export const deleteUsuario = async (firebaseDocId: string): Promise<void> => {
  const usuarioDocRef = doc(db, "usuarios", firebaseDocId);
  await deleteDoc(usuarioDocRef);
};
