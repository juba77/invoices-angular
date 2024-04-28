/**
 * Représente un client.
 */
export type Customer = {
    /** Identifiant unique du client. */
    id?: number;
    /** Nom complet du client. */
    fullName: string;
    /** Adresse email du client. */
    email: string;
}

/**
 * Représente une liste de clients.
 */
export type Customers = Customer[];