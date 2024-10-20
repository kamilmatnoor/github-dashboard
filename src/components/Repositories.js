import React, { useEffect, useState } from "react";
const Repositories = () => {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const newItems = await new Promise((resolve) =>
            setTimeout(() => resolve(Array.from({ length: 100 }, (_, i) => `Item ${items.length + i + 1}`)), 1000)
        );
        setItems((prev) => [...prev, ...newItems]);
    };

    useEffect(() => {
        fetchItems();
    }, []);
    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Repositories;