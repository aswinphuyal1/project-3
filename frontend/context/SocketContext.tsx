"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./Authcontext";
import io from "socket.io-client";

type SocketContextType = {
    socket: any | null;
    onlineUsers: string[];
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    onlineUsers: []
});

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<any | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
            const socketInstance = io(backendUrl, {
                query: {
                    userId: user.id,
                },
            });

            setSocket(socketInstance);

            socketInstance.on("getOnlineUsers", (users: string[]) => {
                setOnlineUsers(users);
            });

            return () => {
                socketInstance.close();
                setSocket(null);
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
