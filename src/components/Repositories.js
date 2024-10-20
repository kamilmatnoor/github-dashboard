import React, { useEffect, useState } from "react";
import api from "../api/http-request";
const Repositories = () => {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const response = await api.get("/search/repositories?q=created:>2024-07-15&sort=stars&order=desc");
        setItems((prev) => [...prev, ...response.data.items]);
    };

    useEffect(() => {
        fetchItems();
    }, []);
    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.full_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Repositories;