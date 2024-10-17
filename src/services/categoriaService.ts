import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";

// Función para obtener el último ID de categoría
export const fetchLastCategoryId = async (): Promise<number> => {
  try {
    const categoriasCollection = collection(db, "categorias");
    const categoriasSnapshot = await getDocs(categoriasCollection);
    let maxId = 0;

    categoriasSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id > maxId) {
        maxId = data.id;
      }
    });

    return maxId === 0 ? 1 : maxId + 1;
  } catch (err) {
    console.error("Error al obtener el último ID de categoría: ", err);
    throw new Error("Error al recuperar el último ID. Inténtalo de nuevo.");
  }
};

// Función para crear una nueva categoría
export const createCategoria = async (nombre: string, lastId: number) => {
  try {
    console.log("Creando categoría con ID:", lastId, "y nombre:", nombre);
    await addDoc(collection(db, "categorias"), {
      id: lastId,
      nombre: nombre.trim(),
    });
    return true;
  } catch (err) {
    console.error("Error al añadir la categoría: ", err);
    throw new Error("Error al añadir la categoría. Inténtalo de nuevo.");
  }
};

// Función para obtener categorías
export const fetchCategorias = async () => {
  try {
    const categoriasCollection = collection(db, "categorias");
    const categoriasSnapshot = await getDocs(categoriasCollection);
    const categoriasList = categoriasSnapshot.docs.map((doc) => ({
      firebaseId: doc.id,
      id: doc.data().id,
      nombre: doc.data().nombre,
    }));

    console.log("Categorías obtenidas:", categoriasList);
    return categoriasList;
  } catch (err) {
    console.error("Error al obtener las categorías: ", err);
    throw new Error("Error al recuperar las categorías. Inténtalo de nuevo.");
  }
};

// Función para actualizar una categoría
export const updateCategoria = async (
  firebaseDocId: string,
  nombre: string
) => {
  try {
    console.log(
      "Actualizando categoría con Firebase ID:",
      firebaseDocId,
      "y nombre:",
      nombre
    );
    const categoriaRef = doc(db, "categorias", firebaseDocId);
    await updateDoc(categoriaRef, { nombre });
    console.log("Categoría actualizada con éxito");
    return true;
  } catch (err) {
    console.error("Error al actualizar la categoría:", err);
    throw new Error("Error al actualizar la categoría. Inténtalo de nuevo.");
  }
};

// Función para eliminar una categoría
export const deleteCategoria = async (firebaseId: string) => {
  try {
    console.log("Eliminando categoría con Firebase ID:", firebaseId);
    const categoriaRef = doc(db, "categorias", firebaseId);
    await deleteDoc(categoriaRef);
    console.log("Categoría eliminada con éxito");
    return true;
  } catch (err) {
    console.error("Error al eliminar la categoría:", err);
    throw new Error("Error al eliminar la categoría. Inténtalo de nuevo.");
  }
};
