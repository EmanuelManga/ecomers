import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
export const MiContexto = createContext({});



export default function CartContext({children}) {

    let cantInicial= 1


    const [carrito,setCarrito] = useState([])
    const [carritoVacio,setCarritoVacio] = useState(true)
    const [costoTotal,setCostoTotal] = useState(0)
    const [productosTotal,setProductosTotal] = useState(0)


    const onAdd = (count) => {
        toast.success(`sumaste ${count} al carrito`)
    }
    
    const addItem = (item, quantity)=>{
        if (isInCart(item)){
            let auxId = carrito.findIndex((obj => obj.id === item.id));
            carrito[auxId].cantidad = carrito[auxId].cantidad + quantity;
            setCarrito(carrito);
            sumaTotal();
        }
        else{
            item.cantidad = item.cantidad + quantity;
            setCarrito([...carrito,item])
        }
        sumaTotal();
        // console.log("antes del state",carrito)
        setCarritoVacio(false)
        
    }

    const removeItem = (id) => {
        let auxId = carrito.filter((obj => obj.id !== id));
        setCarrito(auxId)
        sumaTotal();
    }

    const clear = () =>{
        setCarrito([])
        setCarritoVacio(true)
        setCostoTotal(0)
    }

    const isInCart = (item) =>{
        const buscar = carrito.find(obj=>obj.id===item.id)
        // console.log("isincart",buscar)
        if (buscar === undefined){
            return false
        }
        else {
            return true
        }
    }

    const sumarCarrito = (item)=>{
        let auxId = carrito.findIndex((obj => obj.id === item.id));
        if( 0 < item.stock -  carrito[auxId].cantidad ){
            carrito[auxId].cantidad = carrito[auxId].cantidad + 1;
            setCarrito(carrito)
        }
        else{
            toast.error("Alcansaste Stock maximo")
        }
        sumaTotal();
    }

    const restarCarrito = (item)=>{
        if( 1 < item.cantidad){
            let auxId = carrito.findIndex((obj => obj.id === item.id));
            carrito[auxId].cantidad = carrito[auxId].cantidad - 1;
            setCarrito(carrito)
        }
        else{
            toast.error("error")
        }
        sumaTotal();
    }

    const sumaTotal = ()=>{
        setCostoTotal(carrito.reduce((acc,item) => (acc += item.precio * item.cantidad),0))
        return setCostoTotal(carrito.reduce((acc,item) => (acc += item.precio * item.cantidad),0));
    }

    const sumaProductos = () =>{
        setProductosTotal(carrito.reduce((acc,item) => (acc + item.cantidad),0))
        return carrito.reduce((acc,item) => (acc + item.cantidad),0) ;
    }



    return (
    <MiContexto.Provider value={{setCarritoVacio,sumaProductos,productosTotal,carritoVacio,carrito,setCarrito,onAdd,cantInicial,isInCart,addItem,clear,removeItem,sumarCarrito,sumaTotal,costoTotal,restarCarrito}} >{children}</MiContexto.Provider>
    )
}
