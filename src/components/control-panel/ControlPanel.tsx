"use client";

import { useEffect, useState } from "react";
import { getAgent, searchControlPanels } from "@/helpers/api/control";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import CustomTextField from "../hook-form/CustomTextField";
import Grid from "@mui/material/Grid2";
import BasicTab from "../common/BasicTabs";
import BasicControlList from "./BasicControlList";
import AdvancedGPT from "./AdvancedGPT";

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
      const response = tab === 1 ? await getAgent() : await searchControlPanels();
      setData(response.data.items);
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error.message, show: true }));
    }
  };

  useEffect(() => {
    if (tab) {
      fetchData();
      setTerm("");
    }
  }, [tab]);

  const tabOptions = [
    { label: "Coze AI", value: 1 },
    { label: "GPTs (Nâng cao)", value: 2 },
  ];
  const renderTabContent = () => {
    switch (tab) {
      case 1:
        return <BasicControlList data={data} />;
      case 2:
        return <AdvancedGPT data={data} />;
      default:
        return <BasicControlList data={data} />;
    }
  };
  return (
    <div>
      <div className='flex items-center justify-between sticky z-10 p-0' style={{ top: "64px" }}>
        <div className='flex justify-between gap-2 px-4 py-2 w-full bg-gray-50'>
          <Grid container spacing={2}>
            <Grid size={12}>
              <CustomTextField
                label='Tìm kiếm'
                placeholder='Nhập tên bot'
                sx={{ backgroundColor: "white" }}
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
      <div className='flex flex-col p-4 gap-3 '>{renderTabContent()}</div>
    </div>
  );
};

export default ControlPanel;
