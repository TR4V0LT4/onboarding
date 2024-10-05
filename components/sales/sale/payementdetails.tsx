import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PayementDetails(saleData: any) {
    return (
        <Card className="col-span-6 p-4 border-0">
            <CardContent>
                <h2 className="font-semibold mb-2">Paiement de la vente</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Montants</TableHead>
                            <TableHead>Moyens de paiement</TableHead>
                            <TableHead>Régularisation</TableHead>
                            <TableHead>Dates</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>{}</TableCell>
                            <TableCell>{saleData.paymentMethod}</TableCell>
                            <TableCell>{saleData.regularization}</TableCell>
                            <TableCell>{saleData.paymentDate}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}