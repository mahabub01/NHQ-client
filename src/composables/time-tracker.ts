import { reactive, ref, computed } from "vue";
import { useStore } from "vuex";

export function useTimeTracker() {
  //Time Tracker Countable result
  const TimeTrackerDisplay = reactive({
    hr: "00",
    min: "00",
    sec: "00",
  });

  //time Tracker result
  const timeTrackerResult = reactive({
    start_time: "",
    start_date: "",
    hr: "",
    min: "",
    sec: "",
    end_time: "",
    end_date: "",
    tracker_status: false,
    all_seconds: 0,
    intervalId: "",
  });

  //timer interval
  let timerInter: any = undefined;
  const trackerStatus = ref();
  const store = useStore();
  const user_id = computed(() => store.state.currentUser.user.id);

  //setup
  function trackerTimer(
    isStart: boolean,
    isStartForLocalStore = false, //save timer in LocalStorage is save or not
    task_id = "", //if save in localstorage that time task_id is What??
    isAutoStart = false, //if you start autometically send true
    startingObject = [] as string[], //if you start autometically send store object from LocalStorage
    tracker_type = "timer"
  ) {
    //Tracker Status
    timeTrackerResult.tracker_status = isStart;
    if (isStart == true) {
      //if auto Start
      //start the timer
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      let allSeconds = 0;

      if (isAutoStart === true) {
        //start the timer
        if (startingObject.length != 0) {
          hours = Number(startingObject[0]);
          minutes = Number(startingObject[1]);
          seconds = Number(startingObject[2]);
          allSeconds = Number(startingObject[3]);
        }
      }

      //Convert Hour, Minit, Sec
      timerInter = setInterval(() => {
        seconds = seconds + 1;
        allSeconds = allSeconds + 1;
        if (seconds == 60) {
          minutes = minutes + 1;
          seconds = 0;
        }

        if (minutes == 60) {
          hours = hours + 1;
          minutes = 0;
          seconds = 0;
        }

        TimeTrackerDisplay.hr = hours < 10 ? `0${hours}` : `${hours}`;
        TimeTrackerDisplay.min = minutes < 10 ? `0${minutes}` : `${minutes}`;
        TimeTrackerDisplay.sec = seconds < 10 ? `0${seconds}` : `${seconds}`;

        //For Result Object
        timeTrackerResult.hr = hours < 10 ? `0${hours}` : `${hours}`;
        timeTrackerResult.min = minutes < 10 ? `0${minutes}` : `${minutes}`;
        timeTrackerResult.sec = seconds < 10 ? `0${seconds}` : `${seconds}`;
        timeTrackerResult.all_seconds = allSeconds;

        //use local storage
        if (isStartForLocalStore == true) {
          if (tracker_type == "counter") {
            localStorage.removeItem(
              "r_t_counter_" + task_id + "_" + user_id.value
            );
            localStorage.setItem(
              "r_t_counter_" + task_id + "_" + user_id.value,
              JSON.stringify({
                h: hours,
                m: minutes,
                s: seconds,
                ats: allSeconds,
              })
            );
          } else {
            localStorage.removeItem("r_t_" + task_id + "_" + user_id.value);
            localStorage.setItem(
              "r_t_" + task_id + "_" + user_id.value,
              JSON.stringify({
                h: hours,
                m: minutes,
                s: seconds,
                ats: allSeconds,
              })
            );
          }
        }
      }, 1000);
      //Start time
      const currentDate = new Date();

      /*******************
       * Time Tracker Result
       * ***************/
      timeTrackerResult.start_time = currentDate.toLocaleTimeString(
        navigator.language,
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
      timeTrackerResult.start_date =
        currentDate.toLocaleDateString("zh-Hans-CN");
      timeTrackerResult.intervalId = timerInter;
    } else {
      //Stop the timer
      clearInterval(timerInter);
      //Start time
      const currentDate = new Date();
      timeTrackerResult.end_time = currentDate.toLocaleTimeString(
        navigator.language,
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
      timeTrackerResult.end_date = currentDate.toLocaleDateString("zh-Hans-CN");

      //remove local storage
      if (isStartForLocalStore == true) {
        localStorage.removeItem("r_t_" + task_id + "_" + user_id.value);
        localStorage.removeItem("r_t_counter_" + task_id + "_" + user_id.value);
      }
    }
  }

  function timeReset() {
    TimeTrackerDisplay.hr = "00";
    TimeTrackerDisplay.min = "00";
    TimeTrackerDisplay.sec = "00";
  }

  function secondsToString(seconds: number) {
    const numyears = Math.floor(seconds / 31536000);
    const numweeks = Math.floor((seconds % 31536000) / 604800);
    const numdays = Math.floor((seconds % 31536000) / 86400);
    const numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    const numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    const numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    if (numyears != 0) {
      return (
        numyears +
        " y " +
        numdays +
        " d " +
        numhours +
        " h " +
        numminutes +
        " m " +
        numseconds +
        " s"
      );
    } else if (numweeks != 0) {
      return (
        numweeks +
        " w " +
        numdays +
        " d " +
        numhours +
        " h " +
        numminutes +
        " m " +
        numseconds +
        " s"
      );
    } else if (numdays != 0) {
      return (
        numdays +
        " d " +
        numhours +
        " h " +
        numminutes +
        " m " +
        numseconds +
        " s"
      );
    } else if (numhours != 0) {
      return numhours + " h " + numminutes + " m " + numseconds + " s";
    } else if (numminutes != 0) {
      return numminutes + " m " + numseconds + " s";
    } else if (numseconds != 0) {
      return numseconds + " s";
    } else {
      return numseconds + " s";
    }
  }

  //Store Interval Id
  function storeIntervalId(task_id: number, intervalId: number) {
    const getInvervalId = localStorage.getItem("runnig_inverval_" + task_id);
    if (getInvervalId != null) {
      const arrIntervalId = JSON.parse(getInvervalId);
      const arr: any = [];
      for (let i = 0; i < arrIntervalId.length; i++) {
        arr.push(arrIntervalId[i]);
      }
      localStorage.setItem("runnig_inverval_" + task_id, JSON.stringify(arr));
    } else {
      localStorage.setItem(
        "runnig_inverval_" + task_id,
        JSON.stringify([Number(intervalId)])
      );
    }
  }

  //Remove all running interval
  function removeIntervalId(task_id: number) {
    const getInvervalId = localStorage.getItem("runnig_inverval_" + task_id);
    if (getInvervalId != null) {
      const arrIntervalId = [JSON.parse(getInvervalId)];
      arrIntervalId.forEach((item) => {
        window.clearInterval(item);
        console.log(item);
      });
      localStorage.removeItem("runnig_inverval_" + task_id);
      localStorage.removeItem("r_t_" + task_id + "_" + user_id.value);
      localStorage.removeItem("r_t_counter_" + task_id + "_" + user_id.value);
    }
  }

  // localStorage.setItem(
  //   "r_t_counter_" + task_id + "_" + user_id.value,
  //   JSON.stringify({
  //     h: hours,
  //     m: minutes,
  //     s: seconds,
  //     ats: allSeconds,
  //   })
  // );

  return {
    TimeTrackerDisplay,
    trackerStatus,
    timeTrackerResult,
    trackerTimer,
    timeReset,
    secondsToString,
    storeIntervalId,
    removeIntervalId,
  };
}
