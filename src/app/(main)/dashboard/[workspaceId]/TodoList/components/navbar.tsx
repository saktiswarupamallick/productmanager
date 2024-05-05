"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Navbar = () => {
    const searchParams = useSearchParams();
    const todosFilter = searchParams ? searchParams.get('todos') : null;

    return (
        <nav>
            <Link href="/" style={{ fontSize: '2rem', fontFamily: "'Lexend Deca', sans-serif", color: '#ccc', borderBottom: '.3rem solid transparent', borderColor: todosFilter === null ? "transparent" : todosFilter === 'active' ? "#68B984" : "#3A3845", textDecoration: 'none' }}>All</Link>
            <Link href="/?todos=active" style={{ fontSize: '2rem', fontFamily: "'Lexend Deca', sans-serif", color: '#ccc', borderBottom: '.3rem solid transparent', borderColor: todosFilter === 'active' ? "#68B984" : "#3A3845", textDecoration: 'none' }}>Active</Link>
            <Link href="/?todos=completed" style={{ fontSize: '2rem', fontFamily: "'Lexend Deca', sans-serif", color: '#ccc', borderBottom: '.3rem solid transparent', borderColor: todosFilter === 'completed' ? "#68B984" : "#3A3845", textDecoration: 'none' }}>Completed</Link>
        </nav>
    );
};

export default Navbar;
