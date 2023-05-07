import getConfig from 'next/config';
import Router from 'next/router'

import axios from 'axios';

const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.apiUrl;

export const apiService = {
    getProducts,
    getCartData,
    addToCart,
    updateCart,
    deleteProductFromCart
};

function getProducts() {
    return axios.get(`${baseUrl}/products`)
        .then(products => {
            return products.data.data;
        });
}

function getCartData(userId) {
    return axios.get(`${baseUrl}/cart/${userId}`)
        .then(cartData => {
            return cartData.data.data;
        });
}

function addToCart(data) {
    let cartData = {
      "productId": data._id,
      "userId": JSON.parse(localStorage.getItem('user'))._id,
      "quantity": 1,
      "price": data.price,
      "title": data.title
    }
    axios.post(`${baseUrl}/cart`, cartData)
    .then(res => {
        console.log(res);
    });
}

function updateCart(id,data) {
    let cartData = {
      "quantity": data.quantity,
      "price": data.quantity*data.price
    }
    axios.put(`${baseUrl}/cart/${id}`, cartData)
    .then(res => {
        console.log(res);
    });
}

function deleteProductFromCart(id) {
    axios.delete(`${baseUrl}/cart/${id}`)
    .then(res => {
        console.log(res);
    });
}

