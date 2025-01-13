"use client";

import { useEffect, useState } from "react";
import { getAgent, searchControlPanels } from "@/helpers/api/agent";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CustomTextField from "../hook-form/CustomTextField";
import Grid from "@mui/material/Grid2";
import BasicTab from "../common/BasicTabs";
import BasicControlList from "./BasicControlList";
import AdvancedGPT from "./AdvancedGPT";

const ControlPanel = () => {
  const { triggerTime } = useAppSelector(state => state.common);
  const [data, setData] = useState<any>();
  const [tab, setTab] = useState<number>(1);
  const [term, setTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const handleChangeTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string | number) => {
    setTab(newValue as number);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = tab === 1 ? await getAgent() : await searchControlPanels();
      setData(response.data.items);
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error.message, show: true }));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (tab) {
      fetchData();
      setTerm("");
    }
  }, [tab]);
  useEffect(() => {
    if (triggerTime) {
      fetchData();
    }
  }, [triggerTime]);

  const tabOptions = [
    { label: "Coze AI", value: 1 },
    { label: "GPTs (Nâng cao)", value: 2 },
  ];
  const renderTabContent = () => {
    switch (tab) {
      case 1:
        return <BasicControlList data={data} loading={loading} fetchData={fetchData} />;
      case 2:
        return <AdvancedGPT data={data} />;
      default:
        return <BasicControlList data={data} loading={loading} fetchData={fetchData} />;
    }
  };
  return (
    <div className='flex flex-col'>
      <div className='sticky z-10 p-0' style={{ top: "64px" }}>
        <div className='flex justify-between gap-2 px-4 pt-2 bg-gray-50'>
          <Grid className='flex gap-2'>
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
          <div className='pt-4 mt-3'>
            <BasicTab tabOptions={tabOptions} value={tab} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className='flex flex-col px-4 py-2 gap-3'>{renderTabContent()}</div>
    </div>
  );
};

export default ControlPanel;
