import { DateTimeFormat, daysOfWeekMini } from '../../helpers/constants/common'
import { eachDayOfInterval, showEvery20years } from '../../helpers/interfaces/common'
import { InputAdornment, Popover } from '@mui/material'
import React, { forwardRef, useEffect, useState } from 'react'
import { IconArrowDown, IconArrowLeft, IconArrowRight, IconCalendarOutline } from '../common/IconCommon'
import { IDayInCalendar } from '../../helpers/interfaces/index'
import dayjs, { Dayjs } from 'dayjs'
import CustomTextField, { CustomTextFieldProps } from '../hook-form/CustomTextField'

export interface IDatePickerProps extends Omit<CustomTextFieldProps, 'onChange' | 'value' | 'disable'> {
  value?: Date
  onChange?: (date: Dayjs) => void
  beforeDate?: Date
  afterDate?: Date
  disabled?: boolean
  defaultToToday?: boolean
}
const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const fixedRows = Array(6).fill(0)
const today = dayjs().startOf('day')

const CustomDatePicker = forwardRef<HTMLDivElement, IDatePickerProps>(
  ({ value, beforeDate, afterDate, onChange = (date) => {}, disabled, defaultToToday = false, ...other }, ref) => {
    const [selectedDay, setSelectedDay] = useState<Dayjs | undefined>(undefined)
    const [showDay, setShowDay] = useState<Dayjs>(today)
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
    const [startYear, setStartYear] = useState<number>(showDay.year() - 7)
    const [show, setShow] = useState<'full' | 'year' | 'month'>('full')

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined
    const firstDay = showDay.startOf('month')
    const lastDay = showDay.endOf('month')
    const startDate = firstDay.startOf('week')
    const endDate = lastDay.endOf('week')
    const totalDate = eachDayOfInterval(startDate, endDate)
    const calendarGridDayObjects = totalDate.map<IDayInCalendar>((date) => ({
      date: date,
      dayOfMonth: date.date(),
      isNextMonth: date > lastDay,
      isPreviousMonth: date < firstDay,
      isBeforeDate: beforeDate ? date.isBefore(beforeDate) : null,
      isAfterDate: afterDate ? date.isAfter(afterDate) : null,
    }))

    useEffect(() => {
      if (value) {
        const date = dayjs(value)
        setSelectedDay(date)
        setShowDay(date)
      } else if (defaultToToday) {
        setSelectedDay(today)
        setShowDay(today)
      }
    }, [value, defaultToToday])
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    const handleNextMonth = () => {
      setShowDay(showDay.add(1, 'month'))
    }

    const handlePrevMonth = () => {
      setShowDay(showDay.subtract(1, 'month'))
    }

    useEffect(() => {
      if (value) {
        const date = dayjs(value)
        setSelectedDay(date)
        setShowDay(date)
      }
    }, [value])

    return (
      <div className="flex-1">
        <CustomTextField
          ref={ref}
          value={selectedDay ? selectedDay.format(DateTimeFormat.DAY_MONTH_YEAR) : ''}
          disabled={disabled}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            if (!disabled) {
              handleClick(e)
            }
          }}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start" style={{ cursor: 'pointer' }}>
                <IconCalendarOutline width={20} height={20} />
              </InputAdornment>
            ),
            // endAdornment: (
            //   <InputAdornment
            //     style={{
            //       transform: `${open ? 'rotate(180deg)' : 'rotate(0deg)'}`,
            //     }}
            //     position="end"
            //   >
            //     <IconArrowDown width={20} height={20} />
            //   </InputAdornment>
            // ),
          }}
          {...other}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          anchorPosition={{
            top: 100,
            left: 100,
          }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            '& .MuiPaper-root': { marginTop: '12px', marginBottom: '12px', borderRadius: '12px' },
          }}
        >
          <div className="">
            {show === 'full' && (
              <div className="shadow-lg p-4">
                <div className="grid grid-cols-2">
                  <div className="flex items-center justify-between cursor-pointer">
                    <button className="p-[10px] border rounded-lg bg-background-light" onClick={handlePrevMonth}>
                      <IconArrowLeft width={20} height={20} />
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-[10px]"
                      onClick={() => {
                        setShow('month')
                      }}
                    >
                      <p className="font-inter-600 text-16-24">
                        {'Tháng '} {showDay.month() + 1}
                      </p>
                      <IconArrowDown width={12} height={12} />
                    </button>
                  </div>
                  <div className="flex items-center flex-row-reverse justify-between cursor-pointer">
                    <button className="p-[10px] border rounded-lg bg-background-light" onClick={handleNextMonth}>
                      <IconArrowRight width={20} height={20} />
                    </button>
                    <button
                      onClick={() => {
                        setShow('year')
                      }}
                      className="px-3 py-[10px] rounded-lg flex items-center gap-1 "
                    >
                      <p className="font-inter-600 text-16-24">{showDay.year()}</p>
                      <IconArrowDown width={12} height={12} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-center mt-1">
                  <table>
                    <thead>
                      <tr className="flex flex-row justify-around">
                        {daysOfWeekMini.map((day, index) => (
                          <th className="" key={index}>
                            <p className="font-inter-500 text-16-24">{day}</p>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="w-full flex flex-col space-y-1">
                      {fixedRows.map((_, rowIndex) => {
                        const columns = calendarGridDayObjects.slice(rowIndex * 7, rowIndex * 7 + 7)

                        return (
                          <tr key={rowIndex} className="w-full flex flex-row justify-start space-x-1">
                            {columns.map((dayDate: IDayInCalendar, index) => {
                              const isSelectedDay = !selectedDay
                                ? today.isSame(dayDate.date)
                                : selectedDay.isSame(dayDate.date)
                              const clickable = !dayDate.isAfterDate && !dayDate.isBeforeDate

                              return (
                                <td key={index}>
                                  <button
                                    className={`w-9 h-9 rounded-lg flex justify-center items-center ${
                                      clickable ? 'hover:bg-primary hover:text-white' : 'text-gray-400'
                                    } ${isSelectedDay ? 'bg-primary text-white border' : ''}`}
                                    onClick={() => {
                                      if (!clickable) return
                                      setSelectedDay(dayDate.date)
                                      onChange && onChange(dayDate.date)
                                      setAnchorEl(null)
                                    }}
                                  >
                                    <p className={`text-center`}>{dayDate.dayOfMonth}</p>
                                  </button>
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {show == 'month' && (
              <div
                style={{ boxShadow: '0px -1px 0px 0px #F0F0F0 inset' }}
                className="rounded-tl-2 rounded-tr-2 rounded-bl-0 rounded-br-0"
              >
                <div className="h-[40px] border-b-2 flex justify-center items-center font-inter-400 text-14-22">
                  <span>
                    {'Tháng '} {showDay.month() + 1}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-[20px] gap-10">
                  {monthList.map((item, index) => {
                    const isSelectedMonth = item == showDay.month() + 1
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setShowDay(dayjs(`${showDay.year()}-${item}-${showDay.date()}`))
                          setShow('full')
                        }}
                        className={`font-inter-500 text-14-20 hover:bg-primary rounded hover:text-white p-1 ${
                          isSelectedMonth && 'bg-primary text-white'
                        }`}
                      >
                        {'Tháng '} {item}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
            {show == 'year' && (
              <div
                style={{ boxShadow: '0px -1px 0px 0px #F0F0F0 inset' }}
                className="rounded-tl-2 rounded-tr-2 rounded-bl-0 rounded-br-0"
              >
                <div className="h-[40px] justify-between border-b-2 flex items-center font-inter-400 text-14-22 p-2">
                  <button
                    onClick={() => {
                      setStartYear(startYear - 20)
                    }}
                  >
                    <IconArrowLeft />
                  </button>
                  <p>{showDay.year()}</p>
                  <button
                    onClick={() => {
                      setStartYear(startYear + 20)
                    }}
                  >
                    <IconArrowRight />
                  </button>
                </div>
                <div className="grid grid-cols-4 p-[20px] gap-10">
                  {showEvery20years(startYear).map((item, index) => {
                    const isSelectedYear = item == showDay.year()
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setShowDay(dayjs(`${item}-${showDay.month() + 1}-${showDay.date()}`))
                          setShow('full')
                        }}
                        className={`font-inter-500 text-14-20 hover:bg-primary px-2 rounded hover:text-white text-center cursor-pointer ${
                          isSelectedYear && 'bg-primary text-white '
                        }`}
                      >
                        {item}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </Popover>
      </div>
    )
  }
)

export default CustomDatePicker
