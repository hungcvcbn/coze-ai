"use client";

import { useEffect, useState } from "react";
import { searchControlPanels } from "@/helpers/api/control";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import CustomTextField from "../hook-form/CustomTextField";
import Grid from "@mui/material/Grid2";
import BasicTab from "../common/BasicTabs";
import BasicControlList from "./BasicControlList";
import CommingSoon from "../common/CommingSoon";

const ControlPanel = () => {
  const [data, setData] = useState<any>();
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<number>(1);
  const [term, setTerm] = useState<string>("");
  const handleChangeTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string | number) => {
    setTab(newValue as number);
  };

  const fetchData = async () => {
    try {
      const response = await searchControlPanels();
      setData(response.data.items);
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error.message, show: true }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const tabOptions = [
    { label: "Mindmaid", value: 1 },
    { label: "GPTs (Nâng cao)", value: 2 },
  ];
  const renderTabContent = () => {
    switch (tab) {
      case 1:
        return <BasicControlList data={data} />;
      case 2:
        return <CommingSoon />;
      default:
        return <BasicControlList data={data} />;
    }
  };
  return (
    <div>
      <div
        className='flex items-center justify-between sticky z-10 bg-white'
        style={{ top: "64px" }}
      >
        <div className='flex justify-between gap-2 px-4 py-2 border-b border-gray-200 w-full'>
          <Grid container spacing={2}>
            <Grid size={12}>
              <CustomTextField
                label='Tìm kiếm'
                placeholder='Nhập tên bot'
                value={term}
                onChange={handleChangeTerm}
              />
            </Grid>
          </Grid>
          <div className='flex items-center pt-4'>
            <BasicTab tabOptions={tabOptions} value={tab} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className='flex flex-col p-4 gap-3'>{renderTabContent()}</div>
    </div>
  );
};

export default ControlPanel;
