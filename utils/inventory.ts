export const isPaketAvailable = (paket: any, devices: any[], orders: any[]) => {
  return paket.devices.every((pd: any) => {
    const device = devices.find((d) => d.id === pd.deviceId);
    if (!device) return false;

    const used = orders
      .filter((o) => o.status === "PAID")
      .flatMap((o) => o.devicesUsed)
      .filter((d) => d.deviceId === pd.deviceId)
      .reduce((sum, d) => sum + d.qty, 0);

    return device.stock - used >= pd.qty;
  });
};
