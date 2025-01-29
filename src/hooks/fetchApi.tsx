import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface TableData {
  id: string; // Unique ID for each table row
  [key: string]: any; // Additional fields
}

interface UseFetchReturnType<T> {
  data: T[]; // Data in an array format
  loading: boolean;
  postData: (newData: Partial<T>) => Promise<void>;
  editData: (id: string, updatedData: Partial<T>) => Promise<void>;
  getData: () => Promise<void>;
  deleteData: (id: string) => Promise<void>;
}

const useFetch = <T extends TableData>(
  url: string,
  dependencies: any[] = []
): UseFetchReturnType<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (err: unknown) {
      toast.error((err as Error).message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const postData = async (newData: Partial<T>) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error("Failed to add data");
      }
      await getData();
      toast.success("Data added successfully!");
    } catch (err: unknown) {
      toast.error((err as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      await getData();
      toast.success("Data deleted successfully!");
    } catch (err: unknown) {
      toast.error((err as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const editData = async (id: string, updatedData: Partial<T>) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      await getData();
      toast.success("Data updated successfully!");
    } catch (err: unknown) {
      toast.error((err as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [url, ...dependencies]);

  return { data, loading, postData, editData, getData, deleteData };
};

export default useFetch;
