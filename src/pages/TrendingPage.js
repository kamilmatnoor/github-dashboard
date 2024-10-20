import React, { useEffect, useState, useRef } from "react";
import api from "../api/http-request";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const TrendingPage = () => {
    const MySwal = withReactContent(Swal)
    const [items, setItems] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const observerRef = useRef();

    const formatStars = (num) => {
        if (num > 999999) {
            let r = num / 1000;
            return r.toFixed(2) + 'm';
        }

        if (num > 999) {
            let r = num / 1000;
            return r.toFixed(2) + 'k';
        }
        return num;
    };

    const fetchItems = async (pageNumber) => {
        try {
            setLoading(true);
            setTimeout(async () => {
                const response = await api.get(`/search/repositories`, {
                    params: {
                        q: "created:>2024-07-15",
                        page: pageNumber,
                        sort: 'stars',
                        order: 'desc'
                    }
                });
                setItems((prev) => [...prev, ...response.data.items]);
                setLoading(false);
            }, 1000);
        } catch (error) {
            setLoading(false);
            let messageOption = {
                title: 'Warning!',
                text: "Opps, Something went wrong. Please try again later.",
                icon: 'warning',
                confirmButtonText: 'OK',
            }

            if (error.status = '403') {
                MySwal.fire(messageOption);
                messageOption.text = "You're sending too many request in short time to github. Please try again later.";
            }
            MySwal.fire(messageOption);
        }

    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
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
            <div className="container mx-auto mb-4 text-left">
                <h3 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">Trending Repositories</h3>
                <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
            <ul className="">
                {items.map((item, index) => (
                    <li className="bg-white overflow-hidden sm:rounded-md mx-auto mb-2 shadow-xl" key={index}>
                        <div className="px-4 py-5 sm:px-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{item.full_name}</h3>
                            </div>
                            <div className="mt-4 flex items-center text-left">
                                <p className="text-sm font-medium text-gray-500">{item.description ? item.description : 'Description is not applicable'}</p>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center text-left">
                                    <img src={item.owner.avatar_url} alt="Cheetah!" className="w-5" />
                                    <span className="mx-1">{item.owner.login}</span>
                                </div>
                                <div className="flex items-center text-right">
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500"><FontAwesomeIcon icon={faStar} /> {formatStars(item.stargazers_count)}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div>{loading && <div className="bg-white overflow-hidden sm:rounded-md mx-auto mb-2 shadow-xl">
                <div className="px-4 py-5 sm:px-6">
                    <div className="mt-4 items-center text-center">
                        <p className="text-md font-medium text-amber-500">Loading...</p>
                    </div>
                </div>
            </div>}</div>
            <div ref={observerRef} style={{ height: '20px' }} />
        </div>
    );
};

export default TrendingPage;