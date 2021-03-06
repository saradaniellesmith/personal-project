import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

import './ProductDetails.css';

class ProductDetails extends  Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
    };

    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/productdetails/${this.props.match.params.product_id}`)
      .then(response => {
        console.log(response.data);
        this.setState({ product: response.data });
      });
  }

  addToCart(product) {
    axios
      .post("/shoppingcart", product)
      .then(response => response.data.cart)
      .catch(console.log);
  }


  render() {
    // console.log(this.state.product);
    const product = this.state.product.map((product, index) => {
      return (
        <div className="product-details-page" key={index}>
        <div className="details-images">
          <img className="image-details" src={product.image}  />
          <img className="image-details" src={product.image2} />
          <img className="image-details" src={product.image3} />
        </div>
          <div className="product-info">
            <h1 className="details-brand"> {product.brand_name} </h1>
            <h2 className="details-descrip"> {product.product_description} </h2>
            <h3 className="details-price"> ${product.price}.00 </h3>
            {/* <p> Description </p> */}
            <p className="editors-note"> {product.editor_note} </p>
            <button className="add" onClick={() => {this.addToCart(product)
              swal({
                title: "Added to Cart!",
                text: "",
                icon: "success",
                button: "KEEP SHOPPING!",
              });
            }} > ADD TO CART </button>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div> {product} </div> 
      </div>
    )
  }
}

export default ProductDetails;
