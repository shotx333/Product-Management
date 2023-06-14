import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Avatar, Select } from 'antd';
import apiService from '../services/apiService';
import truncateDescription from '../util/truncateDescription';

function AdminPanel() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [recordType, setRecordType] = useState(null);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    try {
      const response = await apiService.getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await apiService.getProducts();
      const updatedProducts = response.map(product => {
        const category = categories.find(category => category.id === product.category_id);
        return { ...product, categoryName: category ? category.name : "N/A" };
      });
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };


  useEffect(() => {
    fetchCategories();
    fetchProducts();
  });

  const handleAdd = (type) => {
    
    setCurrentRecord(null);
    form.resetFields();
    setIsModalVisible(true);
    setRecordType(type);
  };

  const handleEdit = (record, type) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
    setRecordType(type);
  };

  const handleDelete = async (record, type) => {
    setLoading(true);
    try {
      if (type === "category") {
        await apiService.deleteCategory(record.id);
      } else {
        console.log(type);
        await apiService.deleteProduct(record.id);
      }
      fetchCategories();
      fetchProducts();
      alert("Record deleted successfully!");
    } catch (error) {
      console.error("Error deleting record: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      if (currentRecord) {
        const { id, ...otherValues } = currentRecord;
        if (recordType === "category") {
          await apiService.updateCategory(id, { ...otherValues, ...values });
        } else {
          await apiService.updateProduct(id, { ...otherValues, ...values });
        }
      } else {
        if (recordType === "category") {
          await apiService.createCategory(values);
        } else {
          await apiService.createProduct(values);
        }
      }
      fetchCategories();
      fetchProducts();
      setIsModalVisible(false);
      alert("Record saved successfully!");
    } catch (error) {
      console.error("Error saving record: ", error);
    } finally {
      setLoading(false);
    }
  };



  const columnsCategory = [
    {
      title: 'Name',
      dataIndex: 'name',
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => { setRecordType('category'); handleEdit(record, 'category'); }}>Edit</Button>
          <Button onClick={() => { handleDelete(record, 'category'); }}>Delete</Button>
        </span>
      ),
    },
  ];

  const columnsProduct = [
    {
      title: 'Image',
      dataIndex: 'images',
      render: (text, record) => <Avatar src={record.images} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (text) => truncateDescription(text),
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => { setRecordType('product'); handleEdit(record, 'product'); }}>Edit</Button>
          <Button onClick={() => { handleDelete(record, 'product'); }}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => handleAdd("category")}>Add Category</Button>
      <Table columns={columnsCategory} dataSource={categories} rowKey="id" />

      <Button type="primary" onClick={() => handleAdd("product")}>Add Product</Button>
      <Table columns={columnsProduct} dataSource={products} rowKey="id" />
      <Modal
        title={currentRecord ? "Edit Record" : "Add Record"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>

          {recordType === "product" && (
            <>
              <Form.Item
                name="images"
                label="Image URL"
              >
                <Input />
              </Form.Item>

              <Form.Item name="description" label="Description"
                rules={[{ required: true, message: 'Please input the description!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Price"
                rules={[{ required: true, message: 'Please input the price!' }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="category_id"
                label="Category"
                rules={[{ required: true, message: 'Please select a category!' }]}
              >
                <Select>
                  {categories.map(category => (
                    <Select.Option value={category.id}>{category.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>

            </>
          )}
        </Form>
      </Modal>
    </div>
  );
}

export default AdminPanel;