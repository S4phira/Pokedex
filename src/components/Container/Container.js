import React, { useState } from 'react';
import Input from '../Input/Input.component';
import List from '../List/ListWithHooks';

import Button from 'react-bootstrap/Button'

const Container = () => {
    const [showList, setShowList] = useState(true);
    return (
        <div className='container-fluid'>
            <div className="search-container">
                <Input />
                <Button className="button-show-list" variant="secondary" onClick={() => setShowList(!showList)}>ZWIŃ LISTĘ</Button>
            </div>
            {showList ? <List /> : null}
        </div>
    )
}

export default Container;