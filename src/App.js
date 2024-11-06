import React, { useState } from 'react';
import './App.css';

function App() {
  // Danh sách sản phẩm
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Chỉnh sửa
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');

  // Tab control
  const [activeTab, setActiveTab] = useState('addProduct'); // Tab hiện tại: 'addProduct' hoặc 'productList'

  // Thêm sản phẩm
  const handleAddProduct = () => {
    if (productName && productPrice) {
      const newProduct = {
        name: productName,
        price: productPrice,
        addedAt: new Date().toISOString() // Thêm thời gian vào để xác định thứ tự thêm
      };

      // Cập nhật danh sách sản phẩm
      setProducts([newProduct, ...products]); // Sản phẩm mới sẽ được thêm vào đầu danh sách
      setProductName('');
      setProductPrice('');
    }
  };

  // Bắt đầu chỉnh sửa sản phẩm
  const handleEditProduct = (index) => {
    const product = products[index];
    setEditingIndex(index);
    setEditedName(product.name);
    setEditedPrice(product.price);
  };

  // Lưu chỉnh sửa
  const handleSaveEdit = () => {
    if (editedName && editedPrice) {
      const updatedProducts = products.map((product, index) =>
        index === editingIndex ? { ...product, name: editedName, price: editedPrice } : product
      );
      setProducts(updatedProducts);
      setEditingIndex(null); // Ẩn chế độ chỉnh sửa
      setEditedName('');
      setEditedPrice('');
    }
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingIndex(null); // Ẩn chế độ chỉnh sửa mà không thay đổi gì
    setEditedName('');
    setEditedPrice('');
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Xử lý thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Bộ lọc sản phẩm theo tên
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Quản Lý Sản Phẩm</h1>

      {/* Điều khiển tab */}
      <div className="tabs">
        <button onClick={() => setActiveTab('addProduct')} className={activeTab === 'addProduct' ? 'active' : ''}>
          Thêm Sản Phẩm
        </button>
        <button onClick={() => setActiveTab('productList')} className={activeTab === 'productList' ? 'active' : ''}>
          Danh Sách Sản Phẩm
        </button>
      </div>

      {/* Tab Thêm sản phẩm */}
      {activeTab === 'addProduct' && (
        <div className="form-container">
          <div className="form-table">
            <input
              type="text"
              placeholder="Tên sản phẩm"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Giá sản phẩm"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <button onClick={handleAddProduct}>Thêm</button>
          </div>
        </div>
      )}

      {/* Tab Danh sách sản phẩm */}
      {activeTab === 'productList' && (
        <div className="product-list-container">
          <div className="search">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <h2>Danh Sách Sản Phẩm</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>Số thứ tự</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td> {/* Đánh dấu số thứ tự */}
                  <td>{product.name}</td>
                  <td>{product.price} VNĐ</td>
                  <td>
                    {editingIndex === index ? (
                      <div className="action-buttons">
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                        <input
                          type="number"
                          value={editedPrice}
                          onChange={(e) => setEditedPrice(e.target.value)}
                        />
                        <button onClick={handleSaveEdit}>Lưu</button>
                        <button onClick={handleCancelEdit}>Hủy</button>
                      </div>
                    ) : (
                      <div className="action-buttons">
                        <button onClick={() => handleEditProduct(index)}>Chỉnh sửa</button>
                        <button onClick={() => handleDeleteProduct(index)}>Xóa</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
