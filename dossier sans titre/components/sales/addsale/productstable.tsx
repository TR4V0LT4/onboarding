import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product } from "@/types/types";
import { calculatePPVR, calculateTotalHT } from "@/lib/utils";

export default function ProductsTable({ cart }: { cart: Product[] }) {

    return (
        <Table className="">
            <TableHeader>
                <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>PPV</TableHead>
                    <TableHead>Remise</TableHead>
                    <TableHead>PPV/R</TableHead>
                    <TableHead>Qté</TableHead>
                    <TableHead>Total HT</TableHead>
                    <TableHead>TVA</TableHead>
                    <TableHead>Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cart.map((product: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.selected_ppv}</TableCell>
                        <TableCell>
                            {product.remise} {product.type_remise === '1' ? '%' : (product.type_remise === '0' ? 'Dhs' : '')}
                        </TableCell>
                        <TableCell>{calculatePPVR(product)?.toFixed(2)}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{calculateTotalHT(product).toFixed(2)}</TableCell>
                        <TableCell>{(calculateTotalHT(product) * 0).toFixed(2)}</TableCell>
                        <TableCell>{calculateTotalHT(product).toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}