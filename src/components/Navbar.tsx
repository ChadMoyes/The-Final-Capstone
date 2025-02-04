import { useEffect, useState } from "react";
import { supabase } from "../api/supabase";
import { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'


// The Navbar checks to see if the current User is logged in or not VIA check session
const Navbar = () => {
    const [session, setSession] = useState<Session | null>(null);
    const navigate = useNavigate(); 

    // If the User is logged in it will route them to the dashboard to see their data
    // If the User is NOT logged in they will be routed at all times to the landing page
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            if (data.session) {
                navigate("/dashboard");
            } else {
                navigate("/")
            }
        };

        // Checks if the User is logged in ("Whats da password")
        checkSession();

        // Another Event listener to check if the person is logged in or logged out
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                navigate("/dashboard");
            } else {
                navigate("/")
            }
        });

        return () => {
            authListener?.subscription?.unsubscribe?.();
        };
    }, []);

    // THis hook checks the session 
    useEffect(() => {
            if (session) {
                navigate("/dashboard");
            }
        }, [session, navigate])


    // When someone Signs Out this sends them back to the landing page
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        navigate("/")
    }

    // The styling for the NavBar and its use of tailwind CSS
    return (
        <nav className="navbar absolute top-4 right-4 bg-blue-500 text-white rounded-md shadow-lg p-4">
            <ul className="flex space-x-6">
                <li>
                    <a href="/"
                    className="text-lg font-semibold hover:bg-blue-600 px-4 py-2 rounded transition duration-300"
                    >
                        {/* Depending on the session if a User sees the dashboard or landing page */}
                        {session ? "Dashboard" : "Landing"}
                    </a>
                </li>
                <li>
                    {session ? (
                        <button onClick={() => supabase.auth.signOut()}
                        // Red button to signify someone is logged in (Red = End)
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 cursor-pointer"
                        >
                            Log Out
                        </button>
                    ) : (
                        <Link to="/signUp"
                        // Blue button to signify Signing up (Blue = Beginnning)
                        className="text-lg font-semibold hover:bg-blue-600 px-4 py-2 rounded transition duration-300"
                        >
                            Sign Up
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;