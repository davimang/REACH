import React from "react";
import { createRoot } from 'react-dom/client';
import App from './components/App';

export const API_URL = 'http://localhost:8000';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App message="REACH by reach" />);
