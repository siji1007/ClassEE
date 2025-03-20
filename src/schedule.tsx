import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

// Initial Schedule Data with Facility
const initialSchedule = [
  { id: "1", name: "Physics", start: "9:00 AM", end: "4:30 PM", day: "MON", facility: "Lab 1 | Room 202" },
  { id: "2", name: "Lab 2 | BSEE 2A", start: "11:00 AM", end: "1:00 PM", day: "WED", facility: "Room 203" },
  { id: "3", name: "Thermodynamics", start: "11:30 AM", end: "2:30 PM", day: "TUE", facility: "Room 201" },
  { id: "4", name: "Calculus II", start: "8:30 AM", end: "10:30 AM", day: "FRI", facility: "Room 204" },
];

// Weekdays
const weekdays = ["MON", "TUE", "WED", "THU", "FRI"];

// Time Slots from 8 AM to 5 PM
const timeSlots = Array.from({ length: 10 }, (_, i) => i + 8);

// Convert 24-hour time to 12-hour format
const format12Hour = (hour: number) => {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${formattedHour} ${period}`;
};

// Convert time string (e.g., "1:30 PM") to decimal hours (e.g., 13.5)
const parseTime = (timeStr: string) => {
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours + (minutes || 0) / 60;
};

const Schedule = () => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [facilityFilter, setFacilityFilter] = useState<string | null>(null);

  // Fetch facility filter from localStorage on component mount
  useEffect(() => {
    const storedFacility = localStorage.getItem("facilities");
    if (storedFacility) {
      setFacilityFilter(storedFacility);
    }
  }, []);

  // Filter schedule based on the stored facility
  const filteredSchedule = facilityFilter
    ? schedule.filter((classItem) => classItem.facility.includes(facilityFilter))
    : schedule;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const itemIndex = schedule.findIndex((item) => item.id === draggableId);
    if (itemIndex === -1) return;

    const updatedSchedule = [...schedule];
    const draggedItem = { ...updatedSchedule[itemIndex] };

    const newDay = weekdays[parseInt(destination.droppableId, 10)];
    const draggedStart = parseTime(draggedItem.start);
    const draggedEnd = parseTime(draggedItem.end);
    const facilities = localStorage.getItem("facilities");
    // Check for schedule conflicts
    if (!facilities) {
      const hasConflict = schedule.some(
        (item) =>
          item.day === newDay &&
          item.id !== draggedItem.id &&
          !(parseTime(item.end) <= draggedStart || parseTime(item.start) >= draggedEnd)
      );
    
      if (hasConflict) {
        alert("Schedule conflict! Cannot move to the selected time slot.");
        return;
      }
    }

    // Update the schedule if no conflict
    draggedItem.day = newDay;
    updatedSchedule[itemIndex] = draggedItem;
    setSchedule(updatedSchedule);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-white rounded-lg shadow-md w-full relative">
        {/* Sticky Header with Days of the Week */}
        <div className="grid grid-cols-6 text-center font-semibold text-gray-700 border-b bg-white sticky top-0 z-5 shadow-md">
          <span className="text-gray-400">Time</span>
          {weekdays.map((day, index) => (
            <span key={day}>
              {day} <br /> {index + 1}
            </span>
          ))}
        </div>

        {/* Time Labels & Schedule Grid */}
        <div className="relative grid grid-cols-6">
          {/* Time Labels Column */}
          <div className="col-span-1">
            {timeSlots.map((hour) => (
              <div key={hour} className="h-[60px] flex items-center text-black font-semibold border-b border-gray-300 text-right pr-4">
                {format12Hour(hour)}
              </div>
            ))}
          </div>

          {/* Schedule Grid */}
          <div className="col-span-5 relative border-l border-gray-300 grid grid-cols-5">
            {weekdays.map((day, dayIndex) => (
              <Droppable key={day} droppableId={dayIndex.toString()} type="TASK">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="relative border-r border-gray-300 min-h-[600px]">
                    {/* Grid Rows */}
                    {timeSlots.map((_, timeIndex) => (
                      <div key={timeIndex} className="h-[60px] border-t border-gray-300"></div>
                    ))}

                    {/* Render Filtered Schedule Items */}
                    {filteredSchedule
                      .filter((classItem) => classItem.day === day)
                      .map((classItem) => {
                        const startHour = parseTime(classItem.start);
                        const endHour = parseTime(classItem.end);
                        const duration = endHour - startHour;
                        const height = duration * 60; // Convert hours to pixels
                        const topPosition = (startHour - timeSlots[0]) * 60; // Align to grid

                        return (
                          <Draggable key={classItem.id} draggableId={classItem.id} index={timeSlots.indexOf(parseInt(classItem.start.split(":")[0]))}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="absolute bg-red-800 text-white p-2 rounded-md text-center w-full border-2 border-white shadow-md"
                                style={{
                                  top: `${topPosition}px`,
                                  height: `${height}px`,
                                  ...provided.draggableProps.style,
                                  backgroundColor: "#9F5151",
                                }}
                              >
                                <p className="font-bold text-sm sm:text-base md:text-lg">{classItem.name}</p>
                                <p className="text-xs sm:text-sm md:text-base">{classItem.start} - {classItem.end}</p>
                                <p className="text-[10px] sm:text-sm italic">{classItem.facility}</p>
                                {/* Facility/Room Display */}
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Schedule;
