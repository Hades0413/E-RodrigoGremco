import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  fetchCategorias,
  deleteCategoria,
  createCategoria,
  fetchLastCategoryId,
} from "../services/categoriaService";
import CategoriaForm from "../components/common/categorias/CategoriaForm";
import Swal from "sweetalert2";

interface CategoriaType {
  firebaseId: string;
  id: number;
  nombre: string;
}

const Categoria: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] =
    useState<CategoriaType | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const categoriasList = await fetchCategorias();
        setCategorias(categoriasList);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    obtenerCategorias();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre de Categoría", flex: 1 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 300,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Button
            color="primary"
            onClick={() => handleEdit(params.row as CategoriaType)}
            sx={{ marginRight: 1 }}
          >
            Editar
          </Button>
          <Button
            color="info"
            onClick={() => handleDetail(params.row as CategoriaType)}
            sx={{ marginRight: 1 }}
          >
            Detalles
          </Button>
          <Button color="error" onClick={() => handleDelete(params.row)}>
            Eliminar
          </Button>
        </Box>
      ),
    },
  ];

  const handleEdit = (categoria: CategoriaType) => {
    setSelectedCategoria(categoria);
    setIsCreating(false);
    setIsViewing(false);
    setOpen(true);
  };

  const handleDetail = (categoria: CategoriaType) => {
    setSelectedCategoria(categoria);
    setIsCreating(false);
    setIsViewing(true);
    setOpen(true);
  };

  const handleDelete = async (categoria: CategoriaType) => {
    const { firebaseId, id, nombre } = categoria;
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar la categoría "${nombre}" con ID: ${id}?`,
      icon: "warning",
      background: "#000",
      color: "#fff",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteCategoria(firebaseId);
        setCategorias((prev) => prev.filter((c) => c.id !== id));
        await Swal.fire({
          icon: "success",
          title: "Categoría eliminada",
          text: "La categoría se ha eliminado con éxito.",
          background: "#000",
          color: "#fff",
        });
      } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al eliminar la categoría. Inténtalo de nuevo.",
          background: "#000",
          color: "#fff",
        });
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategoria(null);
    setIsCreating(false);
    setIsViewing(false);
  };

  const handleCreate = async (nombre: string) => {
    try {
      const lastId = await fetchLastCategoryId();
      await createCategoria(nombre, lastId);
      const newCategorias = await fetchCategorias();
      setCategorias(newCategorias);
      await Swal.fire({
        icon: "success",
        title: "Categoría creada",
        text: "La categoría se ha creado con éxito.",
        background: "#000",
        color: "#fff",
      });
      handleClose();
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al crear la categoría. Inténtalo de nuevo.",
        background: "#000",
        color: "#fff",
      });
    }
  };

  return (
    <Box sx={{ height: 400, width: "100%", padding: 2 }}>
      <h1>Gestión de Categorías</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setIsCreating(true);
          setOpen(true);
        }}
        sx={{ marginBottom: 2 }}
      >
        Crear Categoría
      </Button>
      <DataGrid
        rows={categorias}
        columns={columns}
        paginationModel={{ pageSize: 5, page: 0 }}
        autoHeight
        checkboxSelection
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isCreating
            ? "Crear Categoría"
            : selectedCategoria && isViewing
            ? "Detalles de Categoría"
            : "Editar Categoría"}
        </DialogTitle>
        <DialogContent>
          <CategoriaForm
            categoria={
              selectedCategoria || { firebaseId: "", id: 0, nombre: "" }
            }
            onClose={handleClose}
            onCreate={handleCreate}
            isCreating={isCreating}
            isViewing={isViewing}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categoria;
