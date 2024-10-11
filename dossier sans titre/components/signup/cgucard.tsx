'use client';
import getCGU from "@/lib/signup/cgu";
import { useEffect, useState } from "react";
const CGUCard = () => {

    const [CGU, setCGU] = useState<string | null>(null);

    const fetchCGU = async () => {
        const cgu: any = await getCGU();
        setCGU(cgu);
    }
    useEffect(() => {
        fetchCGU();
    }, [])
    return (
        <div className="overflow-y-scroll p-3 rounded">
             {CGU ? (
                <div dangerouslySetInnerHTML={{ __html: CGU }} />
             ) : (
             <p className="mx-auto p-12 w-max">Chargement...</p>
             )}
        </div>
    );
}

export default CGUCard