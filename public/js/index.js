import React from 'react'
import ReactDOM from 'react-dom'

import Board from './components/board.jsx'
import Layout from './components/layout.jsx'

document.addEventListener('DOMContentLoaded', () => {
        ReactDOM.render(<Board />, document.getElementById('app'))
    }
);
