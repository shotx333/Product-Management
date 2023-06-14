import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Input, Form } from 'antd';
import ProductView from './ProductView';
import apiService from '../services/apiService';
import truncateDescription from '../util/truncateDescription';
import {useSearchParams} from 'react-router-dom';


function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [viewProduct, setViewProduct] = useState(null);
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        apiService.getProducts()
            .then(productResponse => {
                apiService.getCategories()
                    .then(categoryResponse => {
                        const categoryMap = categoryResponse.reduce((map, category) => {
                            map[category.id] = category.name;
                            return map;
                        }, {});

                        const productsWithCategoryNames = productResponse.map(product => {
                            return {
                                ...product,
                                categoryName: categoryMap[product.category_id]
                            };
                        });

                        setProducts(productsWithCategoryNames);
                        setFilteredProducts(productsWithCategoryNames);
                    });
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    };

    const handleView = (product) => {
        setViewProduct(product);
    };

    const handleDelete = (productId) => {
        apiService.deleteProduct(productId)
            .then(() => {
                loadProducts();
            })
            .catch(error => {
                console.error("Error deleting product: ", error);
            });
    };
    const handleFilter = (values) => {
        let tempProducts = [...products];

        if (values.name) {
            tempProducts = tempProducts.filter(product => product.name.includes(values.name));
        }

        if (values.price) {
            tempProducts = tempProducts.filter(product => Number(product.price) === Number(values.price));
        }

        if (values.description) {
            tempProducts = tempProducts.filter(product => product.description === values.description);
        }

        if (values.category) {
            tempProducts = tempProducts.filter(product => product.categoryName === values.category);
        }
        setFilteredProducts(tempProducts);

        let newParams = {};
        for (let key in values) {
            if (values[key]) {
                newParams[key] = values[key];
            }
        }
        setSearchParams(newParams);
    };
    useEffect(() => {
        const values = Object.fromEntries(searchParams.entries());
        form.setFieldsValue(values);
        handleFilter(values);
    }, [searchParams]);


    return (
        <div>
            <Form form={form} layout="inline" onFinish={handleFilter}>
                <Form.Item name="name" label="Product Name">
                    <Input placeholder="Enter product name" />
                </Form.Item>
                <Form.Item name="price" label="Product Price">
                    <Input placeholder="Enter product price" />
                </Form.Item>
                <Form.Item name="description" label="Product Description">
                    <Input placeholder="Enter product description" />
                </Form.Item>
                <Form.Item name="category" label="Product Category">
                    <Input placeholder="Enter product category" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Filter</Button>
                </Form.Item>
            </Form>
            <Row gutter={[16, 16]}>
                {filteredProducts.map(product => (
                    <Col key={product.id} span={8}>
                        <Card title={product.name}>
                            <img src={product.images} alt={product.name} style={{ width: '100px', height: '100px' }} />
                            <p>{truncateDescription(product.description)}</p>
                            <p>Price: {product.price}</p>
                            <p>Category: {product.categoryName}</p>
                            <Button type="primary" onClick={() => handleView(product)}>View</Button>
                            <Button type="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
                        </Card>
                    </Col>
                ))}
            </Row>
            {viewProduct && <ProductView product={viewProduct} visible={Boolean(viewProduct)} onClose={() => setViewProduct(null)} />}
        </div>
    );
}

export default ProductList;

