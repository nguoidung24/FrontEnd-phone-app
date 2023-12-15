import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
    const [query, setQuery] = useState("");
    const nav = useNavigate();
    const hendleChangeQuery = (e) => {
        setQuery(e.target.value);
    }
    const handleSubmitQuery = (e) => {
        e.preventDefault();
        if (query) {
            nav("/products", {
                state: { query, type: "search" }
            })
        }
    }
    return (
        <div className="mb-3">
            <form onSubmit={handleSubmitQuery} className="relative w-3/4 mx-auto rounded">
                <input
                    onChange={hendleChangeQuery}
                    value={query}
                    type="text"
                    className="w-full px-4 py-1 border border-yellow-600 text-yellow-600 rounded bg-transparent outline-none focus:shadow-outline placeholder:italic placeholder:text-yellow-600"
                    placeholder="Bạn cần tìm gì...?"
                />
                <div className="absolute top-0 right-0 mt-2 mr-3">
                    <button
                        className="text-yellow-600 focus:outline-none"
                    >
                        <svg className="h-5 w-5 hover:text-orange-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M22 22L15.5 15.5M15.5 15.5C17.9853 12.7314 17.9853 8.26863 15.5 5.5C13.0147 2.73137 8.98528 2.73137 6.5 5.5C4.01472 8.26863 4.01472 12.7314 6.5 15.5C8.98528 18.2686 13.0147 18.2686 15.5 15.5L22 22Z"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchForm;