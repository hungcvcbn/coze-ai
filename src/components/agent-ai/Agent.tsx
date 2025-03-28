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
      console.log("triggerTime", triggerTime);
      fetchData();
    }
  }, [triggerTime]);

  const tabOptions = [
    { label: "Zenee AI", value: 1 },
    { label: "GPTs (Advanced)", value: 2 },
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
      <div className='bg-white sticky top-0 z-10 pt-3'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-1 '>
          <div className='flex justify-center items-center'>
            <BasicTab tabOptions={tabOptions} value={tab} onChange={handleChange} />
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 pb-3'>
            <CustomTextField
              fullWidth
              placeholder='Search'
              value={term}
              onChange={handleChangeTerm}
            />
          </div>
        </div>
      </div>

      <div className='pb-3'>{renderTabContent()}</div>
    </div>
  );
};

export default ControlPanel;
