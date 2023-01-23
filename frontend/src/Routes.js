import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddProduct from './components/AddProduct'
import Login from './components/Login'
import ProductEdit from './components/ProductEdit'
import ProductList from './components/ProductList'
import Register from './components/Register'

function Rout() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/productlist" element={<ProductList />} />
                <Route exact path="/add" element={<AddProduct />} />
                <Route exact path="/edit/:id" element={<ProductEdit />} />
            </Routes>
        </Router>
    )
}

export default Rout