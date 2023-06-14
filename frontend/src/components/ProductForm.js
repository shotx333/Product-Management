import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Button } from 'antd';
import apiService from '../services/apiService';

const ProductForm = () => {

  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const fetchedCategories = await apiService.getCategories();
    setCategories(fetchedCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    form.resetFields();
    try {
      await apiService.createProduct(values);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };


  console.log(categories);
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input the name of the product!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input the description of the product!' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: 'Please input the price of the product!' }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        name="images"
        label="Images (URLs, separated by commas)"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="category_id"
        label="Category"
        rules={[{ required: true, message: 'Please select the category!' }]}
      >
        <Select>
          {categories?.map(category => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
