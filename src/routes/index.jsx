import { Routes, Route } from "react-router-dom";

import Beranda from '../pages/Beranda.jsx';
import List from '../pages/List.jsx';
import Detail from '../pages/Detail.jsx';
import Kelola from '../pages/Kelola.jsx';
import Resep from '../pages/Resep.jsx';


function RoutesIndex() {
    return (
        <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/list" element={<List />} />
            <Route path="/resep" element={<Resep />} />
            <Route path="/kelola" element={<Kelola />} />
            <Route path="/detail" element={<Detail />} />
        </Routes>
    )
}

export default RoutesIndex
