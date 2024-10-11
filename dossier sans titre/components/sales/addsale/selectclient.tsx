"use client";
import { Client } from "@/types/types";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface SelectClientProps {
    client: Client | null;
    setClient: (client: Client) => void;
    className?: string; // Add className prop
}

const SelectClient = ({ client, setClient, className }: SelectClientProps) => {
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(client);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleClientSelect = (client: Client) => {
        setSelectedClient(client);
        setClient(client);
        setIsDialogOpen(false);
    };

    useEffect(() => {
        if (client) {
            setSelectedClient(client);
        }
    }, [client]);

    useEffect(() => {
        const fetchClients = async () => {
            const response = await fetch('/api/clients');
            const data = await response.json();
            setClients(data);
            if (!selectedClient) {
                setSelectedClient(data[0] || null);
                setClient(data[0] || null);
            }
        };
        fetchClients();
    }, []);

    return (
        <div className={`w-full bg-[#BFDFA099] p-4 rounded overflow-auto flex flex-row items-center justify-between ${className}`}>
            <label className="block mb-2 text-[#172266] font-bold text-base">Client<span className="text-red-600">*</span></label>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="w-8/12">
                    <div className="flex flex-row p-2 items-center justify-between placeholder:text-[#97A1AF] text-gray-700 w-full bg-white rounded-[8px] border border-[#AFB4C5]">
                        <input
                            type="text"
                            placeholder="Rechercher un client"
                            className="outline-none "
                            defaultValue={selectedClient ? selectedClient.first_name + ' ' + selectedClient.name : ''}
                        />
                        <Search className="stroke-[#97A1AF]" />
                    </div>
                </DialogTrigger>
                <DialogContent className="overflow-y-scroll max-h-screen">
                    <DialogHeader className="font-bold text-[#344051] items-center">Choisir un client</DialogHeader>
                    <DialogTitle></DialogTitle>
                    <div className="bg-white border rounded mt-2">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Noms</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telephone</th>
                                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">e-mail</th> */}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {clients.map((client, index) => (
                                    <tr
                                        key={index}
                                        className="cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleClientSelect(client)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">{client.first_name + ' ' + client.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{client.type === '1' ? "Client régulier" : ""}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap">{client.email}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SelectClient;