import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Customers, Customer } from "../types/customer";
import { env } from "../environments/env";

const API_URL = env.customerApiUrl;
const API_KEY = env.apiKey;



/**
 * Service des appels API de l'entité Customer.
 */
@Injectable()
export class CustomerApiService {

    constructor(private http: HttpClient) { }



    /**
     * 
     * Get all customers.
     * 
     * @returns the list of cutomers found.
     * 
     */
    findAll(): Observable<Customers> {
        return this.http.get<Customers>(API_URL, {
            headers: {
                "Content-Type": "application/json",
                apiKey: API_KEY
            }
        });
    }



    /**
     * 
     * Create a new Customer.
     * 
     * @param customer customer.
     * @returns the customer created.
     * 
     */
    create(customer: Customer): Observable<Customers> {
        return this.http.post<Customers>(API_URL, {
            fullName: customer.fullName,
            email: customer.email
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
     * Get cutomer by id.
     * 
     * @param id customer id.
     * @returns the customer created.
     * 
     */
    findOne(id: number): Observable<Customers> {
        return this.http.get<Customers>(API_URL + '?id=eq.' + id, {
            headers: {
                "Content-Type": "application/json",
                apiKey: API_KEY,
                Prefer: "return=representation"
            }
        });
    }

    /**
     * 
     * Remove customer.
     * 
     * @param id customer id.
     * @returns the customer removed.
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
     * Get a list of customers by a part of full name.
     * 
     * @param fullName full name part.
     * @returns the customers found.
     */
    filterByFullName(fullName: string): Observable<Customers> {
        return this.http.get<Customers>(API_URL + '?fullName=ilike.*' + fullName + '*', {
            headers: {
                "Content-Type": "application/json",
                apiKey: API_KEY
            }
        });
    }

}
