import axios from "axios";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function ProductEdit() {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:4000/products/${id}`, {
            title: title,
            price: price
        });
        navigate("/productlist");
    }

    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:4000/products/${id}`);
        setTitle(response.data.title);
        setPrice(response.data.price);
    }

    return (
        <>
            <div className='container mt-5 w-25'>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={updateProduct}>
                            <div className="form-group">
                                <label >Product</label>
                                <input className="form-control" placeholder="Enter products name" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label >Price</label>
                                <input className="form-control" placeholder="Enter products price" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>

                            <button type="submit" className="btn btn-primary">update</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductEdit