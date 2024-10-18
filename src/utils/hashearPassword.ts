import { db } from "../firebase/firebase.config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import bcrypt from "bcryptjs";

const hashearContraseñas = async () => {
  const usuarioRef = collection(db, "usuarios");
  
  try {
    const querySnapshot = await getDocs(usuarioRef);

    for (const userDoc of querySnapshot.docs) {
      const userData = userDoc.data();

      // Asegúrate de que la contraseña no esté ya hasheada
      if (!userData.contrasena.startsWith("$2a$")) {
        const hashedPassword = await bcrypt.hash(userData.contrasena, 10);
        const userRef = doc(db, "usuarios", userDoc.id);

        // Actualizar el documento del usuario con la nueva contraseña hasheada
        await updateDoc(userRef, { contrasena: hashedPassword });
        console.log(`Contraseña hasheada y actualizada para el usuario ${userData.nombre}`);
      }
    }
  } catch (error) {
    console.error("Error al hashear contraseñas:", error);
  }
};

// Llama a la función
hashearContraseñas();



//ejecutar
//node path/to/hashearPassword.js
//npx ts-node path/to/hashearPassword.ts

