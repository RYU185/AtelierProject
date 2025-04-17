import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const MonthTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    color: #0066ff;
  }
`;

const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
  text-align: center;
`;

const WeekdayCell = styled.div`
  color: #000d36;
  font-size: 0.9rem;
  padding: 10px;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  
`;

const DayCell = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  border: 1px solid transparent;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: ${({ $isSelected, $isActive, $inExhibitionRange }) => {
    if ($isSelected) return "#0066ff";
    if ($isActive) return "#90caf9";
    if ($inExhibitionRange) return "#ebebeb";
    return "transparent";
  }};

  color: ${({ $isSelected, $isCurrentMonth, $isActive, $inExhibitionRange }) => {
    if ($isSelected) return "#fff";
    if ($isCurrentMonth && ($isActive || $inExhibitionRange)) return "#333";
    if ($inExhibitionRange) return "#aaaaaa";
    return "#ccc";
  }};

  cursor: ${({ $isCurrentMonth, $isActive }) =>
    $isCurrentMonth && $isActive ? "pointer" : "default"};
  pointer-events: ${({ $isActive }) => ($isActive ? "auto" : "none")};

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ $isSelected, $isCurrentMonth, $isActive }) =>
      $isCurrentMonth && $isActive && !$isSelected ? "#64b5f6" : ""};
  }
`;



const isSameDate = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const TicketCalendar = ({
  selectedDate,
  onDateSelect,
  activeDates = [],
  exhibitionStartDate,
  exhibitionEndDate,
}) => {
  console.log(exhibitionStartDate, "~", exhibitionEndDate);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate]);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }

    setCalendarDays(days);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isSelected = (date) => selectedDate && isSameDate(date, selectedDate);

  const isActive = (date) => {
    const target = date.toISOString().slice(0, 10);
    return activeDates.includes(target);
  };

  const isInExhibitionPeriod = (date) => {
    if (!exhibitionStartDate || !exhibitionEndDate) return false;

    const dateStr = date.toISOString().slice(0, 10);
    const startStr = exhibitionStartDate.slice(0, 10);
    const endStr = exhibitionEndDate.slice(0, 10);

    return dateStr >= startStr && dateStr <= endStr;
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavigationButton onClick={handlePrevMonth}>{"<"}</NavigationButton>
        <MonthTitle>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </MonthTitle>
        <NavigationButton onClick={handleNextMonth}>{">"}</NavigationButton>
      </CalendarHeader>
      <WeekdayHeader>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <WeekdayCell key={day}>{day}</WeekdayCell>
        ))}
      </WeekdayHeader>
      <DaysGrid>
        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const inRange = isInExhibitionPeriod(date);
          console.log(
            "날짜:",
            date.toISOString().slice(0, 10),
            "전시:",
            exhibitionStartDate,
            "~",
            exhibitionEndDate,
            "→ inRange:",
            inRange
          );

          return (
            <DayCell
              key={index}
              $isCurrentMonth={isCurrentMonth}
              $isSelected={isSelected(date)}
              $isActive={isActive(date)}
              $inExhibitionRange={inRange}
              onClick={() => isCurrentMonth && isActive(date) && onDateSelect(date)}
            >
              {date.getDate()}
            </DayCell>
          );
        })}
      </DaysGrid>
    </CalendarContainer>
  );
};

export default TicketCalendar;
