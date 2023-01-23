import  { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {

    const [products, setProduct] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get('http://localhost:4000/products');
        setProduct(response.data);
    }

    const deleteProduct = async (id) => {
                await axios.delete(`http://localhost:4000/products/${id}`);
                getProducts();
            }



    return (
        <>
            <div className='container mt-5 '>
                <div className='text-right'>
                <Link to={'/'} className="btn btn-danger">Logout</Link>
                </div>
                <div className='a'>
                <Link to="/add" className="btn btn-primary mb-2 ">Add New</Link>
                </div>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Furniture</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    { products.map((product, index) => (
                        <tr key={ product.id }>
                            <td>{ index + 1 }</td>
                            <td>{ product.title }</td>
                            <td>{ product.price }</td>
                            <td>
                            <Link to={`/edit/${product.id}`} className="btn btn-primary">Edit</Link>
                            <button onClick={ () => deleteProduct(product.id) } className="btn btn-danger mx-2">Delete</button>
                            </td>
                        </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductList