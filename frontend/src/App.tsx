import React, { useState } from "react";
import { Toaster, toast } from "sonner";

import { uploadFile } from "./services/upload";
import { Data } from "./types";
import "./App.css";

const APP_STATUS = {
  IDLE: "idle",
  ERROR: "error",
  READY_UPLOAD: "ready_upload",
  UPLOADING: "uploading",
  READY_USAGE: "ready_usage",
  SEARCHING: "searching",
} as const;

type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<Data>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? [];
    if (file) {
      setFile(file);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file || appStatus !== APP_STATUS.READY_UPLOAD) return;
    setAppStatus(APP_STATUS.UPLOADING);

    const [err, newData] = await uploadFile(file);
    if (err) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error(err.message);
      return;
    }

    setAppStatus(APP_STATUS.READY_USAGE);
    if (newData) setData(newData);
    toast.success("Archivo subido correctamente");
  };

  const getButtonText = () => {
    switch (appStatus) {
      case APP_STATUS.READY_UPLOAD:
        return "Subir archivo";
      case APP_STATUS.UPLOADING:
        return "Subiendo archivo";
      default:
        return "Subir archivo";
    }
  };

  const showButton =
    appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING;
  const showInput = appStatus !== APP_STATUS.READY_USAGE;

  return (
    <>
      <Toaster />
      <h4>Challange: Upload CSV + Search</h4>
      {showInput ? (
        <form onSubmit={handleSubmit}>
          <label>
            <input
              disabled={appStatus === APP_STATUS.UPLOADING}
              onChange={handleInputChange}
              name="file"
              type="file"
              accept=".csv"
              size={120}
            />
            {file?.name ?? "Browse Files"}
          </label>
          {showButton && (
            <button disabled={appStatus === APP_STATUS.UPLOADING}>
              {getButtonText()}
            </button>
          )}
        </form>
      ) : (
        <div>{JSON.stringify(data)}</div>
      )}
    </>
  );
}

export default App;
