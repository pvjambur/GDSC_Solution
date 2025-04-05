import { useState, useEffect } from "react";  // Add useEffect import
import { motion } from "framer-motion";
import { Search, Download } from "lucide-react";

const initialUserData = [  // Rename to initialUserData and remove John Doe
    { 
        id: 2, 
        name: "Jane Smith", 
        email: "jane@example.com", 
        role: "Examinee", 
        status: "Active",
        reportUrl: "/public/report/p1.pdf"
    },
	{ 
        id: 3, 
        name: "Nihal", 
        email: "nihal@example.com", 
        role: "Proctor", 
        status: "Active",
        reportUrl: "/public/report/p2.pdf"
    },
    // ... rest of the users
];

const johnDoeData = {  // Separate John Doe data
    id: 1, 
    name: "John Doe", 
    email: "john@example.com", 
    role: "Examinee", 
    status: "Active",
    reportUrl: "/public/reports/p3.pdf"
};


const UserTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [userData, setUserData] = useState(initialUserData);
    const [filteredUsers, setFilteredUsers] = useState(initialUserData);

    useEffect(() => {
        // Add John Doe after 20 seconds
        const timer = setTimeout(() => {
            setUserData(prevData => [johnDoeData, ...prevData]);
            setFilteredUsers(prevFiltered => [johnDoeData, ...prevFiltered]);
        },10000);

        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = userData.filter(
            (user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
        );
        setFilteredUsers(filtered);
    };

    const handleDownload = (reportUrl, userName) => {
        const link = document.createElement('a');
        link.href = reportUrl;
        // Extract filename from URL or create custom filename
        const fileName = `${userName.toLowerCase().replace(' ', '_')}_report.pdf`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Users</h2>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search users...'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Name</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Email</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Role</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Status</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Report</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700'>
                        {filteredUsers.map((user) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex items-center'>
                                        <div className='flex-shrink-0 h-10 w-10'>
                                            <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                                                {user.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className='ml-4'>
                                            <div className='text-sm font-medium text-gray-100'>{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{user.email}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{user.role}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.status === "Active"
                                            ? "bg-green-800 text-green-100"
                                            : "bg-red-800 text-red-100"
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {user.reportUrl ? (
                                        <button
                                            onClick={() => handleDownload(user.reportUrl, user.name)}
                                            className='flex items-center text-blue-400 hover:text-blue-300'
                                        >
                                            <Download size={16} className="mr-1" />
                                            Download Report
                                        </button>
                                    ) : (
                                        <span className='text-gray-500'>No Report</span>
                                    )}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    <button className='text-indigo-400 hover:text-indigo-300 mr-2'>Edit</button>
                                    <button className='text-red-400 hover:text-red-300'>Delete</button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default UserTable;