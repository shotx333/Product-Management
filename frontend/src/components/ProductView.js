import React from 'react';
import { Modal } from 'antd';

function ProductView({ product, visible, onClose }) {
  return (
    <Modal
      title={product.name}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <img src={product.images} alt={product.name} style={{ width: '100px', height: '100px' }} />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Category: {product.categoryName}</p>
    </Modal>
  );
}

export default ProductView;
