import './App.css';
import { useState } from "react";
import  Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [años, setAños] = useState();
  const [id, setId] = useState();

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleadosList] = useState([])
  
  const add = () =>{
    Axios.post("https://crud-backdeploy-production.up.railway.app/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      años:años
    }).then(()=>{
       getEmpleados();
       limpiarCampos()
      Swal.fire({
        title: "<strong>¡Registro exitoso!</strong>",
        html: "<i>El empleado <strong>" + nombre +  " </strong> fue registrado correctamente</i>",
        icon: 'success',
        timer:3000
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse( JSON.stringify(error)).message === "Network Error" ? "Intente más tarde":JSON.parse( JSON.stringify(error)).message
      })
    })
  }

  const update = () =>{
    Axios.put("https://crud-backdeploy-production.up.railway.app/update",{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      años:años
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Actualización exitoso!</strong>",
        html: "<i>El empleado <strong>" + nombre +  " </strong> fue actualizado correctamente</i>",
        icon: 'success',
        timer:3000
      })
     
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse( JSON.stringify(error)).message === "Network Error" ? "Intente más tarde":JSON.parse( JSON.stringify(error)).message
      })
    });
  }

  const erase = (val) =>{

    Swal.fire({
      title: '¿Confirma eliminado?',
      text: "Realmente desea eliminar a "+" "+ val.nombre+ " " +"?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#008f39',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'Si, ¡borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`https://crud-backdeploy-production.up.railway.app/delete/${val.id}`).then(()=>{
          getEmpleados();
          limpiarCampos();
          Swal.fire({
              icon:'success',
              title:val.nombre + " " +'fue eliminado.',
              showConfirmButton: false,
              timer: 2000
          })
        
        }).catch(function(error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el empleado',
            footer: JSON.parse( JSON.stringify(error)).message === "Network Error" ? "Intente más tarde":JSON.parse( JSON.stringify(error)).message
          })
        })
   
    }
  })
}

  const limpiarCampos =()=>{
    setAños("");
    setNombre("");
    setPais("");
    setEdad("");
    setId("");
    setCargo("");
    setEditar(false);
  }
  
  const editarEmpleado = (val)=>{

    setEditar(true);

    setNombre(val.nombre)
    setEdad(val.edad)
    setPais(val.pais)
    setCargo(val.cargo)
    setNombre(val.nombre)
    setAños(val.años)
    setId(val.id)
    
  }
  const getEmpleados = () =>{
    Axios.get("https://crud-backdeploy-production.up.railway.app/empleados").then((response)=>{
      setEmpleadosList(response.data);
    });
  }
  getEmpleados();

  return (
    <div className="container">
        
      <div className="card text-center">
          <div className="card-header">
            Gestión de empleados
          </div>
          <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre: </span>
            <input type="text" value={nombre} className="form-control" placeholder="Ingrese nombre" aria-label="Username" aria-describedby="basic-addon1"
                onChange={(event)=>{
                  setNombre(event.target.value)
                }}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad: </span>
            <input type="number" value={edad} className="form-control" placeholder="Ingrese edad" aria-label="Username" aria-describedby="basic-addon1"
                onChange={(event)=>{
                  setEdad(event.target.value)
                }}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País: </span>
            <input type="text" value={pais} className="form-control" placeholder="Ingrese país" aria-label="Username" aria-describedby="basic-addon1"
                onChange={(event)=>{
                  setPais(event.target.value)
                }}
            />
          </div>
         
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo: </span>
            <input type="text" value={cargo} className="form-control" placeholder="Ingrese cargo" aria-label="Username" aria-describedby="basic-addon1"
                onChange={(event)=>{
                  setCargo(event.target.value)
                }}
            />
          </div>
          
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de experiencia: </span>
            <input type="number" value={años} className="form-control" placeholder="Ingrese años de experiencia" aria-label="Username" aria-describedby="basic-addon1"
               onChange={(event)=>{
                setAños(event.target.value)
              }}
            />
          </div>
                    
          </div>
          <div className="card-footer text-body-secondary">
            {
              editar?
              <div>
                <button className='btn btn-success m-2' onClick={update}>Actualizar</button>
                <button className='btn btn-warning m-2' onClick={limpiarCampos}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={add}>Registrar</button>
            }
          
          </div>
      </div>

      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
          <th scope="col">País</th>
          <th scope="col">Cargo</th>
          <th scope="col">Años de experiencia</th>
          <th scope="col">Acciones</th>
         
        </tr>
     </thead>
      <tbody>
      {
                  empleadosList.map((val, key) =>{
                      return <tr key={val.id}>
                                <th >{val.id}</th>
                                <td>{val.nombre}</td>
                                <td>{val.edad}</td>
                                <td>{val.pais}</td>
                                <td>{val.cargo}</td>
                                <td>{val.años}</td>
                                <td>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                  <button type="button" className="btn btn-warning"
                                  onClick={ ()=>{
                                    editarEmpleado(val)
                                  }}
                                  >Editar</button>
                                  <button type="button" onClick={()=>{
                                    erase(val)
                                  }} className="btn btn-danger">Eliminar</button>
                                  
                                </div>
                                </td>
                              </tr>                      
                  })
                }
              
      </tbody>
      </table>
    </div>
  )
    
}

export default App;
