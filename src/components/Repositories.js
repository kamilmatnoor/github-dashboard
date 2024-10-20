import React, { useEffect, useState, useRef } from "react";
import api from "../api/http-request";
const Repositories = () => {
    const [items, setItems] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const observerRef = useRef();

    const fetchItems = async (pageNumber) => {
        const response = await api.get(`/search/repositories?q=created:>2024-07-15&sort=stars&order=desc&page=${pageNumber}`);
        setItems((prev) => [...prev, ...response.data.items]);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log(entries[0])
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };

    }, []);

    useEffect(() => {
        fetchItems(pageNumber);
    }, [pageNumber]);
    return (
        <div>
            <ul className="">
                {items.map((item, index) => (
                    <li className="bg-white shadow overflow-hidden sm:rounded-md mx-auto mb-16" key={index}>
                        <div className="px-4 py-5 sm:px-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{item.full_name}</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">{item.stargazers_count}</p>
                            </div>
                            <div className="mt-4 flex items-center text-left">
                                <p className="text-sm font-medium text-gray-500">{item.description}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div ref={observerRef} style={{ height: '20px' }} />
        </div>
    );
};

export default Repositories;