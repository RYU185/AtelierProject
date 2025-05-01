import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.07);
  padding: 30px;
  border-radius: 12px;
  height: 560px;
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
  color: #f8f8f8;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #ffffff;
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
  color: #ffffff;
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
    if ($isSelected) return "#00317a";
    if ($isActive) return "#008cff";
    if ($inExhibitionRange) return "#2b2b2b";
    return "transparent";
  }};

  color: ${({
    $isSelected,
    $isCurrentMonth,
    $isActive,
    $inExhibitionRange,
  }) => {
    if ($isSelected) return "#fff";
    if ($isCurrentMonth && ($isActive || $inExhibitionRange)) return "#ffffff";
    if ($inExhibitionRange) return "#5c5c5c";
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
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const isSelected = (date) => selectedDate && isSameDate(date, selectedDate);

  const formatDate = (date) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  };

  const isActive = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isAfterToday = date >= today;

    const target = formatDate(date);
    return activeDates.includes(target) && isAfterToday;
  };

  const isInExhibitionPeriod = (date) => {
    if (!exhibitionStartDate || !exhibitionEndDate) return false;

    const dateStr = formatDate(date);
    const startStr = formatDate(new Date(exhibitionStartDate));
    const endStr = formatDate(new Date(exhibitionEndDate));

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

          return (
            <DayCell
              key={index}
              $isCurrentMonth={isCurrentMonth}
              $isSelected={isSelected(date)}
              $isActive={isActive(date)}
              $inExhibitionRange={inRange}
              onClick={() =>
                isCurrentMonth && isActive(date) && onDateSelect(date)
              }
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
