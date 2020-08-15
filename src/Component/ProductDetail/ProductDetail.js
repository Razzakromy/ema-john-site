import React from 'react';
import "./ProductDetail"
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setproduct] = useState(null);
    useEffect(() => {
        fetch("http://localhost:4000/products/"+productKey)
        .then(res => res.json())
        .then(data => {
            setproduct(data)
        })
    }, [])
    return (
        <div>
            <h1>{productKey} Your Product Details</h1>
            {
                product && <Product showaddToCart={false} product={product}></Product>}
        </div>
    );
};

export default ProductDetail;