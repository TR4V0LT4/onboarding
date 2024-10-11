"use client";

import { use, useState, useEffect } from "react";
import React from "react";
import { Product } from "@/types/types";
import PanierVide from "@/public/panier-vide.svg";
import DeleteIcon from "@/public/cart-delete.svg";
import EditIcon from "@/public/cart-edit.svg";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from "@/components/ui/select";
import { Input }  from "@/components/ui/input";
import { ChevronDown, PlusIcon, MinusIcon } from "lucide-react";

export interface CartProps {
    cart: Product[];
    handleQuantityChange: (id: string, quantity: number) => void;
    handleRemoveFromCart: (id: string) => void;
    handleUpdateProduct: (product: Product) => void;
}

const Cart = ({cart, handleQuantityChange, handleRemoveFromCart, handleUpdateProduct} : CartProps) => {

    const [editingProductId, setEditingProductId] = useState('');

    const handleEdit = (productId: string) => {
      if (editingProductId === productId) {
        setEditingProductId('');
        return;
      }
      setEditingProductId(productId);
    };
  
    const handleSave = (product: Product) => {
      if (product.type_remise === '-1') {
        product.remise = 0;
      }
      handleUpdateProduct(product);
      setEditingProductId('');
    };

    const calculateTotal = (product: Product) => {
        const baseTotal = (product.selected_ppv ?? 0) * (product.quantity ?? 0);
        if (isNaN(baseTotal))
          return null;
        if (!product.remise || product.type_remise === '-1')
          return baseTotal;
        if (product.type_remise === '1') {
            return baseTotal - (baseTotal * (product.remise ?? 0) / 100);
        } else if (product.type_remise === '0') {
            return baseTotal - (product.remise ?? 0);
        }
    };

    const handleQuantityChangeInternal = (productId: string, quantity: number) => {
      // if (!quantity) {
      // //   return;
      // // }
        if (quantity > 0 && quantity < 2000) {
            handleQuantityChange(productId, quantity);
        }
    };

    return (
        <div className="w-full">
            {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-gray-400">
                    <PanierVide />
                    <h2 className="text-[26px]/[24px] font-bold mt-6 text-[#DBDCE0]">Panier vide</h2>
                    <p className='text-[#DBDCE0] text-lg mt-2'>Essayez d&apos;ajouter des produits au panier</p>
                </div>
            ) : (
                <div className="flex flex-col w-full sm:p-2">
                    <div className="flex items-center justify-between w-full p-2">
                        <span className="text-[#344051] text-base font-bold">Total à payer</span>
                        <span className="text-[#2C71F6] text-xl font-extrabold">{cart.reduce((acc, item) => acc + (calculateTotal(item) ?? 0), 0).toFixed(2)} Dhs</span>
                    </div>
                    <table className="max-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr className="text-[#344051] font-bold text-xs">
                                <th className="px-4 py-3 text-center uppercase tracking-wider">Nom</th>
                                <th className="px-4 py-3 text-center uppercase tracking-wider">PPV</th>
                                <th className="px-4 py-3 text-center uppercase tracking-wider">Disp.</th>
                                <th className="px-4 py-3 text-center uppercase tracking-wider">Qte</th>
                                <th className="px-4 py-3 text-center uppercase tracking-wider">Remise</th>
                                <th className="px-4 py-3 text-center uppercase tracking-wider">Total</th>
                                <th className="px-4 py-3"></th> {/* New column with no header */}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cart.map((product, index) => (
                            <React.Fragment key={product.id}>
                                <tr className={`text-[#344051] text-[13px]/[13px] font-medium ${index % 2 === 0 ? 'bg-white' : 'bg-[#CCE0FF40]'} ${editingProductId === product.id ? "border border-b-0 border-gray-300" : ""}`}>
                                  <td className="p-4 text-wrap truncate text-ellipsis overflow-hidden">{product.name}</td>
                                  {product.ppv.length > 1 ? (
                                    <td className="p-4 font-normal whitespace-nowrap ">
                                      <Select defaultValue={product.ppv[0].toString()} onValueChange={(value) => handleUpdateProduct({ ...product, selected_ppv: parseFloat(value) })}>
                                        <SelectTrigger className="gap-x-1 h-8 text-[13px]/[13px] font-medium edit-ppv">
                                          <SelectValue />
                                          <ChevronDown className="w-4 h-4" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {product.ppv.map((ppv, i) => (
                                            <SelectItem className="text-[13px]/[13px] font-medium " value={ppv.toString()} key={i}>{ppv}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </td>
                                    ) : (
                                      <td className="p-4 font-medium whitespace-nowrap flex justify-center text-center">{product.selected_ppv}</td>
                                  )}
                                  <td className="p-4 whitespace-nowrap">
                                    <span className='flex bg-[#ECF9F2] border border-[#9FDFBF] rounded-[6px] min-w-6 min-h-6 text-[#39AC73] text-xs items-center justify-center'>
                                      {product.disp}
                                    </span>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                      <div className="relative flex justify-center items-center">
                                          <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" 
                                            className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" 
                                            onClick={() => handleQuantityChangeInternal(product.id, (product.quantity ?? 0) - 1)}
                                          >
                                              <MinusIcon className="w-2.5 h-2.5"/>
                                          </button>
                                          <input type="text" id="counter-input" data-input-counter
                                            className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2rem] text-center" 
                                            value={product.quantity ?? 1}
                                            placeholder="1"
                                            onChange={(e) => handleQuantityChangeInternal(product.id, parseInt(e.target.value))} required 
                                          />
                                          <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" onClick={() => handleQuantityChangeInternal(product.id, (product.quantity ?? 0) + 1)}>
                                              <PlusIcon className="w-2.5 h-2.5"/>
                                          </button>
                                      </div>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-center">
                                    <span className="text-center">{product.remise || 0} {product.type_remise === '1' ? '%' : (product.type_remise === '0' ? 'Dhs' : '')}</span>
                                  </td>
                                  <td className="p-4 font-bold whitespace-nowrap text-center">{calculateTotal(product)?.toFixed(2) ?? 'N/A'}</td>
                                  <td className="p-4 whitespace-nowrap flex space-x-2">
                                    <Button className="bg-white p-2 hover:bg-slate-200 remove-button " onClick={() => handleRemoveFromCart(product.id)}>
                                      <DeleteIcon className="w-5 h-5 stroke-blue-600 hover:stroke-red-600 ml-1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </Button>
                                    <Button className="bg-white p-2 flex items-center justify-center hover:bg-slate-200  edit-button " onClick={() => handleEdit(product.id)}>
                                      <EditIcon className="w-5 h-5 text-blue-500 ml-1" />
                                    </Button>
                                  </td>
                                </tr>
                                {editingProductId === product.id && (
                                  <tr className={`text-[#344051] text-[13px]/[13px] font-medium edit-table ${index % 2 === 0 ? 'bg-white' : 'bg-[#CCE0FF40]'} ${editingProductId === product.id ? 'border border-blue-500' : ''}`}>
                                    <td colSpan={7} className="p-4 w-full  border border-t-0 border-gray-300">
                                      <div className="flex justify-between flex-wrap w-full gap-y-4 gap-x-2">
                                        <div className="flex flex-col justify-start gap-y-1 ">
                                          <span>PPV</span>
                                          <Input
                                            type="number"
                                            placeholder="0"
                                            value={product.selected_ppv}
                                            onChange={(e) => handleUpdateProduct({ ...product, selected_ppv: parseFloat(e.target.value) })}
                                            className="w-20 h-8 outline-none ring-0 focus:ring-0 focus-visible:ring-0 ohter-ppv"
                                          />
                                        </div>
                                        <div className="flex flex-col justify-start gap-y-1 ">
                                          <span>Type de remise</span>
                                          <Select
                                         
                                            value={product.type_remise || '-1'}
                                            onValueChange={(value) => handleUpdateProduct({ ...product, type_remise: value, remise: value === '-1' ? 0 : product.remise })}
                                          >
                                            <SelectTrigger className="gap-x-2 h-8 min-w-32 type-remise">
                                              <SelectValue ></SelectValue>
                                              <ChevronDown className="w-4 h-4" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectGroup>
                                                <SelectItem value="0">Montant</SelectItem>
                                                <SelectItem value="1">Pourcentage</SelectItem>
                                                <SelectItem value="-1">Aucune remise</SelectItem>
                                              </SelectGroup>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="flex flex-col justify-start gap-y-1">
                                          <span>Remise</span>
                                          <Input
                                            type="number"
                                            placeholder="0"
                                            value={product.remise}
                                            disabled={product.type_remise === '-1'}
                                            onChange={(e) => {
                                              if (product.type_remise === 'Pourcentage' && parseFloat(e.target.value) > 100) {
                                                return;
                                              } else if (product.type_remise === 'Montant' && parseFloat(e.target.value) > ((product.selected_ppv ?? 0) * (product.quantity ?? 0))) {
                                                return;
                                              }
                                              handleUpdateProduct({ ...product, remise: parseFloat(e.target.value) });
                                            }}
                                            className="w-20 h-8 focus-visible:ring-0"
                                          />
                                        </div>
                                        <Button onClick={() => handleSave(product)} className="self-end h-8 bg-[#3A8DFF] hover:bg-blue-400 rounded-[8px] applique-remise">
                                          Applique la remise
                                        </Button>
                                        <div className="flex flex-col justify-start gap-y-1 ">
                                          <span>Date de péremption</span>
                                          <Input
                                            type="date"
                                            value={product.expirationDate || ''}
                                            onChange={(e) => handleUpdateProduct({ ...product, expirationDate: e.target.value })}
                                            className="w-40 h-8  edit-date"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                            </React.Fragment>
                          ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Cart;