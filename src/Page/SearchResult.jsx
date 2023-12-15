import React from 'react';
import { useLocation } from 'react-router-dom';
function SearchResult() {
    const query = useLocation();
    const searchInput = query.pathname.split("/").pop();
    return ( 
        <div>
            searchResult_{searchInput}
        </div>
     );
}

export default SearchResult;