// What the customer sees for each internal PO stage.
export const STAGE_INFO = {
  Registration: { label: "Order registered", text: "We have registered your order." },
  Inspection: { label: "Inspection", text: "Our team is inspecting the material." },
  Quotation: { label: "Quotation", text: "We are preparing your quotation." },
  "Client Response": { label: "Quotation sent", text: "Your quotation has been sent. We are waiting for your decision." },
  Pickup: { label: "Pickup", text: "Your quotation is approved. We are arranging the collection." },
  Operations: { label: "Collection", text: "Your material is being collected." },
  Factory: { label: "Processing", text: "Your material has reached our facility and is being processed." },
  Weighment: { label: "Verification", text: "We are verifying the processed quantities." },
  AOR: { label: "Compliance documents", text: "We are preparing your compliance documents." },
  "Final Reports": { label: "Final reports", text: "Your order is complete. Final reports are ready." },
  Rejected: { label: "Closed", text: "This order was closed after the quotation was declined." },
};

export const stageLabel = (status) => STAGE_INFO[status]?.label ?? status;

const dateFmt = { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" };
export const formatDay = (iso) => new Date(iso).toLocaleDateString("en-IN", dateFmt);
