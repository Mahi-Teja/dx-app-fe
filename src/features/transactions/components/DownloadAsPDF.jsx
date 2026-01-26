import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

export const DownloadTransactionsPDF = ({
  transactions,
  currency = "₹",
  fileName = `transactions-report-${new Date().toISOString().slice(0, 10)}.pdf`,
}) => {
  const txns = (transactions || []).filter(
    (txn) => txn.type !== "opening_balance" && !txn.isDeleted,
  );

  const formatDate = (d) =>
    new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

  const formatMoney = (n) =>
    `${currency}${Number(n || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const typeLabel = (t) => {
    switch (t) {
      case "income":
        return "Income";
      case "expense":
        return "Expense";
      case "transfer":
        return "Transfer";
      case "adjustment":
        return "Adjustment";
      default:
        return t;
    }
  };

  const generatePDF = () => {
    if (!txns.length) {
      alert("No transactions to export");
      return;
    }

    // Sort by date ASC
    const rows = [...txns].sort(
      (a, b) => new Date(a.occurredAt) - new Date(b.occurredAt),
    );

    let totalIncome = 0;
    let totalExpense = 0;

    const body = [
      [
        { text: "Date", style: "th" },
        { text: "Type", style: "th" },
        { text: "Account", style: "th" },
        { text: "Category", style: "th" },
        { text: "Description", style: "th" },
        { text: "Amount", style: "th", alignment: "right" },
      ],
    ];

    for (const tx of rows) {
      const isTransfer = tx.type === "transfer";
      const isDebit = tx.direction === "debit";
      const amount = Number(tx.amount) || 0;

      if (tx.type === "income") totalIncome += amount;
      if (tx.type === "expense") totalExpense += amount;

      const accountText = isTransfer
        ? `${tx?.account?.name || "—"} -> ${tx?.toAccount?.name || "—"}`
        : tx?.account?.name || "—";

      const signedAmount =
        tx.type === "transfer"
          ? formatMoney(amount)
          : `${isDebit ? "-" : ""}${formatMoney(amount)}`;

      body.push([
        formatDate(tx.occurredAt),
        typeLabel(tx.type),
        accountText,
        tx?.category?.name || "—",
        tx.description || "",
        {
          text: signedAmount,
          alignment: "right",
          color:
            tx.type === "transfer"
              ? "#7c3aed" // purple
              : isDebit
                ? "#dc2626" // red
                : "#16a34a", // green
        },
      ]);
    }

    // Summary rows
    body.push([{ text: " ", colSpan: 6 }, {}, {}, {}, {}, {}]);

    body.push([
      { text: "Total Income", colSpan: 5, bold: true },
      {},
      {},
      {},
      {},
      {
        text: formatMoney(totalIncome),
        bold: true,
        alignment: "right",
        color: "#16a34a",
      },
    ]);

    body.push([
      { text: "Total Expense", colSpan: 5, bold: true },
      {},
      {},
      {},
      {},
      {
        text: formatMoney(totalExpense),
        bold: true,
        alignment: "right",
        color: "#dc2626",
      },
    ]);

    body.push([
      { text: "Net", colSpan: 5, bold: true },
      {},
      {},
      {},
      {},
      {
        text: formatMoney(totalIncome - totalExpense),
        bold: true,
        alignment: "right",
      },
    ]);

    const documentDefinition = {
      pageOrientation: "potrait",
      pageSize: "A4",
      pageMargins: [24, 32, 24, 32],

      content: [
        { text: "Transactions Report", style: "header" },
        {
          text: `Generated on ${new Date().toLocaleString()}`,
          style: "subheader",
        },
        {
          text: `Total transactions: ${rows.length}`,
          style: "meta",
        },
        { text: "\n" },

        {
          table: {
            headerRows: 1,
            widths: [70, 70, "*", "*", "*", 90],
            body,
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex === 0 ? "#f3f4f6" : null),
            hLineColor: () => "#e5e7eb",
            vLineColor: () => "#e5e7eb",
          },
        },
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 4],
        },
        subheader: {
          fontSize: 9,
          color: "#555",
          margin: [0, 0, 0, 2],
        },
        meta: {
          fontSize: 9,
          color: "#777",
          margin: [0, 0, 0, 10],
        },
        th: {
          bold: true,
          fontSize: 10,
        },
      },

      defaultStyle: {
        fontSize: 9,
      },
    };

    pdfMake.createPdf(documentDefinition).download(fileName);
  };

  return (
    <button
      onClick={generatePDF}
      className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
    >
      Download PDF
    </button>
  );
};
