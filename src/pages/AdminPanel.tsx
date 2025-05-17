import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


interface Lead {
  id: string;
  name: string;
  phone: string;
  createdAt: any;
}

const AdminPanel: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "leads"), (snapshot) => {
      const leadsData = snapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...doc.data(),
        })
      ) as Lead[];

      leadsData.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setLeads(leadsData);
    });

    return () => unsub();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      leads.map(({ name, phone, createdAt }) => ({
        Name: name,
        Phone: phone,
        Submitted_At: createdAt?.seconds
          ? new Date(createdAt.seconds * 1000).toLocaleString()
          : "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "leads.xlsx");
  };

  return (
    <div className="min-h-screen bg-[#E9F0FF] py-10 px-4">
      <div className="w-full mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          📋 Lead List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-indigo-100 text-indigo-800">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Phone</th>
                <th className="border px-4 py-2 text-left">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{lead.name}</td>
                  <td className="border px-4 py-2">{lead.phone}</td>
                  <td className="border px-4 py-2">
                    {lead.createdAt?.seconds
                      ? new Date(lead.createdAt.seconds * 1000).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-gray-400 py-4">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-end mb-4 mt-4">
            <button
              onClick={exportToExcel}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              📥 Export to Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
  
  
export default AdminPanel;
