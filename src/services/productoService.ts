import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock_disponible: number;
  imagen_producto?: string;
  fecha_adicion: string;
  categoria_id: number;
  firebaseDocId?: string;
}

export const fetchProductos = async (): Promise<Producto[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const productosArray = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Producto, "firebaseDocId" | "id">;
      return {
        firebaseDocId: doc.id,
        id: parseInt(doc.id),
        descripcion: data.descripcion || "",
        ...data,
      };
    });
    return productosArray;
  } catch (err) {
    console.error("Error al obtener los productos: ", err);
    return [];
  }
};


export const createProducto = async (
  nuevoProducto: Producto
): Promise<boolean> => {
  try {
    await addDoc(collection(db, "productos"), nuevoProducto);
    return true;
  } catch (err) {
    console.error("Error al añadir producto: ", err);
    return false;
  }
};

export const updateProducto = async (
  firebaseDocId: string,
  updatedData: Partial<Producto>
): Promise<boolean> => {
  try {
    const productoRef = doc(db, "productos", firebaseDocId);
    await updateDoc(productoRef, updatedData);
    return true;
  } catch (err) {
    console.error("Error al actualizar el producto: ", err);
    return false;
  }
};

// Nueva función para eliminar un producto
export const deleteProducto = async (
  firebaseDocId: string
): Promise<boolean> => {
  try {
    const productoRef = doc(db, "productos", firebaseDocId);
    await deleteDoc(productoRef);
    return true;
  } catch (err) {
    console.error("Error al eliminar el producto: ", err);
    return false;
  }
};

export const fetchNextProductId = async (): Promise<number> => {
  try {
    const productos = await fetchProductos();
    const maxId = productos.reduce(
      (max, producto) => Math.max(max, producto.id),
      0
    );
    return maxId + 1;
  } catch (err) {
    console.error("Error al obtener el ID del producto: ", err);
    throw new Error("Error al recuperar el ID del producto.");
  }
};
