import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./product-List.css";

function ProdList() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let prod = await fetch("http://localhost:5000/prodlist", {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      prod = await prod.json();
      setProduct(prod);
      console.log(prod);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProd = async (id) => {
    try {
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      getProducts(); // Refreshes the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value.trim(); // Trim whitespace

    if (!key) {
      setProduct([]); // Clear results if input is empty
      return;
    }

    try {
      let response = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {                                             // sending token from frontend
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      let result = await response.json();

      if (Array.isArray(result) && result.length > 0) {
        setProduct(result);
      } else {
        setProduct([]); // Clear if no results found
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="product-list">
      <h1 style={{ textAlign: "center", color: "black" }}>Products List</h1>

      <input
        onChange={searchHandle}
        style={{ padding: "5px", margin: "10px", width: "50%" }}
        type="text"
        placeholder="search products"
      />

      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Remove Product</th>
          </tr>
        </thead>
        <tbody>
          {product.length > 0 ? product.map((item, index) => (
            <tr key={item._id || index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>${item.Price}</td>
              <td>{item.company}</td>
              <td>
                <button
                  onClick={() => deleteProd(item._id)}
                  style={{
                    color: "red",
                    backgroundColor: "white",
                    border: "0px solid gray",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
                <Link
                  to={"/update/" + item._id}
                  style={{
                    color: "green",
                    backgroundColor: "white",
                    border: "0px solid gray",
                    margin: "10px",
                  }}
                >
                  Update Product
                </Link>
              </td>
            </tr>
          )) : <h1>NO result found</h1>
          }
        </tbody>
      </table>
    </div>
  );
}

export default ProdList;