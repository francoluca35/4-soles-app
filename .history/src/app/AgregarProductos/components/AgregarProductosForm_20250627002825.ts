'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';

const categoriasComida = [
  'pizzas', 'empanadas', 'pasta tartas y tortillas', 'sandwichs', 'papas fritas',
  'milanesas y milapizzas', 'ensaladas', 'pollo al espiedo',
  'hamburguesas, hamburpizza', 'picadas', 'promos'
];

const categoriasHelado = [
  'Productos gio', 'bombones', 'crema', 'agua', 'salsas', 'candy', 'especiales'
];

export default function AgregarProductoForm() {
  const [tipo, setTipo] = useState<'comida' | 'helado'>('comida');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = async () => {
    if (!nombre || !precio || !categoria) {
      return Swal.fire('Faltan datos', 'Por favor completá todos los campos', 'warning');
    }

    try {
      const res = await fetch('/api/productos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, nombre, precio: parseFloat(precio), categoria }),
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire('Producto agregado', '', 'success');
        setNombre('');
        setPrecio('');
        setCategoria('');
      } else {
        Swal.fire('Error', data.error || 'No se pudo guardar', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al conectar con el servidor', 'error');
    }
  };

  return (
    <div className="bg-white p-4 rounded max-w-md mx-auto text-black">
      <h2 className="text-lg font-semibold mb-4">Agregar Producto</h2>

      <div className="mb-3">
        <label className="block mb-1">Tipo</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value as 'comida' | 'helado')} className="w-full p-2 border rounded">
          <option value="comida">Comida</option>
          <option value="helado">Helado</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1">Nombre</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Precio</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Categoría</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccionar</option>
          {(tipo === 'comida' ? categoriasComida : categoriasHelado).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Guardar Producto
      </button>
    </div>
  );
}