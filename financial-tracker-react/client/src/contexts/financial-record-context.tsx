/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface FinancialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  const api = import.meta.env.VITE_API_URL;

  const fetchRecords = async () => {
    if (!user) return;
    const url = `${api}/financial-records/getAllByUserID/${user.id}`;
    const response = await fetch(url);

    if (response.ok) {
      const records = await response.json();
      setRecords(records);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record: FinancialRecord) => {
    const url = `${api}/financial-records/`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    const url = `${api}/financial-records/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newRecord),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return newRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRecord = async (id: string) => {
    const url = `${api}/financial-records/${id}`;
    const response = await fetch(url, { method: "DELETE" });

    try {
      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const value = useMemo(
    () => ({ records, addRecord, updateRecord, deleteRecord }),
    []
  );

  return (
    <FinancialRecordsContext.Provider value={value}>
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordsContext
  );

  if (!context)
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );

  return context;
};
