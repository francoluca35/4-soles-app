import React from "react";
import AddProductosForm from "./components/AddProductosForm";

function AgregarProductos() {
  return (
    <div
      className="min-h-screen bg-[#881f1f] bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/Assets/Mesas/logo-peru-mar.png')" }}
    >
      <AddProductosForm />
    </div>
  );
}

export default AgregarProductos;
