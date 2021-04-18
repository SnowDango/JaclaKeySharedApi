const STATUS_STRING = ["借り", "開け", "閉め", "返し", "持ち帰り"];


export const statusString = (status: number): string => {
  return STATUS_STRING[status - 1];
};

export const statusCode = (statusString: string): number => {
  return STATUS_STRING.indexOf(statusString) + 1;
};





