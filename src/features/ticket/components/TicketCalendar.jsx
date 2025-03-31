import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const CalendarWrapper = styled.div`
  background-color: #e7f1ff;
  padding: 20px;
  border-radius: 10px;
`;

const MonthSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const MonthText = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const NavBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const WeekRow = styled.div`
  display: flex;
`;

const Day = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
  margin-bottom: 6px;
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

const DateCell = styled.div`
  text-align: center;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? "#3da9fc" : "transparent"};
  color: ${({ isCurrentMonth }) => (isCurrentMonth ? "#000" : "#ccc")};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};

  &:hover {
    background-color: #b7d7f9;
  }
`;

const TicketCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month").startOf("week");
  const endOfMonth = currentDate.endOf("month").endOf("week");

  const days = [];
  let date = startOfMonth;

  while (date.isBefore(endOfMonth, "day")) {
    days.push(date);
    date = date.add(1, "day");
  }

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <CalendarWrapper>
      <MonthSelector>
        <NavBtn onClick={prevMonth}>{"<"}</NavBtn>
        <MonthText>{currentDate.format("YYYY년 M월 D일")}</MonthText>
        <NavBtn onClick={nextMonth}>{">"}</NavBtn>
      </MonthSelector>

      <WeekRow>
        {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
          <Day key={i}>{d}</Day>
        ))}
      </WeekRow>

      <DateGrid>
        {days.map((d, i) => {
          const isSelected = d.isSame(selectedDate, "day");
          const isCurrentMonth = d.month() === currentDate.month();

          return (
            <DateCell
              key={i}
              isSelected={isSelected}
              isCurrentMonth={isCurrentMonth}
              onClick={() => setSelectedDate(d)}
            >
              {d.date()}
            </DateCell>
          );
        })}
      </DateGrid>
    </CalendarWrapper>
  );
};

export default TicketCalendar;
