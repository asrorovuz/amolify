export interface ISingleData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ITableDataProps {
  setSingleData: (value: ISingleData | null) => void;
  setOpenModalEdit: (value: boolean) => void;
  setType: (value: string | null) => void;
  deleteData: (id: string) => Promise<void>;
  data: ISingleData[];
  loading: boolean;
}
