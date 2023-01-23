import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddProduct() {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/products', {
            title: title,
            price: price
        });
        navigate("/productlist");
    }

    return (
        <>
            <div className='container mt-5 w-25'>
                <div class="card">
                    <div class="card-body">
                        <form onSubmit={saveProduct}>
                            <div className="form-group">
                                <label >Product</label>
                                <input  className="form-control"   placeholder="Enter products name" value={title} onChange= { (e) => setTitle(e.target.value) } />
                            </div>
                            <div className="form-group">
                                <label >Price</label>
                                <input  className="form-control"  placeholder="Enter products price" value={price} onChange= { (e) => setPrice(e.target.value) }/>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct