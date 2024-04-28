/**
 * Représente une facture.
 */
export type Invoice = {
    /** Identifiant unique de la facture. */
    id?: number;
    /** Montant de la facture. */
    amount: string;
    /** Statut de la facture. */
    status: "Payée" | "Envoyée";
    /** Le client de la facture. */
    customer: number;
}

/**
 * Représente une liste de factures.
 */
export type Invoices = Invoice[];