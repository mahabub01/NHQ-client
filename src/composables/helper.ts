export function useHelper() {
  interface DateType {
    start_date: string;
    end_date: string;
  }

  function compareDate(current_dates: DateType, exits_date: DateType) {
    if (exits_date.start_date != "" && exits_date.end_date != "") {
      const exits_start_date = new Date(exits_date.start_date);
      const exits_end_date = new Date(exits_date.end_date);

      const current_start_date = new Date(current_dates.start_date);
      const current_end_date = new Date(current_dates.end_date);

      if (
        current_start_date >= exits_start_date &&
        current_end_date <= exits_end_date
      ) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  return {
    compareDate,
  };
}
