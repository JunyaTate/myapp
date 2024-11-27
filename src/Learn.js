import React, { useEffect } from 'react';

function Learn() {
    useEffect(() => {
        console.log('Learn page mounted');
    }, []);

    return (
        <div>
            <h1>Learn Page</h1>
            <p>This is the Learn page content.</p>
        </div>
    );
}   

export default Learn;
