import React, {Component} from 'react';
import api from '../../services/api'; 
import './style.css';
import {Link} from 'react-router-dom';


export default class Main extends Component{
    state = {
        products: [],
        pruductInfo:{},
        page:1,
    }
    
    componentDidMount(){ /*if we need to execute an action as soon as the component is on the screen, we use this method*/
        this.loadProducts();                                       

    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const {docs, ...productInfo} = response.data;
        this.setState({ products:docs,productInfo,page });
    };

    nextPage = () =>{
        const { page,productInfo } = this.state;
        if(page === productInfo.pages){
            return;
        }
        const pageNumber = page + 1;

        this.loadProducts(pageNumber);

    }

    prevPage = () =>{
        const {page,productInfo} = this.state;
        if(page === 1){
            return;
        }
        const pageNumber = page - 1;
        this.loadProducts(pageNumber);

    }

    render(){
        const { products,page,productInfo } = this.state;
        return (
            <div className="product-list">
                {products.map(product =>(
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to ={`/products/${product._id}`}>Access</Link>
                    </article>
                ))}
                <div className="actions">
                    <button onClick={this.prevPage}>Back</button>
                    <button onClick={this.nextPage}>Next</button>
                </div>
            </div>
        );
    }
}

