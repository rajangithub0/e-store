import React, { useState, useEffect } from "react";
import Layout from "./../Components/Layout/Layout"; // Reusable layout component
import axios from "axios"; // For making API requests
import { Checkbox, Radio } from "antd"; // Ant Design components for filters
import { Prices } from "../Components/Prices"; // Price range data for filtering
import { useNavigate } from "react-router-dom";

// HomePage Component
const HomePage = () => {
    // State variables
    const navigate = useNavigate()
    const [products, setProducts] = useState([]); // List of products
    const [categories, setCategories] = useState([]); // List of categories
    const [checked, setChecked] = useState([]); // Selected categories for filtering
    const [radio, setRadio] = useState([]); // Selected price range for filtering
    const [total, setTotal] = useState(0); // Total count of products
    const [page, setPage] = useState(1); // Current page for pagination
    const [loading, setLoading] = useState(false); // Loading state for API calls


    /* ----------------------------
       Fetch and Load Data
    ---------------------------- */
    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Get total product count
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    // Get all products for the current page
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    // Load more products for pagination
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    /* ----------------------------
       Filters and Handlers
    ---------------------------- */
    // Handle category filter
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    // Filter products by selected categories and price range
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    /* ----------------------------
       useEffect Hooks for Lifecycle
    ---------------------------- */
    // Initial data fetch (categories and total product count)
    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    // Fetch products on page change
    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    // Fetch all products if no filters are applied
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    // Apply filters when category or price selection changes
    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    /* ----------------------------
       JSX Rendering
    ---------------------------- */
    return (
        <Layout title={"All Products - Best Offers"}>
            <div className="container-fluid row mt-3">
                {/* Filter Section */}
                <div className="col-md-2">
                    {/* Category Filter */}
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => (
                            <Checkbox
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    {/* Price Filter */}
                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    {/* Reset Filters */}
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-danger"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                {/* Product Listing Section */}
                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="card-text"> $ {p.price}</p>
                                    <button className="btn btn-primary ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                    <button className="btn btn-secondary ms-1">ADD TO CART</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Load More Button */}
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn btn-warning"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Load More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
