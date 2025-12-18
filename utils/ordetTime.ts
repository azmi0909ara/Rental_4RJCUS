import { Timestamp } from "firebase/firestore";

export const getExpectedReturnTime = (
  paidAt?: Timestamp,
  durasiJam?: number
) => {
  if (!paidAt || !durasiJam) return null;

  const start = paidAt.toDate();
  const end = new Date(start.getTime() + durasiJam * 60 * 60 * 1000);

  return end;
};

export const getReturnStatus = (
  status: string,
  expectedReturn: Date | null,
  returnedAt?: Timestamp
) => {
  if (!expectedReturn) return null;

  const formatDate = (d: Date) =>
    d.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  // =========================
  // ✅ SUDAH DIKEMBALIKAN
  // =========================
  if (status === "COMPLETED" && returnedAt) {
    const returned = returnedAt.toDate();
    const diffMs = returned.getTime() - expectedReturn.getTime();
    const lateHours = Math.ceil(diffMs / (1000 * 60 * 60));

    if (lateHours > 0) {
      return {
        label: `Dikembalikan ${formatDate(
          returned
        )} (terlambat ${lateHours} jam)`,
        color: "text-red-600",
      };
    }

    return {
      label: `Dikembalikan ${formatDate(returned)} (tepat waktu)`,
      color: "text-green-600",
    };
  }

  // =========================
  // ⏳ MASIH BERJALAN
  // =========================
  if (status !== "PAID") return null;

  const now = new Date();
  const diffMs = expectedReturn.getTime() - now.getTime();
  const hours = Math.ceil(diffMs / (1000 * 60 * 60));

  if (hours < 0) {
    return {
      label: `Terlambat ${Math.abs(hours)} jam`,
      color: "text-red-600",
    };
  }

  if (hours <= 3) {
    return {
      label: `Sisa ${hours} jam`,
      color: "text-yellow-600",
    };
  }

  return {
    label: `Sisa ${hours} jam`,
    color: "text-green-600",
  };
};
