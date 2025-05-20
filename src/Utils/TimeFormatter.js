export const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hour, 10));
    date.setMinutes(parseInt(minute, 10));
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  // 04:12 - 23:23 now format this to 4:12 AM - 11:23 PM
    export const formatTimeTo12Hour = (time) => {
        if (!time) return "";
        const firstTime = time.split(" - ")[0];
        const secondTime = time.split(" - ")[1];
        const formattedFirstTime = formatTime(firstTime);
        const formattedSecondTime = formatTime(secondTime);
        return `${formattedFirstTime} - ${formattedSecondTime}`;
    };