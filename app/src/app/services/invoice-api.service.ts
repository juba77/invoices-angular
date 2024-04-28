import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Invoice, Invoices } from "../types/invoice";
import { env } from "../environments/env";

const API_URL = env.invoiceApiUrl;
const API_KEY = env.apiKey;



/**
 * Service des appels API de l'entité Invoice.
 */
@Injectable()
export class InvoiceApiService {

    constructor(private http: HttpClient) { }



    /**
     * 
     * Get all invoices for an customer.
     * 
     * @param id customer id.
     * @returns the list of invoices found.
     * 
     */
    findAllByCostumerId(id: number): Observable<Invoices> {
        return this.http.get<Invoices>(API_URL + "?customer=eq." + id + '&order=id.asc', {
            headers: {
                "Content-Type": "application/json",
                apiKey: API_KEY
            }
        });
    }



    /**
     * 
     * Create a new Invoice.
     * 
     * @param invoice invoice.
     * @returns the invoice created.
     * 
     */
    create(invoice: Invoice): Observable<Invoices> {
        return this.http.post<Invoices>(API_URL, {
            amount: invoice.amount,
            status: invoice.status,
            customer: invoice.customer
        }, {
            headers: {
                "Content-Type": "application/json",
                apiKey: API_KEY,
                Prefer: "return=representation"
            }
        });
    }



    /**
     * 
     * Remove invoice.
     * 
     * @param id invoice id.
     * @returns the invoice removed.
     * 
     */
    remove(id: number): Observable<any> {
        return this.http.delete<any>(API_URL + '?id=eq.' + id, {
            headers: {
                "Content-Type": "application/json",
                apiKey: API_KEY,
                Prefer: "return=representation"
            }
        });
    }



    /**
     * 
     * Change invoice status.
     * 
     * @param id invoice id.
     * @param status new status.
     * @returns the invoice updated.
     * 
     */
    updateStatus(id: number, status: "Payée" | "Envoyée"): Observable<Invoices> {
        return this.http.patch<Invoices>(API_URL + '?id=eq.' + id, {
            status: status
        }, {
            headers: {
                "Content-Type": "application/json",
                apiKey: API_KEY,
                Prefer: "return=representation"
            }
        });
    }

}
