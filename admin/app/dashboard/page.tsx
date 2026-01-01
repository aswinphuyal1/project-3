"use client";
import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/navigation";
import { Trash2, FileText, Users, LogOut, Eye } from "lucide-react";

export default function Dashboard() {
    const { token, users, notes, totalViews, fetchUsers, fetchNotes, deleteUser, deleteNote, logout } = useAdmin();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"users" | "notes">("users");

    useEffect(() => {
        if (!token) {
            router.push("/");
        } else {
            fetchUsers();
            fetchNotes();
        }
    }, [token, router]);

    if (!token) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className={`p-6 rounded-2xl shadow-sm border-2 cursor-pointer transition-all ${activeTab === 'users' ? 'bg-white border-blue-500 ring-2 ring-blue-500/20' : 'bg-white border-transparent hover:border-gray-200'}`}
                        onClick={() => setActiveTab("users")}>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                <Users className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-gray-500 font-medium">Total Users</p>
                                <h2 className="text-3xl font-bold text-gray-800">{users.length}</h2>
                            </div>
                        </div>
                    </div>

                    <div className={`p-6 rounded-2xl shadow-sm border-2 cursor-pointer transition-all ${activeTab === 'notes' ? 'bg-white border-orange-500 ring-2 ring-orange-500/20' : 'bg-white border-transparent hover:border-gray-200'}`}
                        onClick={() => setActiveTab("notes")}>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                                <FileText className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-gray-500 font-medium">Total Notes</p>
                                <h2 className="text-3xl font-bold text-gray-800">{notes.length}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl shadow-sm border-2 border-transparent bg-white hover:border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                                <Eye className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-gray-500 font-medium">Total Site Views</p>
                                <h2 className="text-3xl font-bold text-gray-800">{totalViews}</h2>
                            </div>
                        </div>
                    </div>
                </div>



                {/* List View */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800">
                            {activeTab === "users" ? "Registered Users" : "Uploaded Notes"}
                        </h3>
                        <button
                            onClick={() => activeTab === 'users' ? fetchUsers() : fetchNotes()}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Refresh
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        {activeTab === "users" ? (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Name</th>
                                        <th className="px-6 py-4 font-semibold">Email</th>
                                        <th className="px-6 py-4 font-semibold">Provider</th>
                                        <th className="px-6 py-4 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.map(user => (
                                        <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.provider === 'google' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                                                    {user.provider}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => {
                                                        if (confirm("Are you sure you want to delete this user?")) deleteUser(user._id);
                                                    }}
                                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Title</th>
                                        <th className="px-6 py-4 font-semibold">Subject</th>
                                        <th className="px-6 py-4 font-semibold">Link</th>
                                        <th className="px-6 py-4 font-semibold">Views</th>
                                        <th className="px-6 py-4 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {notes.map(note => (
                                        <tr key={note._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-800">{note.title}</td>
                                            <td className="px-6 py-4 text-gray-600">{note.subject}</td>
                                            <td className="px-6 py-4">
                                                <a href={note.fileUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-sm">
                                                    View PDF
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 font-medium">
                                                {note.views || 0}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => {
                                                        if (confirm("Are you sure you want to delete this note?")) deleteNote(note._id);
                                                    }}
                                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete Note"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {((activeTab === 'users' && users.length === 0) || (activeTab === 'notes' && notes.length === 0)) && (
                            <div className="p-12 text-center text-gray-400">
                                No data found.
                            </div>
                        )}
                    </div>
                </div>
            </main >
        </div >
    );
}
